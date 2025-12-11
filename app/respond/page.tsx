'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RespondPage() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId');
  const [locationName, setLocationName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (locationId) {
      fetch(`/api/locations/${locationId}`)
        .then(res => res.json())
        .then(data => setLocationName(data.name));
    }
  }, [locationId]);

  const handleRespond = async () => {
    if (!locationId) return;
    setSubmitting(true);

    const res = await fetch('/api/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationId }),
    });

    if (res.ok) {
      alert('Respon tercatat. Terima kasih!');
      window.location.href = '/admin/calls';
    } else {
      alert('Gagal mencatat respon');
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Respon Panggilan</h1>
      <p className="mb-6">
        Lokasi: <strong>{locationName || '–'}</strong>
      </p>
      <button
        className="w-full bg-red-600 text-white p-4 rounded text-lg disabled:opacity-50"
        onClick={handleRespond}
        disabled={submitting}
      >
        {submitting ? 'Mencatat...' : 'Saya Telah Datang'}
      </button>
    </div>
  );
}