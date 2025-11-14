import { create } from 'zustand'
import { toast } from 'react-toastify'
import { api } from '../config/api'

// Define the SubscriptionPlan interface based on the provided JSON structure
export interface SubscriptionPlan {
  id: number
  name: string
  priceMonthly: number
  priceYearly: number
  maxUsers: number
  maxDevices: number
  description: string
  createdAt: string
  updatedAt: string | null
}

// Define the state structure for the subscription plan store
interface SubscriptionPlanState {
  subscriptionPlans: SubscriptionPlan[]
  loading: boolean
  error: string | null
  fetchSubscriptionPlans: () => Promise<void>
  createSubscriptionPlan: (
    newPlan: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  updateSubscriptionPlan: (
    id: number,
    updatedPlan: Partial<SubscriptionPlan>
  ) => Promise<void>
  deleteSubscriptionPlan: (id: number) => Promise<void>
}

// Create the Zustand store
export const useSubscriptionPlanStore = create<SubscriptionPlanState>(
  (set, get) => ({
    subscriptionPlans: [],
    loading: false,
    error: null,

    fetchSubscriptionPlans: async () => {
      set({ loading: true, error: null })
      try {
        const response = await api.get('/api/v1/subscription-plans')
        if (response.data.success) {
          set({ subscriptionPlans: response.data.data, loading: false })
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch subscription plans'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    createSubscriptionPlan: async (newPlan) => {
      set({ loading: true, error: null })
      try {
        const response = await api.post('/api/v1/subscription-plans', newPlan)
        if (response.data.success) {
          get().fetchSubscriptionPlans() // Refresh the list
          toast.success('Subscription plan created successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to create subscription plan'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    updateSubscriptionPlan: async (id, updatedPlan) => {
      set({ loading: true, error: null })
      try {
        const response = await api.put(
          `/api/v1/subscription-plans/${id}`,
          updatedPlan
        )
        if (response.data.success) {
          get().fetchSubscriptionPlans() // Refresh the list
          toast.success('Subscription plan updated successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to update subscription plan'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    deleteSubscriptionPlan: async (id) => {
      set({ loading: true, error: null })
      try {
        const response = await api.delete(`/api/v1/subscription-plans/${id}`)
        if (response.data.success) {
          get().fetchSubscriptionPlans() // Refresh the list
          toast.success('Subscription plan deleted successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to delete subscription plan'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    }
  })
)
