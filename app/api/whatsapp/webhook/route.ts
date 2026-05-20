import prisma from '@/app/lib/prisma';
import { verifyWebhookSignature } from '@/app/lib/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

type IncomingMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
  [key: string]: unknown;
};

type StatusUpdate = {
  id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id: string;
  errors?: { message: string }[];
};

const STATUS_MAP: Record<
  string,
  'sent' | 'delivered' | 'read' | 'failed'
> = {
  sent: 'sent',
  delivered: 'delivered',
  read: 'read',
  failed: 'failed',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (
    mode === 'subscribe' &&
    token === process.env.WHATSAPP_VERIFY_TOKEN &&
    challenge
  ) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-hub-signature-256');

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  let payload: { entry?: { changes?: { value: Record<string, unknown> }[] }[] };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  try {
    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value as {
          metadata?: { display_phone_number?: string; phone_number_id?: string };
          contacts?: { profile?: { name?: string }; wa_id?: string }[];
          messages?: IncomingMessage[];
          statuses?: StatusUpdate[];
        };

        const businessPhone =
          value.metadata?.display_phone_number ||
          value.metadata?.phone_number_id ||
          '';
        const contactName = value.contacts?.[0]?.profile?.name;

        console.log('>>> Messages', value.messages)

        for (const message of value.messages || []) {
          const conversation = await prisma.whatsappConversation.upsert({
            where: { contactPhone: message.from },
            create: {
              contactPhone: message.from,
              contactName: contactName || null,
              lastMessageAt: new Date(),
            },
            update: {
              lastMessageAt: new Date(),
              ...(contactName ? { contactName } : {}),
            },
          });

          await prisma.whatsappMessage.create({
            data: {
              waMessageId: message.id,
              conversationId: conversation.id,
              direction: 'inbound',
              fromPhone: message.from,
              toPhone: businessPhone,
              type: message.type,
              content: message as object,
              status: 'delivered',
            },
          });
        }

        for (const status of value.statuses || []) {
          const mapped = STATUS_MAP[status.status] || 'sent';
          await prisma.whatsappMessage.updateMany({
            where: { waMessageId: status.id },
            data: {
              status: mapped,
              errorMessage: status.errors?.[0]?.message || null,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error('WhatsApp webhook processing error:', error);
    // Return 200 so Meta does not retry; we already have the error logged.
    return new NextResponse('OK', { status: 200 });
  }

  return new NextResponse('OK', { status: 200 });
}
