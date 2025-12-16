import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="px-6 py-4 sm:px-10">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-indigo-700">AndonPro</div>
          <div className="hidden md:flex space-x-8 text-gray-700">
            <Link href="#features" className="hover:text-indigo-600">Fitur</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600">Cara Kerja</Link>
            <Link href="#pricing" className="hover:text-indigo-600">Harga</Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Masuk
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Daftar Sekarang
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-6 sm:px-10 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sistem Andon Cerdas untuk Manufaktur Modern
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            AndonPro membantu tim produksi Anda merespons gangguan secara real-time, meningkatkan efisiensi, dan mengurangi downtime dengan notifikasi otomatis & dashboard visual.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
            >
              Coba Demo Gratis
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        {/* Placeholder for Hero Image or Dashboard Preview */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
          <div className="text-center text-gray-500 italic">[Preview Dashboard AndonPro – Real-time Andon Calls with Voice & Telegram Alerts]</div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-6 sm:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fitur Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Notifikasi Real-Time",
                desc: "Dapatkan alert instan via Telegram, suara, dan visual dashboard saat ada panggilan Andon."
              },
              {
                title: "Klasifikasi Panggilan Cerdas",
                desc: "Kelola berbagai jenis panggilan: Mekanik, Kualitas, Material, dan lainnya — disesuaikan dengan lini produksi Anda."
              },
              {
                title: "Integrasi Mudah",
                desc: "Terhubung ke sistem existing Anda dalam hitungan menit. Tidak perlu infrastruktur rumit."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works */}
      <section id="how-it-works" className="px-6 sm:px-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Bagaimana AndonPro Bekerja?</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Flow Steps */}
              <div>
                <ol className="space-y-8 relative pl-6 border-l-2 border-indigo-200">
                  {[
                    {
                      title: "Lokasi Dipetakan dengan QR Code",
                      desc: "Setiap stasiun atau area kritis di lini produksi dilengkapi QR code unik yang merepresentasikan lokasinya."
                    },
                    {
                      title: "Scan untuk Panggil Bantuan",
                      desc: "Operator atau team leader cukup scan QR code menggunakan ponsel untuk memilih jenis panggilan: Mekanik, Quality, atau Material."
                    },
                    {
                      title: "Notifikasi Otomatis ke Departemen",
                      desc: "Setiap panggilan terekam secara real-time dan dikirim langsung ke departemen terkait (Mekanik/QC/Supply)."
                    },
                    {
                      title: "Pengumuman Suara Otomatis",
                      desc: "Sistem Announcer membacakan jenis panggilan dan lokasi tujuan menggunakan text-to-speech (suara perempuan, kecepatan disesuaikan)."
                    },
                    {
                      title: "Penyelesaian via Scan Konfirmasi",
                      desc: "Petugas datang ke lokasi, lalu scan QR code yang sama untuk menandai bahwa kasus telah selesai dan waktu respon tercatat."
                    }
                  ].map((step, idx) => (
                    <li key={idx} className="relative">
                      <span className="absolute -left-12 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                        {idx + 1}
                      </span>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Illustration Placeholder */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-center text-gray-500 mb-4 font-medium">Ilustrasi Alur Kerja AndonPro</div>
                <div className="space-y-4">
                  {[
                    { label: "1. Lokasi → QR Code", icon: "📍" },
                    { label: "2. Scan → Pilih Jenis Panggilan", icon: "📱" },
                    { label: "3. Alert ke Departemen + Announcer", icon: "🔊" },
                    { label: "4. Petugas Scan untuk Konfirmasi Selesai", icon: "✅" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-xs text-gray-400 italic">
                  Ilustrasi dapat diganti dengan diagram SVG/animasi di implementasi nyata.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Tingkatkan Efisiensi Produksi?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Daftar hari ini dan dapatkan akses gratis selama 14 hari. Tidak perlu kartu kredit.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          Mulai Sekarang
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">AndonPro</div>
          <p className="text-gray-400 mb-6">Sistem Andon berbasis cloud untuk pabrik masa kini.</p>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AndonPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}