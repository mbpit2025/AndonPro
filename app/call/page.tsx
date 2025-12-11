'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CallPage() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId');
  const [category, setCategory] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleCall = async () => {
    if (!category || !locationId) return;
    setSubmitting(true);

    const res = await fetch('/api/calls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locationId, category }),
    });

    if (res.ok) {
      alert('Panggilan berhasil dikirim!');
      window.location.href = '/admin/calls'; // atau redirect ke success page
    } else {
      alert('Gagal mengirim panggilan');
    }
    setSubmitting(false);
  };

  if (!locationId) return <div>Error: Lokasi tidak ditemukan</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panggil Bantuan</h1>
      <div className="space-y-4">
        {['Mekanik', 'Quality', 'Material'].map((cat) => (
          <button
            key={cat}
            className={`w-full p-4 rounded-lg ${
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
        className="mt-6 w-full bg-green-600 text-white p-3 rounded disabled:opacity-50"
        onClick={handleCall}
        disabled={!category || submitting}
      >
        {submitting ? 'Mengirim...' : 'Kirim Panggilan'}
      </button>
    </div>
  );
}