import React from 'react'

const RegisterForm: React.FC = () => {
  return (
    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-2">
        Daftar Akun Smart Farming
      </h2>
      <p className="text-gray-600 mb-8">
        Kelola lahan dan sensor Anda dengan lebih mudah.
      </p>

      <form action="#" method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="phone-number"
            className="block text-sm font-medium text-gray-700"
          >
            Nomor HP (opsional)
          </label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role / Tipe Pengguna
          </label>
          <select
            id="role"
            name="role"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">Pilih Role</option>
            <option value="petani">Petani</option>
            <option value="teknisi-iot">Teknisi IoT</option>
            <option value="admin-lahan">Admin Lahan</option>
            <option value="distributor">Distributor (opsional)</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              id="terms-conditions"
              name="terms-conditions"
              type="checkbox"
              required
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms-conditions"
              className="ml-2 block text-sm text-gray-900"
            >
              Saya menyetujui{' '}
              <a href="#" className="text-green-600 hover:text-green-700">
                Syarat & Ketentuan
              </a>
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="sensor-notifications"
              name="sensor-notifications"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="sensor-notifications"
              className="ml-2 block text-sm text-gray-900"
            >
              Terima notifikasi status sensor (opsional)
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
          >
            Buat Akun
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?
        <a
          href="login.html"
          className="font-medium text-green-600 hover:text-green-700"
        >
          Login
        </a>
      </p>
    </div>
  )
}

export default RegisterForm
