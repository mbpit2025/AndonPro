'use client';

import { use } from 'react';
import { useState } from 'react';

export function CallForm({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  // ✅ `use()` unwraps the Promise — safe inside Suspense
  const params = use(searchParams);
  const locationId = params.locationId;

  const [category, setCategory] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCall = async () => {
    if (!category || !locationId) {
      setError('Kategori dan lokasi diperlukan');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId, category }),
      });

      if (res.ok) {
        // ✅ Better than alert() + full reload
        window.location.href = '/call/success?locationId=' + encodeURIComponent(locationId);
      } else {
        const data = await res.json();
        setError(data.error || 'Gagal mengirim panggilan');
      }
    } catch (err) {
      setError('Kesalahan jaringan');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!locationId) {
    return <div className="text-red-600">❌ Lokasi tidak ditemukan. Scan ulang QR code.</div>;
  }

  return (
    <>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="space-y-4">
        {['Mekanik', 'Quality', 'Material'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`w-full p-4 rounded-lg transition ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 w-full bg-green-600 text-white p-3 rounded disabled:opacity-50 hover:bg-green-700 transition"
        onClick={handleCall}
        disabled={!category || submitting}
      >
        {submitting ? 'Mengirim...' : 'Kirim Panggilan'}
      </button>
    </>
  );
}