import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const therapists = await prisma.user.findMany({
      where: {
        userType: { name: 'therapist' },
        state: 'active',
      },
      include: { userType: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(therapists);
  } catch (error) {
    console.error('Error en GET /api/therapists:', error);

    return NextResponse.json(
      { error: 'Error al obtener los terapeutas' },
      { status: 500 }
    );
  }
}
