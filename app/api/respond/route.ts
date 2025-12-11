import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { sendTelegramNotification } from '@/app/lib/telegram';

export async function POST(req: Request) {
  try {
    const { locationId } = await req.json();

    const latestCall = await prisma.andonCall.findFirst({
      where: { locationId, status: 'pending' },
      orderBy: { calledAt: 'desc' },
      include: {location: true}
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

      // 5. 🔔 Kirim notifikasi Telegram (non-blocking, fire-and-forget)
    const locationName = latestCall.location?.name || locationId;
    const durationMs = Date.now() - latestCall.calledAt.getTime();
    const durationSec = Math.floor(durationMs / 1000 / 60);
    const message = `✅ **Panggilan Diselesaikan**\n` +
      `Lokasi: ${locationName}\n` +
      `Jenis: ${latestCall.category || '—'}\n` +
      `Ditanggapi pada: ${new Date().toLocaleString('id-ID')}` +
      `\nDurasi: ${durationSec} menit`;

    // Jalankan async tanpa await → tidak memperlambat respons API
    sendTelegramNotification(message).catch((err) =>
      console.warn('[Telegram] Gagal kirim notifikasi:', err)
    );


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating andon call:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui status panggilan' },
      { status: 500 }
    );
  }
}