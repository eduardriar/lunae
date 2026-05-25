import prisma from '@/app/lib/prisma';
import { sendTextMessage, WhatsappError } from '@/app/lib/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

type SendBody = {
  to: string;
  body: string;
  reservationId?: string;
};

export async function POST(req: NextRequest) {
  console.log('>>>', req);
  
  try {
    const { to, body, reservationId } = (await req.json()) as Partial<SendBody>;

    if (!to || !body) {
      return NextResponse.json(
        { success: false, error: 'to and body are required' },
        { status: 400 }
      );
    }

    const conversation = await prisma.whatsappConversation.upsert({
      where: { contactPhone: to },
      create: {
        contactPhone: to,
        lastMessageAt: new Date(),
      },
      update: {
        lastMessageAt: new Date(),
      },
    });

    const response = await sendTextMessage(to, body);
    const waMessageId = response.messages?.[0]?.id;

    const message = await prisma.whatsappMessage.create({
      data: {
        waMessageId: waMessageId || null,
        conversationId: conversation.id,
        direction: 'outbound',
        fromPhone: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
        toPhone: to,
        type: 'text',
        content: { body },
        status: 'sent',
        ...(reservationId ? { reservationId } : {}),
      },
    });

    return NextResponse.json({ success: true, message });
  } catch (error) {
    if (error instanceof WhatsappError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status }
      );
    }
    console.error('WhatsApp send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}
