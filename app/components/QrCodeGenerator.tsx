'use client';

import { QRCodeSVG } from 'qrcode.react';

export function QrCodeGenerator({ locationId, locationName }: { locationId: string; locationName: string }) {
  // 🔒 Pastikan locationId valid
  if (!locationId) {
    return <div className="text-center mb-4 text-red-500">Error: Lokasi tidak valid</div>;
  }

  const url = `${window.location.origin}/scanner?locationId=${encodeURIComponent(locationId)}`;
  
  return (
    <div className="text-center mb-4">
      <p className="font-medium">{locationName}</p>
      <QRCodeSVG value={url} size={128} />
      <p className="text-xs mt-1 break-all text-gray-600">{url}</p>
    </div>
  );
}