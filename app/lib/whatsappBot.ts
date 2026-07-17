import prisma from './prisma';
import { getActiveServices } from './services';
import { getAvailableSlots } from './availableSlots';
import { createCalendarEvent } from './calendarEvents';
import {
  sendTextMessage,
  sendImageMessage,
  sendInteractiveListMessage,
  sendInteractiveButtonMessage,
} from './whatsapp';
import { getUpcomingWorkDays } from '../utils/workDays';
import { formatCurrency } from '../utils/currency';
import {
  WhatsappConversation,
  WhatsappConversationState,
} from '../generated/prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/client';
import { CONTENT } from '../utils/copies';
import { fillTemplate } from './content/template';

export type InboundMessage = {
  from: string;
  id: string;
  type: string;
  text?: { body: string };
  interactive?: {
    type: 'button_reply' | 'list_reply';
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string; description?: string };
  };
};

type ConversationContext = {
  serviceId?: string;
  serviceName?: string;
  servicePrice?: number;
  serviceDuration?: number;
  date?: string;
  hour?: string;
  handoverAt?: string;
};

const HANDOVER_TIMEOUT_MS = 24 * 60 * 60 * 1000;

const stripAccents = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '');

const GREETING_REGEX = /\b(hola|buenas|buenos|hi)\b/i;

export const isGreeting = (text: string) =>
  GREETING_REGEX.test(stripAccents(text.toLowerCase()));

const TZ_OFFSET = '-05:00';

const readContext = (raw: unknown): ConversationContext =>
  raw && typeof raw === 'object' ? (raw as ConversationContext) : {};

const updateConversation = (
  id: string,
  state: WhatsappConversationState,
  context: ConversationContext | null
) => {
  return prisma.whatsappConversation.update({
    where: { id },
    data: {
      state: state,
      context: context as InputJsonValue
    },
  });
}
  

const formatDateEs = (iso: string) =>
  new Date(`${iso}T12:00:00${TZ_OFFSET}`).toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

export const handleInboundMessage = async (
  conversation: WhatsappConversation,
  message: InboundMessage
): Promise<void> => {
  if (conversation.state === WhatsappConversationState.human_handover) {
    const context = readContext(conversation.context);
    const handoverAt = context.handoverAt ? Date.parse(context.handoverAt) : NaN;
    const expired =
      !Number.isFinite(handoverAt) ||
      Date.now() - handoverAt > HANDOVER_TIMEOUT_MS;

    if (!expired) {
      // A human is handling this conversation — stay silent.
      return;
    }

    await updateConversation(conversation.id, WhatsappConversationState.idle, null);
    conversation = { ...conversation, state: WhatsappConversationState.idle, context: null };
  }

  if (message.type === 'text') {
    const text = message.text?.body?.trim() ?? '';
    if (isGreeting(text)) {
      await sendMainMenu(conversation);
      return;
    }
    await handleText(conversation, text);
    return;
  }

  if (message.type === 'interactive') {
    const replyId =
      message.interactive?.button_reply?.id ||
      message.interactive?.list_reply?.id;
    if (!replyId) return;
    await handleInteractiveReply(conversation, replyId);
    return;
  }

  await sendTextMessage(
    conversation.contactPhone,
    'Por ahora sólo entiendo texto. Escribe "Hola" para empezar tu reserva.'
  );
};

const handleText = async (
  conversation: WhatsappConversation,
  text: string
) => {
  if (conversation.state === WhatsappConversationState.awaiting_name) {
    await completeReservation(conversation, text);
    return;
  }

  if (conversation.state ===  WhatsappConversationState.idle || conversation.state ===  WhatsappConversationState.confirmed) {
    await sendTextMessage(
      conversation.contactPhone,
      'Escribe "Hola" cuando quieras reservar tu próximo ritual ✦'
    );
    return;
  }

  await sendTextMessage(
    conversation.contactPhone,
    'Por favor selecciona una opción de la lista que envié arriba.'
  );
};

const handleInteractiveReply = async (
  conversation: WhatsappConversation,
  replyId: string
) => {
  const [kind, ...rest] = replyId.split(':');
  const payload = rest.join(':');

  if (kind === 'menu' && conversation.state === WhatsappConversationState.awaiting_menu) {
    if (payload === 'reserve') {
      await sendServiceList(conversation);
    } else if (payload === 'human') {
      await requestHumanHandover(conversation);
    }
    return;
  }

  if (kind === 'service' && conversation.state === WhatsappConversationState.awaiting_service) {
    await selectService(conversation, payload);
    return;
  }

  if (kind === 'date' && conversation.state === WhatsappConversationState.awaiting_date) {
    await selectDate(conversation, payload);
    return;
  }

  if (kind === 'slot' && conversation.state === WhatsappConversationState.awaiting_slot) {
    await selectSlot(conversation, payload);
    return;
  }

  if (kind === 'confirm' && conversation.state === WhatsappConversationState.awaiting_confirmation) {
    if (payload === 'yes') {
      await updateConversation(
        conversation.id,
        WhatsappConversationState.awaiting_name,
        readContext(conversation.context)
      );
      await sendTextMessage(
        conversation.contactPhone,
        '¿Cómo te llamamos? Responde con tu nombre.'
      );
    } else {
      await updateConversation(conversation.id, WhatsappConversationState.idle, null);
      await sendTextMessage(
        conversation.contactPhone,
        'Sin problema, escríbenos cuando quieras ✦'
      );
    }
    return;
  }

  await sendTextMessage(
    conversation.contactPhone,
    'Esa opción ya no aplica. Escribe "Hola" para empezar de nuevo.'
  );
};

// Step 1
const sendMainMenu = async (conversation: WhatsappConversation) => {
  await updateConversation(conversation.id, WhatsappConversationState.awaiting_menu, null);

  await sendInteractiveButtonMessage(
    conversation.contactPhone,
    CONTENT.whatsapp.welcome[0],
    [
      { id: 'menu:reserve', title: CONTENT.whatsapp.welcome[1] },
      { id: 'menu:human', title: CONTENT.whatsapp.welcome[2] },
    ]
  );
};

const requestHumanHandover = async (conversation: WhatsappConversation) => {
  await updateConversation(
    conversation.id,
    WhatsappConversationState.human_handover,
    { handoverAt: new Date().toISOString() }
  );

  console.info('[handover]', {
    phone: conversation.contactPhone,
    name: conversation.contactName,
    at: new Date().toISOString(),
  });

  await sendTextMessage(
    conversation.contactPhone,
    'Gracias por escribirnos ✦ Una persona del equipo te responderá pronto por este mismo chat.'
  );
};

const sendServiceList = async (conversation: WhatsappConversation) => {
  const services = await getActiveServices();

  if (services.length === 0) {
    await sendTextMessage(
      conversation.contactPhone,
      'No tenemos servicios disponibles por ahora. Te contactamos pronto.'
    );
    return;
  }

  await updateConversation(conversation.id, WhatsappConversationState.awaiting_service, null);

  for (const service of services) {
    if (!service.imageUrl) continue;
    try {
      await sendImageMessage(
        conversation.contactPhone,
        service.imageUrl
      );
    } catch (error) {
      console.warn('Failed to send service preview image:', service.id, error);
    }
  }

  await sendInteractiveListMessage(
    conversation.contactPhone,
    CONTENT.whatsapp.service[0],
    CONTENT.whatsapp.service[1],
    [
      {
        title: 'Rituales',
        rows: services.map((s) => ({
          id: `service:${s.id}`,
          title: s.name,
          description: `${formatCurrency(s.price)} · ${s.duration} min`,
        })),
      },
    ],
    CONTENT.name
  );
};

const selectService = async (
  conversation: WhatsappConversation,
  serviceId: string
) => {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    await sendTextMessage(
      conversation.contactPhone,
      'Ese ritual ya no está disponible. Escribe "Hola" para ver los demás.'
    );
    return;
  }

  const days = getUpcomingWorkDays(5);
  const context: ConversationContext = {
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    serviceDuration: service.duration,
  };
  await updateConversation(conversation.id, 'awaiting_date', context);

  await sendInteractiveListMessage(
    conversation.contactPhone,
    fillTemplate(CONTENT.whatsapp.dates[0], {RITUAL: service.name}),
    CONTENT.whatsapp.dates[1],
    [
      {
        title: CONTENT.whatsapp.dates[2],
        rows: days.map((d) => ({
          id: `date:${d.iso}`,
          title: d.isToday ? 'Hoy' : `${d.weekday} ${d.dayNumber}`,
          description: `${d.month} · ${d.iso}`,
        })),
      },
    ]
  );
};

const selectDate = async (
  conversation: WhatsappConversation,
  date: string
) => {
  const slots = await getAvailableSlots(date);
  const free = slots.filter((s) => !s.blocked).slice(0, 10);

  if (free.length === 0) {
    await sendTextMessage(
      conversation.contactPhone,
      'No hay horarios libres ese día. Escribe "Hola" y elige otro día.'
    );
    await updateConversation(conversation.id, 'idle', null);
    return;
  }

  const context = { ...readContext(conversation.context), date };
  await updateConversation(conversation.id, 'awaiting_slot', context);

  await sendInteractiveListMessage(
    conversation.contactPhone,
    fillTemplate(CONTENT.whatsapp.time[0], {DATE: formatDateEs(date)}),
    CONTENT.whatsapp.time[1],
    [
      {
        title: CONTENT.whatsapp.time[2],
        rows: free.map((s) => ({
          id: `slot:${s.displayTime}`,
          title: s.displayTime,
        })),
      },
    ]
  );
};

const selectSlot = async (
  conversation: WhatsappConversation,
  hour: string
) => {
  const context = readContext(conversation.context);
  if (!context.serviceName || !context.date) {
    await sendTextMessage(
      conversation.contactPhone,
      'Perdí el hilo. Escribe "Hola" para empezar de nuevo.'
    );
    await updateConversation(conversation.id, 'idle', null);
    return;
  }

  const next = { ...context, hour };
  await updateConversation(conversation.id, 'awaiting_confirmation', next);

  await sendInteractiveButtonMessage(
    conversation.contactPhone,
    fillTemplate(CONTENT.whatsapp.confirmation[0], {
      RITUAL: context.serviceName,
      DATE: formatDateEs(context.date),
      TIME: hour,
      PRICE: formatCurrency(context.servicePrice ?? 0)
    }),
    [
      { id: 'confirm:yes', title: CONTENT.whatsapp.confirmation[1] },
      { id: 'confirm:no', title: CONTENT.whatsapp.confirmation[2] },
    ]
  );
};

const completeReservation = async (
  conversation: WhatsappConversation,
  name: string
) => {
  const context = readContext(conversation.context);
  if (
    !context.serviceId ||
    !context.date ||
    !context.hour ||
    !context.serviceDuration ||
    context.servicePrice === undefined
  ) {
    await sendTextMessage(
      conversation.contactPhone,
      'Perdí el hilo de tu reserva. Escribe "Hola" para empezar de nuevo.'
    );
    await updateConversation(conversation.id, 'idle', null);
    return;
  }

  const cleanName = name.trim().slice(0, 100);
  if (cleanName.length < 2) {
    await sendTextMessage(
      conversation.contactPhone,
      'Necesito un nombre válido. Por favor responde con tu nombre.'
    );
    return;
  }

  try {
    const start = new Date(`${context.date}T${context.hour}:00${TZ_OFFSET}`);
    const end = new Date(start.getTime() + context.serviceDuration * 60_000);

    await createCalendarEvent({
      summary: `${cleanName} - ${context.serviceName}`,
      start: start.toISOString(),
      end: end.toISOString(),
      description:
        `Servicio: ${context.serviceName}\n` +
        `Cliente: ${cleanName}\n` +
        `Teléfono: ${conversation.contactPhone}\n` +
        `Terapeuta: por asignar\n` +
        `Precio: ${formatCurrency(context.servicePrice)}\n` +
        `Origen: WhatsApp`,
    });
  } catch (error) {
    console.error('Bot calendar event creation failed:', error);
  }

  await prisma.whatsappConversation.update({
    where: { id: conversation.id },
    data: {
      state: 'confirmed',
      context: undefined,
      contactName: cleanName,
    },
  });

  await sendTextMessage(
    conversation.contactPhone,
    fillTemplate(CONTENT.whatsapp.final[0], {
      RITUAL: context.serviceName,
      DATE: formatDateEs(context.date),
      TIME: context.hour,
      NAME: cleanName
    })
  );
};
