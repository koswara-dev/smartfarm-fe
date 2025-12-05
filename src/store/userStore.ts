import { create } from 'zustand'
import { toast } from 'react-toastify'
import { api } from '../config/api'

// Define the User interface based on the provided JSON structure
export interface User {
  id: number
  fullName: string
  email: string
  isActive: boolean
  tenantId: number
  tenantName: string
  createdAt: string
  updatedAt: string | null
  password?: string // Add password field here
}

// Define the state structure for the user store
interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: (isActive?: boolean) => Promise<void>
  createUser: (newUser: any) => Promise<void>
  updateUser: (id: number, updatedUser: any) => Promise<void>
  deleteUser: (id: number) => Promise<void>
}

// Create the Zustand store
export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async (isActive?: boolean) => {
    set({ loading: true, error: null })
    try {
      const params: { isActive?: boolean } = {}
      if (isActive !== undefined) {
        params.isActive = isActive
      }
      const response = await api.get('/api/v1/users', { params })
      if (response.data.success) {
        set({ users: response.data.data.content, loading: false })
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch users'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  createUser: async (newUser: any) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post('/api/v1/users', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.data.success) {
        get().fetchUsers() // Refresh the list
        toast.success('User created successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to create user'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  updateUser: async (id, updatedUser: any) => {
    set({ loading: true, error: null })
    try {
      const response = await api.put(`/api/v1/users/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.data.success) {
        get().fetchUsers() // Refresh the list
        toast.success('User updated successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to update user'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await api.delete(`/api/v1/users/${id}`)
      if (response.data.success) {
        get().fetchUsers() // Refresh the list
        toast.success('User deleted successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to delete user'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  }
}))
