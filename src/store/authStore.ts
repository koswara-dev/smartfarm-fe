import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  sub: string
  iat: number
  exp: number
  fullName: string
  role: string
}

interface AuthState {
  token: string | null
  user: DecodedToken | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  checkTokenExpiration: () => boolean
}

const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token') || null, // Initialize from localStorage
  user: null,
  isAuthenticated: false,

  login: (token: string) => {
    localStorage.setItem('token', token) // Store token in localStorage
    const decodedUser = jwtDecode<DecodedToken>(token)
    set({ token, user: decodedUser, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token') // Remove token from localStorage
    set({ token: null, user: null, isAuthenticated: false })
  },

  checkTokenExpiration: () => {
    const token = get().token
    if (!token) {
      return true // Token doesn't exist, considered expired
    }
    try {
      const decoded: DecodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000 // current time in seconds
      if (decoded.exp < currentTime) {
        get().logout() // Token expired, log out
        return true
      }
      return false // Token not expired
    } catch (error) {
      console.error('Error decoding token:', error)
      get().logout() // Invalid token, log out
      return true
    }
  }
}))

// Initialize user and isAuthenticated if token exists on app load
useAuthStore.setState((state) => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decodedUser: DecodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      if (decodedUser.exp > currentTime) {
        return { token, user: decodedUser, isAuthenticated: true }
      } else {
        localStorage.removeItem('token') // Token expired, clear it
      }
    } catch (error) {
      console.error('Error decoding token on init:', error)
      localStorage.removeItem('token') // Invalid token, clear it
    }
  }
  return { token: null, user: null, isAuthenticated: false }
})

export default useAuthStore
