// src/app/api/reservas/route.ts
import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent, CalendarEventError } from '@/app/lib/calendarEvents';
import { buildSlotRange } from '@/app/utils/buildSlotRange';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos (aquí iría tu validación con Zod)
    const { name, email, phone, date, hour, notes, duration, service, therapist } = body;

    // 1. Save data
    const createdReservation = await prisma.reservation.create({
        data: {
            name,
            email,
            phone,
            date: new Date(date.date),
            hour,
            notes,
            duration,
            price: service.price,
            serviceId: service.id,
            ...(therapist?.id ? { therapistId: therapist.id } : {}),
        }
    });

    const slotRange = buildSlotRange(date, hour);

    // 2. Create google Calendar event

    try {
      const calendarEvent = await createCalendarEvent({
        summary: `${name} - ${service.name}`,
        start: slotRange?.start!,
        end: slotRange?.end!,
        description: `
          Servicio: ${service.name}
          Cliente: ${name}
          Terapeuta: ${therapist?.name}
          Precio: ${service.price}
        `,
      });

      await prisma.reservation.update({
        where: { id: createdReservation.id },
        data: { googleCalendarEventId: calendarEvent.htmlLink },
      });

    } catch (error) {
      if (error instanceof CalendarEventError) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: error.status }
        );
      }
      throw error;
    }

    // 2. Enviar mensaje por WhatsApp
    // try {
    //   const mensajeId = await enviarWhatsApp({
    //     numero: telefono,
    //     nombre,
    //     servicio,
    //     fecha,
    //     hora,
    //   });
      
    //   await prisma.reserva.update({
    //     where: { id: reserva.id },
    //     data: { whatsapp_message_id: mensajeId },
    //   });

    //   await logIntegracion('whatsapp', 'exito', 'Mensaje enviado correctamente', mensajeId);
    // } catch (whatsappError) {
    //   await logIntegracion('whatsapp', 'error', 'Error al enviar WhatsApp', String(whatsappError));
    //   // No fallar completamente, la reserva se creó
    // }

    // Actualizar estado a confirmada
    // const reservaConfirmada = await prisma.reserva.update({
    //   where: { id: reserva.id },
    //   data: { estado: 'confirmada' },
    // });

    return NextResponse.json({
      success: true,
      message: 'Reserva confirmada. Revisa tu WhatsApp.',
    });

  } catch (error) {
    console.error('Error en POST /api/reservas:', error);
    // await logIntegracion('api_reservas', 'error', 'Error general', String(error));
    
    return NextResponse.json(
      { error: 'Error al procesar la reserva' },
      { status: 500 }
    );
  }
}
