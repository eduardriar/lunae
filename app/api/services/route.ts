import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { state: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error en GET /api/services:', error);

    return NextResponse.json(
      { error: 'Error al obtener los servicios' },
      { status: 500 }
    );
  }
}
