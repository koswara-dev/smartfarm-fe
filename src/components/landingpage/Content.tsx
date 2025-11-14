import React, { useState, useEffect } from 'react'

interface Feature {
  icon: string
  title: string
  description: string
}

interface Product {
  id: string
  originalPrice: number
  discount: number
}

interface ContentData {
  features: Feature[]
  products: Product[]
}

const Content: React.FC = () => {
  const [contentData, setContentData] = useState<ContentData | null>(null)

  useEffect(() => {
    fetch('/assets/data.json')
      .then((response) => response.json())
      .then((data) => setContentData(data))
      .catch((error) => console.error('Error loading content data:', error))
  }, [])

  if (!contentData) {
    return null // Or a loading spinner
  }

  const { features, products } = contentData

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`
  }

  return (
    <main>
      {/* 2. Hero Section */}
      <section id="home" className="bg-green-50 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl font-extrabold text-green-800 leading-tight mb-4">
              Solusi Smart Farming untuk Pertanian Modern
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tingkatkan efisiensi, optimalkan hasil panen, dan minimalkan
              risiko dengan teknologi pertanian cerdas kami.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300"
              >
                Mulai Sekarang
              </a>
              <a
                href="#"
                className="w-full sm:w-auto border border-green-600 text-green-600 px-8 py-3 rounded-full text-lg hover:bg-green-100 transition duration-300"
              >
                Lihat Demo
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://blob.cloudcomputing.id/images/774c5b3e-c15e-49a3-b796-f8f9d85c19c5/industri-pertanian-l-min.jpg"
              alt="IoT Pertanian"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 3. Tentang Smart Farming / Overview */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Tentang Smart Farming
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Smart Farming adalah pendekatan pertanian yang memanfaatkan
              teknologi informasi dan komunikasi (TIK) untuk meningkatkan
              kuantitas dan kualitas produk pertanian. Ini melibatkan penggunaan
              sensor, perangkat IoT, analisis data, dan otomatisasi untuk
              membuat keputusan yang lebih cerdas dan tepat waktu.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Kami membantu petani mengatasi tantangan seperti perubahan iklim,
              kelangkaan sumber daya, dan kebutuhan akan efisiensi yang lebih
              tinggi. Dengan solusi kami, pertanian menjadi lebih berkelanjutan
              dan produktif.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="p-6 bg-green-50 rounded-lg shadow-md flex flex-col items-center text-center">
                <img
                  src="https://img.icons8.com/?size=100&id=Fcwmn0n3hU3T&format=png&color=000000"
                  alt="Efisiensi Optimal"
                  className="w-12 h-12 text-green-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Efisiensi Optimal
                </h3>
                <p className="text-gray-600">
                  Mengurangi penggunaan air dan pupuk secara signifikan.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg shadow-md flex flex-col items-center text-center">
                <img
                  src="https://img.icons8.com/?size=100&id=eYaVJ9Nbqqbw&format=png&color=000000"
                  alt="Peningkatan Hasil"
                  className="w-12 h-12 text-green-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Peningkatan Hasil
                </h3>
                <p className="text-gray-600">
                  Meningkatkan kualitas dan kuantitas panen.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg shadow-md flex flex-col items-center text-center">
                <img
                  src="https://img.icons8.com/?size=100&id=119515&format=png&color=000000"
                  alt="Minim Risiko"
                  className="w-12 h-12 text-green-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  Minim Risiko
                </h3>
                <p className="text-gray-600">
                  Deteksi dini masalah untuk mencegah gagal panen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fitur Utama */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Fitur Utama Kami
          </h2>
          <div
            id="features-container"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cara Kerja Sistem (How It Works) */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Bagaimana Sistem Kami Bekerja
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex flex-col md:flex-row justify-between items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/5">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Sensor Membaca
                </h3>
                <p className="text-gray-600">
                  Sensor mengumpulkan data kondisi lahan.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/3 left-[18%] w-[10%] h-1 bg-green-300"></div>
              <div className="hidden md:block absolute top-1/3 left-[28%] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-300"></div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/5">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Data ke Cloud
                </h3>
                <p className="text-gray-600">
                  Data dikirimkan secara nirkabel ke platform cloud.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/3 left-[38%] w-[10%] h-1 bg-green-300"></div>
              <div className="hidden md:block absolute top-1/3 left-[48%] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-300"></div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/5">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Analisis Sistem
                </h3>
                <p className="text-gray-600">
                  Sistem menganalisis data untuk rekomendasi.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/3 left-[58%] w-[10%] h-1 bg-green-300"></div>
              <div className="hidden md:block absolute top-1/3 left-[68%] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-300"></div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/5">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Aksi Otomatis
                </h3>
                <p className="text-gray-600">
                  Sistem memicu irigasi atau pemupukan otomatis.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/3 left-[78%] w-[10%] h-1 bg-green-300"></div>
              <div className="hidden md:block absolute top-1/3 left-[88%] w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-300"></div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center md:w-1/5">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  5
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Pantau Dashboard
                </h3>
                <p className="text-gray-600">
                  Petani memantau dan mengontrol dari dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Teknologi yang Digunakan */}
      <section id="technology" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Teknologi yang Kami Gunakan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=QwvWb6oiCnGU&format=png&color=000000"
                alt="IoT Sensor"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">IoT Sensor</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=LqPVTFKIDbj6&format=png&color=000000"
                alt="AI/ML Prediction"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">
                AI/ML Prediction
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=Bjprvgn9kFNe&format=png&color=000000"
                alt="Cloud Computing"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">
                Cloud Computing
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=VPzA2p0kXxIO&format=png&color=000000"
                alt="Mobile App"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">Mobile App</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=yccKYNlDTMmK&format=png&color=000000"
                alt="Automation Controller"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">
                Automation Controller
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=100&id=2g34YzgTn1Vn&format=png&color=000000"
                alt="Drone / Imaging"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-gray-700">
                Drone / Imaging
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Produk / Paket Layanan */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Produk & Paket Layanan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => {
              const discountedPrice =
                product.originalPrice * (1 - product.discount / 100)
              const showDiscount = product.discount > 0
              const isAdvanced = product.id === 'advanced'

              return (
                <div
                  key={product.id}
                  className={`p-8 border ${
                    isAdvanced ? 'border-green-600' : 'border-gray-200'
                  } rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative`}
                >
                  {isAdvanced && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="relative flex h-8 w-20 items-center justify-center">
                        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <div className="relative bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                          Populer
                        </div>
                      </span>
                    </div>
                  )}
                  {showDiscount && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      DISKON <span>{product.discount}</span>%
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-green-700 mb-4">
                    Paket{' '}
                    {product.id.charAt(0).toUpperCase() + product.id.slice(1)}
                  </h3>
                  {product.id === 'enterprise' ? (
                    <p className="text-4xl font-extrabold text-gray-800 mb-6">
                      Hubungi Kami
                    </p>
                  ) : (
                    <p className="text-4xl font-extrabold text-gray-800 mb-2">
                      {showDiscount && (
                        <>
                          <span className="line-through text-gray-400 text-2xl mr-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <br />
                        </>
                      )}
                      <span>
                        {formatPrice(
                          showDiscount ? discountedPrice : product.originalPrice
                        )}
                      </span>
                      <span className="text-lg font-normal text-gray-500">
                        /bulan
                      </span>
                    </p>
                  )}
                  <ul className="text-left text-gray-600 mb-8 space-y-2">
                    {product.id === 'basic' && (
                      <>
                        <li>
                          <span className="font-semibold">1x</span> Node Sensor
                        </li>
                        <li>
                          <span className="font-semibold">3x</span> Jenis Sensor
                          (Suhu, Kelembaban, pH)
                        </li>
                        <li>Dashboard Real-time</li>
                        <li>Notifikasi Dasar</li>
                      </>
                    )}
                    {product.id === 'advanced' && (
                      <>
                        <li>
                          <span className="font-semibold">3x</span> Node Sensor
                        </li>
                        <li>
                          <span className="font-semibold">5x</span> Jenis Sensor
                          (termasuk Nutrisi)
                        </li>
                        <li>Sistem Irigasi Otomatis</li>
                        <li>Dashboard & Analytics Lengkap</li>
                        <li>Notifikasi & Alert Lanjutan</li>
                      </>
                    )}
                    {product.id === 'enterprise' && (
                      <>
                        <li>Solusi Kustom</li>
                        <li>Jumlah Node & Sensor Fleksibel</li>
                        <li>Integrasi Sistem Pihak Ketiga</li>
                        <li>Dukungan Prioritas 24/7</li>
                        <li>Manajemen Lahan Skala Besar</li>
                      </>
                    )}
                  </ul>
                  <a
                    href="#"
                    className="block bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300"
                  >
                    {product.id === 'enterprise'
                      ? 'Hubungi Kami'
                      : 'Pilih Paket'}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8. Keunggulan / Value Proposition */}
      <section id="advantages" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Mengapa Memilih SmartFarm?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=WwPnPb28Y3hI&format=png&color=000000"
                alt="Hemat Air & Pupuk"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Hemat Air & Pupuk
                </h3>
                <p className="text-gray-600">
                  Penggunaan sumber daya yang efisien berdasarkan data akurat.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=13555&format=png&color=000000"
                alt="Peningkatan Hasil Panen"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Peningkatan Hasil Panen
                </h3>
                <p className="text-gray-600">
                  Optimalkan kondisi pertumbuhan untuk panen yang lebih baik.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=9PR71X6VIKKp&format=png&color=000000"
                alt="Minim Resiko Gagal Panen"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Minim Resiko Gagal Panen
                </h3>
                <p className="text-gray-600">
                  Deteksi dini masalah dan tindakan pencegahan proaktif.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=jQozR5MuexzB&format=png&color=000000"
                alt="Monitoring 24/7"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Monitoring 24/7
                </h3>
                <p className="text-gray-600">
                  Pantau lahan Anda kapan saja, di mana saja.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=106265&format=png&color=000000"
                alt="Data Akurat & Real Time"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Data Akurat & Real Time
                </h3>
                <p className="text-gray-600">
                  Keputusan berdasarkan informasi terkini dan terpercaya.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start space-x-4">
              <img
                src="https://img.icons8.com/?size=100&id=E7pRLnx4cQqJ&format=png&color=000000"
                alt="Pertanian Berkelanjutan"
                className="mt-1"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Pertanian Berkelanjutan
                </h3>
                <p className="text-gray-600">
                  Mendukung praktik pertanian yang ramah lingkungan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimoni / Studi Kasus */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Apa Kata Petani Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-green-50 rounded-lg shadow-md">
              <img
                src="assets/petani-male.jpg"
                alt="Foto Petani 1"
                className="rounded-full mx-auto mb-4 w-40 h-40"
              />
              <p className="text-lg italic text-gray-700 mb-4">
                "SmartFarm benar-benar mengubah cara saya bertani. Hasil panen
                meningkat 30% dan penggunaan air berkurang drastis!"
              </p>
              <p className="font-semibold text-green-700">
                - Budi Santoso, Petani Padi
              </p>
            </div>
            <div className="p-8 bg-green-50 rounded-lg shadow-md">
              <img
                src="assets/petani-female.jpeg"
                alt="Foto Petani 2"
                className="rounded-full mx-auto mb-4 w-40 h-40"
              />
              <p className="text-lg italic text-gray-700 mb-4">
                "Dengan dashboard real-time, saya bisa memantau lahan kapan
                saja. Sangat membantu dalam mengambil keputusan cepat."
              </p>
              <p className="font-semibold text-green-700">
                - Siti Aminah, Petani Sayuran
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Galeri / Dokumentasi Lapangan */}
      <section id="gallery" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Galeri Lapangan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img
              src="https://wahananews.co/photo/berita/dir082022/teknologi-sensor-tanah-dan-cuaca-petani-dapatkan-informasi-lingkungan-pertanian-secara-real-time_F8QnXrglH2.jpg"
              alt="Sensor Lahan"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
            <img
              src="https://res.cloudinary.com/engineering-com/image/upload/w_640,h_640,c_limit,q_auto,f_auto/Aruino_IoT_Cloud_nbkgdu.jpg"
              alt="Dashboard SmartFarm"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
            <img
              src="https://agroindonesia.co.id/wp-content/uploads/2020/03/pompa-sawah.jpg"
              alt="Lahan Irigasi Otomatis"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
            <img
              src="https://cdn-1.timesmedia.co.id/images/2025/01/08/drone-pertanian.jpg"
              alt="Drone Pertanian"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgWkvuAQWGE8zlaSsgIIy7HNW--JhJayKew&s"
              alt="Smart Irrigation System"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
            <img
              src="https://static.wixstatic.com/media/1a34da_410f9678277341ed8bc94fda0dcdc115~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/1a34da_410f9678277341ed8bc94fda0dcdc115~mv2.jpg"
              alt="Petani Menggunakan Aplikasi"
              className="rounded-lg shadow-md object-cover mx-auto"
              width="400"
              height="300"
            />
          </div>
        </div>
      </section>

      {/* 11. FAQ (Pertanyaan Umum) */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-10">
            Pertanyaan Umum (FAQ)
          </h2>
          <div className="max-w-3xl mx-auto text-left">
            <div className="border-b border-gray-200 py-4">
              <details>
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-green-700">
                  Bagaimana cara pemasangan sistem SmartFarm?
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-2 text-gray-600">
                  Pemasangan sangat mudah, tim kami akan membantu instalasi dan
                  konfigurasi awal di lahan Anda.
                </p>
              </details>
            </div>
            <div className="border-b border-gray-200 py-4">
              <details>
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-green-700">
                  Apakah sistem ini membutuhkan internet stabil?
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-2 text-gray-600">
                  Ya, koneksi internet diperlukan untuk pengiriman data ke cloud
                  dan akses dashboard. Namun, sistem dapat beroperasi secara
                  offline untuk beberapa fungsi dasar.
                </p>
              </details>
            </div>
            <div className="border-b border-gray-200 py-4">
              <details>
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-green-700">
                  Bagaimana dengan perawatan (maintenance) sistem?
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-2 text-gray-600">
                  Sistem kami dirancang untuk minim perawatan. Kami juga
                  menyediakan panduan dan dukungan teknis jika diperlukan.
                </p>
              </details>
            </div>
            <div className="border-b border-gray-200 py-4">
              <details>
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-green-700">
                  Berapa jangkauan sensor yang tersedia?
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-2 text-gray-600">
                  Jangkauan sensor bervariasi tergantung jenis dan topografi
                  lahan. Kami akan melakukan survei untuk menentukan penempatan
                  optimal.
                </p>
              </details>
            </div>
            <div className="border-b border-gray-200 py-4">
              <details>
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-green-700">
                  Bagaimana dengan harga dan paket layanan?
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-2 text-gray-600">
                  Anda bisa melihat detail paket layanan kami di bagian "Produk
                  / Paket Layanan" di atas, atau hubungi kami untuk penawaran
                  kustom.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Call To Action Section */}
      <section className="bg-green-700 py-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Siap Meningkatkan Hasil Panen Anda?
          </h2>
          <p className="text-xl mb-8">
            Jangan lewatkan kesempatan untuk bertani lebih cerdas dan efisien.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-white text-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Hubungi Kami
            </a>
            <a
              href="#"
              className="w-full sm:w-auto border border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
            >
              Demo Gratis
            </a>
          </div>
        </div>
      </section>
      {/*
                // TODO: Convert the following script logic to React state and effect hooks:
                document.addEventListener('DOMContentLoaded', () => {
                    fetch('data.json')
                        .then(response => response.json())
                        .then(data => {
                            // Update Header
                            document.getElementById('header-logo').src = data.logoHeader;
                            document.getElementById('header-logo').alt = data.appName + " Logo";
                            document.getElementById('app-name').textContent = data.appName;

                            // Update Favicon
                            document.getElementById('favicon').href = data.favicon;

                            // Update Footer
                            document.getElementById('footer-app-name').textContent = data.appName;
                            document.getElementById('footer-logo').src = data.logoFooter;
                            document.getElementById('footer-logo').alt = data.appName + " Logo";
                            document.getElementById('footer-motto').textContent = data.footerMotto;

                            document.getElementById('contact-email').textContent = `Email: ${data.contact.email || 'info@smartfarm.com'}`;
                            document.getElementById('contact-phone').textContent = `Telepon: ${data.contact.phone || '+62 812 3456 7890'}`;
                            document.getElementById('contact-address').textContent = `Alamat: ${data.contact.address || 'Jl. Pertanian No. 1, Kota Hijau, Indonesia'}`;

                            const socialMediaLinks = document.getElementById('social-media-links');
                            socialMediaLinks.innerHTML = ''; // Clear existing links
                            for (const platform in data.socialMedia) {
                                const social = data.socialMedia[platform];
                                const a = document.createElement('a');
                                a.href = social.url;
                                a.className = 'text-gray-400 hover:text-white';
                                a.target = '_blank'; // Add target="_blank"
                                a.rel = 'noopener noreferrer'; // Add rel for security
                                const img = document.createElement('img');
                                img.src = social.icon;
                                img.alt = platform.charAt(0).toUpperCase() + platform.slice(1); // Capitalize first letter
                                a.appendChild(img);
                                socialMediaLinks.appendChild(a);
                            }

                            // Update Features Section
                            const featuresContainer = document.getElementById('features-container');
                            featuresContainer.innerHTML = ''; // Clear existing features
                            data.features.forEach(feature => {
                                const featureDiv = document.createElement('div');
                                featureDiv.className = 'p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300';

                                const img = document.createElement('img');
                                img.src = feature.icon;
                                img.alt = feature.title;
                                img.className = 'mx-auto mb-4';

                                const h3 = document.createElement('h3');
                                h3.className = 'text-xl font-semibold text-green-700 mb-3';
                                h3.textContent = feature.title;

                                const p = document.createElement('p');
                                p.className = 'text-gray-600';
                                p.textContent = feature.description;

                                featureDiv.appendChild(img);
                                featureDiv.appendChild(h3);
                                featureDiv.appendChild(p);
                                featuresContainer.appendChild(featureDiv);
                            });

                            // Product Discount Logic
                            const products = [
                                { id: 'basic', originalPrice: 500000, discount: 10 }, // 10% discount
                                { id: 'advanced', originalPrice: 1500000, discount: 14 } // 15% discount
                            ];

                            products.forEach(product => {
                                const originalPriceElement = document.getElementById(`original-price-${product.id}`);
                                const currentPriceElement = document.getElementById(`current-price-${product.id}`);
                                const discountBadgeElement = document.getElementById(`discount-badge-${product.id}`);
                                const discountPercentageElement = document.getElementById(`discount-percentage-${product.id}`);

                                console.log(product.id)

                                if (product.discount > 0) {
                                    const discountedPrice = product.originalPrice * (1 - product.discount / 100);
                                    originalPriceElement.textContent = `Rp ${product.originalPrice.toLocaleString('id-ID')}`;
                                    originalPriceElement.style.display = 'inline';
                                    currentPriceElement.textContent = `Rp ${discountedPrice.toLocaleString('id-ID')}`;
                                    discountPercentageElement.textContent = product.discount;
                                    discountBadgeElement.style.display = 'block';
                                } else {
                                    currentPriceElement.textContent = `Rp ${product.originalPrice.toLocaleString('id-ID')}`;
                                }
                            });
                        })
                        .catch(error => console.error('Error loading data.json:', error));

                    // Mobile menu toggle logic
                    const mobileMenuButton = document.getElementById('mobile-menu-button');
                    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
                    const mobileMenu = document.getElementById('mobile-menu');

                    if (mobileMenuButton && mobileMenu) {
                        mobileMenuButton.addEventListener('click', () => {
                            mobileMenu.classList.remove('hidden');
                        });
                    }

                    if (closeMobileMenuButton && mobileMenu) {
                        closeMobileMenuButton.addEventListener('click', () => {
                            mobileMenu.classList.add('hidden');
                        });
                    }

                    // Close mobile menu when a link is clicked
                    mobileMenu.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            mobileMenu.classList.add('hidden');
                        });
                    });
                });
            */}
    </main>
  )
}

export default Content
