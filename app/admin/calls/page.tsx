'use client';

import { useEffect, useState, useRef } from 'react';

type AndonCall = {
  id: string;
  category: string;
  status: 'pending' | 'responded' | 'resolved';
  calledAt: string;
  respondedAt: string | null;
  resolvedAt: string | null;
  location: { name: string };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-red-100 text-red-800';
    case 'responded': return 'bg-yellow-100 text-yellow-800';
    case 'resolved': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Menunggu';
    case 'responded': return 'Direspon';
    case 'resolved': return 'Selesai';
    default: return status;
  }
};

const formatTime = (dateString: string | null) => {
  if (!dateString) return '–';
  return new Date(dateString).toLocaleString('id-ID');
};

const speak = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.9;
  utterance.volume = 1.0;
  window.speechSynthesis.speak(utterance);
};

const announceCall = (call: AndonCall, repeat = 1) => {
  const message = `Panggilan kepada ${call.category} ke ${call.location.name}`;
  let count = 0;

  const say = () => {
    if (count < repeat) {
      speak(message);
      count++;
      if (count < repeat) {
        setTimeout(say, 2000); // jeda 2 detik antar pengumuman
      }
    }
  };
  say();
};

export default function AndonDashboard() {
  const [calls, setCalls] = useState<AndonCall[]>([]);
  const pendingCallRef = useRef<AndonCall | null>(null);
  const oneMinuteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnnouncedRef = useRef<Set<string>>(new Set());

  const fetchCalls = () => {
    fetch('/api/calls')
      .then(res => res.json())
      .then(data => setCalls(data))
      .catch(() => {});
  };

  useEffect(() => {
    // Cari panggilan pending terbaru (paling baru berdasarkan waktu)
    const pendingCalls = calls
      .filter(call => call.status === 'pending')
      .sort((a, b) => new Date(b.calledAt).getTime() - new Date(a.calledAt).getTime());

    const latestPending = pendingCalls[0];

    // Bersihkan timeout lama jika lokasi berubah
    if (oneMinuteTimeoutRef.current) {
      clearTimeout(oneMinuteTimeoutRef.current);
      oneMinuteTimeoutRef.current = null;
    }

    if (latestPending) {
      const isNewCall = !hasAnnouncedRef.current.has(latestPending.id);

      if (isNewCall) {
        // Simpan sebagai sudah diumumkan
        hasAnnouncedRef.current.add(latestPending.id);
        pendingCallRef.current = latestPending;

        // Ucapkan 3x
        announceCall(latestPending, 3);

        // Set timeout 1 menit untuk pengingat
        oneMinuteTimeoutRef.current = setTimeout(() => {
          // Cek lagi: apakah panggilan ini masih pending?
          const currentCalls = calls;
          const stillPending = currentCalls.some(
            call => call.id === latestPending.id && call.status === 'pending'
          );

          if (stillPending) {
            speak(`Pengingat: ${latestPending.category} ke ${latestPending.location.name} belum direspons.`);
          }
        }, 60 * 1000); // 1 menit
      }
    } else {
      // Tidak ada pending → reset
      pendingCallRef.current = null;
    }
  }, [calls]);

  useEffect(() => {
    fetchCalls();
    const interval = setInterval(fetchCalls, 5000);
    return () => {
      clearInterval(interval);
      if (oneMinuteTimeoutRef.current) {
        clearTimeout(oneMinuteTimeoutRef.current);
      }
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Semua Panggilan Andon</h1>

      {calls.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Lokasi</th>
                <th className="px-4 py-2 text-left">Kategori</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Dipanggil</th>
                <th className="px-4 py-2 text-left">Direspon</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{call.location.name}</td>
                  <td className="px-4 py-2">{call.category}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(call.status)}`}>
                      {getStatusLabel(call.status)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">{formatTime(call.calledAt)}</td>
                  <td className="px-4 py-2 text-sm">{formatTime(call.respondedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Belum ada panggilan.</p>
      )}

      <div className="mt-4 text-sm text-gray-500">
        🔄 Halaman ini otomatis segarkan tiap 5 detik.
      </div>
    </div>
  );
}