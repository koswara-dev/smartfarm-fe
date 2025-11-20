import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { api } from '../../config/api'
import useAuthStore from '../../store/authStore'

const LoginForm: React.FC = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const [email, setEmail] = useState('samaltman@openai.id')
  const [password, setPassword] = useState('user1234')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        login(response.data.data.token) // Store the token in Zustand
        navigate('/admin')
      } else {
        alert(response.data.message || 'Login failed.')
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'An error occurred during login.')
    }
  }

  return (
    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-2">
        Login ke Akun Smart Farming
      </h2>
      <p className="text-gray-600 mb-8">
        Selamat datang kembali! Masuk untuk mengelola lahan Anda.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Ingat saya
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-700"
            >
              Lupa password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
          >
            Login
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?
        <a
          href="register"
          className="font-medium text-green-600 hover:text-green-700"
        >
          Daftar sekarang
        </a>
      </p>
    </div>
  )
}

export default LoginForm
