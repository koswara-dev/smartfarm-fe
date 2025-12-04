import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { api } from '../../config/api'
import useAuthStore from '../../store/authStore'

// captcha
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha'

const LoginForm: React.FC = () => {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const [email, setEmail] = useState('samaltman@openai.id')
  const [password, setPassword] = useState('user1234')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // captcha state
  const [captchaInput, setCaptchaInput] = useState('')

  useEffect(() => {
    loadCaptchaEnginge(6) // generate captcha 6 karakter
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate Captcha First
    if (validateCaptcha(captchaInput) === false) {
      alert('Captcha salah, silakan coba lagi!')
      return
    }

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        login(response.data.data.token)
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
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* CAPTCHA */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Verifikasi Captcha
          </label>

          {/* gambar captcha */}
          <LoadCanvasTemplate reloadText="Reload" />

          <input
            type="text"
            required
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Masukkan captcha di atas"
          />
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm">
              Ingat saya
            </label>
          </div>
          <a className="text-sm text-green-600 cursor-pointer">
            Lupa password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <a href="register" className="text-green-600 font-medium">
          Daftar sekarang
        </a>
      </p>
    </div>
  )
}

export default LoginForm
