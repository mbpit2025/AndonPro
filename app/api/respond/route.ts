import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: Request) {
  try {
    const { locationId } = await req.json();

    // Optional: validate/parse locationId if it's Int (see note below)
    // const locId = typeof locationId === 'string' ? parseInt(locationId, 10) : locationId;

    const latestCall = await prisma.andonCall.findFirst({
      where: { locationId, status: 'pending' },
      orderBy: { calledAt: 'desc' },
    });

    if (!latestCall) {
      return NextResponse.json(
        { error: 'Tidak ada panggilan aktif' },
        { status: 404 }
      );
    }

    // ✅ No unused var: just await the update
    await prisma.andonCall.update({
      where: { id: latestCall.id },
      data: {
        status: 'responded',
        respondedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating andon call:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui status panggilan' },
      { status: 500 }
    );
  }
}