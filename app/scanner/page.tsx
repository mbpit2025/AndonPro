'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function ScannerContent() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId');

  useEffect(() => {
    console.log('🔄 useEffect dijalankan dengan locationId:', locationId);
    if (!locationId) {
      alert('QR code tidak valid');
      return;
    }

    fetch(`/api/calls?locationId=${encodeURIComponent(locationId)}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })

      .then(data => {
        const latestCall = data[0];
        console.log(latestCall)
        if (latestCall && latestCall.status === 'pending') {
          window.location.href = `/respond?locationId=${locationId}`;
        } else {
          window.location.href = `/call?locationId=${locationId}`;
        }
      })
      .catch(err => {
        console.error('Scan error:', err);
        alert('Gagal memindai lokasi');
      });
  }, [locationId]);

  return <div className="p-8 text-center">🔍 Memindai QR...</div>;
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScannerContent />
    </Suspense>
  )
}