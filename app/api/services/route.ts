import { getActiveServices } from '@/app/lib/services';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await getActiveServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error en GET /api/services:', error);

    return NextResponse.json(
      { error: 'Error al obtener los servicios' },
      { status: 500 }
    );
  }
}
