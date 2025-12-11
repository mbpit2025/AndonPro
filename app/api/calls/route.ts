import { NextResponse } from 'next/server';
import  prisma  from '@/app/lib/prisma';
import { sendTelegramNotification } from '@/app/lib/telegram';

// GET: ambil panggilan terbaru per lokasi
// GET semua panggilan (untuk dashboard)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get('locationId');

  // Jika dipanggil dari scanner → hanya 1 terbaru
  if (locationId) {
    const calls = await prisma.andonCall.findMany({
      where: {locationId, status: "pending"},
      orderBy: { calledAt: 'desc' },
      include: { location: true},
    });
    return NextResponse.json(calls);
  }

  // Jika tidak ada locationId → ambil SEMUA (untuk dashboard)
  const allCalls = await prisma.andonCall.findMany({
    orderBy: { calledAt: 'desc' },
    include: { location: true },
  });

  return NextResponse.json(allCalls);
}

// POST: buat panggilan baru
export async function POST(req: Request) {
  try {
    const { locationId, category } = await req.json();

    // ✅ Validate & coerce if needed
    if (!locationId || !category) {
      return NextResponse.json(
        { error: 'locationId and category are required' },
        { status: 400 }
      );
    }

    // If locationId is string but Prisma expects number (e.g., Int ID)
    // const locationIdNum = typeof locationId === 'string' ? parseInt(locationId, 10) : locationId;

    const call = await prisma.andonCall.create({
      data: {
        locationId, // must match Prisma's field type (String or Int)
        category,
        status: 'pending',
      },
      include: {
        location: true,
      },
    });

    // Kirim notifikasi Telegram
    await sendTelegramNotification(
      `🚨 ANDON BARU!\nLokasi: ${call.location.name}\nJenis: ${category}`
    );

    return NextResponse.json(call, { status: 201 });
  } catch (error) {
    console.error('Error creating andon call:', error);
    return NextResponse.json(
      { error: 'Gagal membuat panggilan andon' },
      { status: 500 }
    );
  }
}