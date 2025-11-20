import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { toast } from 'react-toastify'
import { api } from '../config/api'

export interface User {
  id: number
  fullName: string
  email: string
  isActive: boolean
  tenantId: number
  tenantName: string
  createdAt: string
  updatedAt: string | null
}

export interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

interface UserStore {
  users: User[]
  page: Page | null
  loading: boolean
  error: string | null
  fetchUsers: (
    email?: string,
    isActive?: string,
    tenantId?: string | null,
    page?: number,
    size?: number
  ) => Promise<void>
  addUser: (
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'tenantName'>
  ) => Promise<void>
  updateUser: (
    id: number,
    user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'tenantName'>>
  ) => Promise<void>
  deleteUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserStore>()(
  devtools((set, get) => ({
    users: [],
    page: null,
    loading: false,
    error: null,

    fetchUsers: async (email, isActive, tenantId, page = 0, size = 20) => {
      set({ loading: true, error: null })
      try {
        const params: {
          email?: string
          isActive?: string
          tenantId?: string
          page?: number
          size?: number
        } = { page, size }
        if (email) {
          params.email = email
        }
        if (isActive && isActive !== 'All') {
          params.isActive = isActive === 'Active' ? 'true' : 'false'
        }
        if (tenantId && tenantId !== 'All') {
          params.tenantId = tenantId
        }

        const response = await api.get('/api/v1/users', { params })
        if (response.data.success) {
          set({
            users: response.data.data.content,
            page: response.data.data.page,
            loading: false
          })
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

    addUser: async (user) => {
      set({ loading: true, error: null })
      try {
        const response = await api.post('/api/v1/users', user)
        if (response.data.success) {
          const { number, size } = get().page || { number: 0, size: 20 }
          get().fetchUsers(undefined, undefined, undefined, number, size) // Refresh the list with current pagination
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

    updateUser: async (id, user) => {
      set({ loading: true, error: null })
      try {
        const response = await api.put(`/api/v1/users/${id}`, user)
        if (response.data.success) {
          const { number, size } = get().page || { number: 0, size: 20 }
          get().fetchUsers(undefined, undefined, undefined, number, size) // Refresh the list with current pagination
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
          const { number, size } = get().page || { number: 0, size: 20 }
          get().fetchUsers(undefined, undefined, undefined, number, size) // Refresh the list with current pagination
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
)
