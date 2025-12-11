import { Suspense } from 'react';
import { CallForm } from './CallForm';

export default function CallPage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panggil Bantuan</h1>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <CallForm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}