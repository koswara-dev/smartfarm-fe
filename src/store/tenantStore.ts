import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

// Define the Tenant interface based on the provided JSON structure
export interface Tenant {
  id: number
  name: string
  email: string
  domain: string
  subdomain: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
  active: boolean
}

// Define the state structure for the tenant store
interface TenantState {
  tenants: Tenant[]
  loading: boolean
  error: string | null
  fetchTenants: () => Promise<void>
  createTenant: (
    newTenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  updateTenant: (id: number, updatedTenant: Partial<Tenant>) => Promise<void>
  deleteTenant: (id: number) => Promise<void>
}

// Create the Zustand store
export const useTenantStore = create<TenantState>((set, get) => ({
  tenants: [],
  loading: false,
  error: null,

  fetchTenants: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/api/v1/tenants')
      if (response.data.success) {
        set({ tenants: response.data.data, loading: false })
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch tenants'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  createTenant: async (newTenant) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post('/api/v1/tenants', newTenant)
      if (response.data.success) {
        get().fetchTenants() // Refresh the list
        toast.success('Tenant created successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to create tenant'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  updateTenant: async (id, updatedTenant) => {
    set({ loading: true, error: null })
    try {
      const response = await api.put(`/api/v1/tenants/${id}`, updatedTenant)
      if (response.data.success) {
        get().fetchTenants() // Refresh the list
        toast.success('Tenant updated successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to update tenant'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  },

  deleteTenant: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await api.delete(`/api/v1/tenants/${id}`)
      if (response.data.success) {
        get().fetchTenants() // Refresh the list
        toast.success('Tenant deleted successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message)
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to delete tenant'
      set({ error: errorMessage, loading: false })
      toast.error(errorMessage)
    }
  }
}))
