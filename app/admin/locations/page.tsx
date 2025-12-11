'use client';

import { useState, useEffect } from 'react';
import { QrCodeGenerator } from '@/app/components/QrCodeGenerator';
import type { Location } from '@/types';


export default function LocationsAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newName, setNewName] = useState('');

  const loadLocations = () => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(setLocations);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setNewName('');
    loadLocations();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kelola Lokasi</h1>

      <div className="mb-8">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama lokasi (misal: Line 1)"
          className="border p-2 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah Lokasi
        </button>
      </div>

      <div className='w-full'>
        <h2 className="text-xl font-semibold mb-4">QR Code per Lokasi</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-6">
          {locations.map((loc) => (
            <QrCodeGenerator key={loc.id} locationId={loc.id} locationName={loc.name} />
          ))}
        </div>
      </div>
    </div>
  );
}