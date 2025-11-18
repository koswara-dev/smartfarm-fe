import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { toast } from 'react-toastify' // Import toast
import { api } from '../config/api'

export interface Subscription {
  id: number
  startDate: string
  endDate: string | null
  isActive: boolean
  billingCycle: 'TAHUNAN' | 'BULANAN'
  tenantId: number
  tenantName: string
  subscriptionPlanId: number
  subscriptionPlanName: string
  priceMonthly: number
  priceYearly: number
  createdAt: string
  updatedAt: string | null
}

export interface Page {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

interface SubscriptionStore {
  subscriptions: Subscription[]
  page: Page | null
  loading: boolean
  error: string | null
  fetchSubscriptions: (
    status?: string,
    billingCycle?: string,
    subscriptionPlanId?: string | null,
    page?: number,
    size?: number
  ) => Promise<void>
  addSubscription: (
    subscription: Omit<
      Subscription,
      'id' | 'createdAt' | 'updatedAt' | 'tenantName' | 'subscriptionPlanName'
    >
  ) => Promise<void>
  updateSubscription: (
    id: number,
    subscription: Partial<
      Omit<
        Subscription,
        'id' | 'createdAt' | 'updatedAt' | 'tenantName' | 'subscriptionPlanName'
      >
    >
  ) => Promise<void>
  deleteSubscription: (id: number) => Promise<void>
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  devtools((set, get) => ({
    // Add get to access other store methods
    subscriptions: [],
    page: null,
    loading: false,
    error: null,

    fetchSubscriptions: async (
      status,
      billingCycle,
      subscriptionPlanId,
      page = 0,
      size = 10
    ) => {
      set({ loading: true, error: null })
      try {
        const params: {
          status?: string
          billingCycle?: string
          subscriptionPlanId?: string
          page?: number
          size?: number
        } = { page, size }
        if (status && status !== 'All') {
          params.status = status === 'Active' ? 'true' : 'false'
        }
        if (billingCycle && billingCycle !== 'All') {
          params.billingCycle = billingCycle
        }
        if (subscriptionPlanId && subscriptionPlanId !== 'All') {
          params.subscriptionPlanId = subscriptionPlanId
        }

        const response = await api.get('/api/v1/subscriptions', { params })
        if (response.data.success) {
          set({
            subscriptions: response.data.data.content,
            page: response.data.data.page,
            loading: false
          })
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch subscriptions'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    addSubscription: async (subscription) => {
      set({ loading: true, error: null })
      try {
        const response = await api.post('/api/v1/subscriptions', subscription)
        if (response.data.success) {
          const { number, size } = get().page || { number: 0, size: 10 }
          get().fetchSubscriptions(
            undefined,
            undefined,
            undefined,
            number,
            size
          ) // Refresh the list with current pagination
          toast.success('Subscription created successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to create subscription'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    updateSubscription: async (id, subscription) => {
      set({ loading: true, error: null })
      try {
        const response = await api.put(
          `/api/v1/subscriptions/${id}`,
          subscription
        )
        if (response.data.success) {
          const { number, size } = get().page || { number: 0, size: 10 }
          get().fetchSubscriptions(
            undefined,
            undefined,
            undefined,
            number,
            size
          ) // Refresh the list with current pagination
          toast.success('Subscription updated successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to update subscription'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    },

    deleteSubscription: async (id) => {
      set({ loading: true, error: null })
      try {
        const response = await api.delete(`/api/v1/subscriptions/${id}`)
        if (response.data.success) {
          const { number, size } = get().page || { number: 0, size: 10 }
          get().fetchSubscriptions(
            undefined,
            undefined,
            undefined,
            number,
            size
          ) // Refresh the list with current pagination
          toast.success('Subscription deleted successfully!')
        } else {
          set({ error: response.data.message, loading: false })
          toast.error(response.data.message)
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to delete subscription'
        set({ error: errorMessage, loading: false })
        toast.error(errorMessage)
      }
    }
  }))
)
