// src/app/api/reservas/route.ts
import prisma from '@/app/lib/prisma';
import { Prisma } from '@/app/generated/prisma/client';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos (aquí iría tu validación con Zod)
    const { name, email, phone, service, date, hour, notes, duration, price } = body;

    // 1. Guardar en base de datos
    const reserva = await prisma.reservation.create({
        data: {
            name,
            email,
            phone,
            service,
            date,
            hour,
            notes,
            duration,
            price
        }
    });

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

    // 3. Crear evento en Google Calendar
    // try {
    //   const eventId = await crearEventoCalendario({
    //     titulo: `Reserva - ${nombre} (${servicio})`,
    //     descripcion: `Cliente: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nNotas: ${notas}`,
    //     fecha,
    //     hora,
    //     duracion: 60, // minutos
    //   });

    //   await prisma.reserva.update({
    //     where: { id: reserva.id },
    //     data: { google_calendar_event_id: eventId },
    //   });

    //   await logIntegracion('google_calendar', 'exito', 'Evento creado', eventId);
    // } catch (calendarError) {
    //   await logIntegracion('google_calendar', 'error', 'Error en Google Calendar', String(calendarError));
    // }

    // Actualizar estado a confirmada
    // const reservaConfirmada = await prisma.reserva.update({
    //   where: { id: reserva.id },
    //   data: { estado: 'confirmada' },
    // });

    // return NextResponse.json({
    //   success: true,
    //   reserva: reservaConfirmada,
    //   message: 'Reserva confirmada. Revisa tu WhatsApp.',
    // });

  } catch (error) {
    console.error('Error en POST /api/reservas:', error);
    // await logIntegracion('api_reservas', 'error', 'Error general', String(error));
    
    return NextResponse.json(
      { error: 'Error al procesar la reserva' },
      { status: 500 }
    );
  }
}

// function calcularPrecio(servicio: string, duracionAdicional?: number): number {
//   const precios = {
//     'RITUAL_LUNAE': 170000,
//     'ALQUIMIA_LUNAE': 250000,
//     'EXTASIS_TANTRICO': 250000,
//     'ARMONIA_PAREJA': 680000,
//   };
  
//   let precio = precios[servicio as keyof typeof precios] || 0;
//   if (duracionAdicional) {
//     const precioAdicional = servicio === 'ARMONIA_PAREJA' ? 110000 : 80000;
//     precio += (duracionAdicional / 30) * precioAdicional;
//   }
//   return precio;
// }