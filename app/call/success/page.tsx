import { BackButton } from './BackButton';

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { locationId?: string };
}) {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <div className="text-green-500 text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">Panggilan Terkirim!</h1>
      <p className="mb-4">
        Bantuan sedang dalam perjalanan ke lokasi:{' '}
        <strong>{searchParams.locationId}</strong>
      </p>
      <BackButton />
    </div>
  );
}