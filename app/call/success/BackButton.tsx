'use client';

export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="text-blue-600 hover:underline focus:outline-none"
    >
      Kembali ke Halaman Sebelumnya
    </button>
  );
}