import crypto from 'crypto';
import prisma from '@/app/lib/prisma';
import { sendTextMessage, WhatsappError } from '@/app/lib/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

type SendBody = {
  to: string;
  body: string;
  reservationId?: string;
};

// Constant-time bearer-token check against INTERNAL_API_KEY.
// Fails closed when the env var is unset so a misconfigured deploy can't
// accept anonymous sends.
const isAuthorized = (req: NextRequest): boolean => {
  const expected = process.env.INTERNAL_API_KEY;
  if (!expected) return false;

  const header = req.headers.get('authorization');
  console.log(header)
  if (!header?.startsWith('Bearer ')) return false;
  const provided = header.slice('Bearer '.length);

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, providedBuf);
};

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

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
