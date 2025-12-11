'use client';

import { QRCodeSVG } from 'qrcode.react';

export function QrCodeGenerator({ locationId, locationName }: { locationId: string; locationName: string }) {
  // 🔒 Pastikan locationId valid
  if (!locationId) {
    return <div className="text-center mb-4 text-red-500">Error: Lokasi tidak valid</div>;
  }

  const url = `${window.location.origin}/scanner?locationId=${encodeURIComponent(locationId)}`;
  
  return (
    <div className="flex flex-col items-center justify-around text-center border w-[160]">
      <p className="font-medium">{locationName}</p>
      <QRCodeSVG value={url} size={140} />
      <p className="text-xs mt-1 break-all text-gray-600 text-wrap">{url}</p>
    </div>
  );
}