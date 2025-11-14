import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SubscriptionPlan } from '../../store/subscriptionPlanStore'

// Define the type for subscription plan data that can be saved
export type SaveableSubscriptionPlan = {
  id?: number // Explicitly optional for saving
  name: string
  priceMonthly: number
  priceYearly: number
  maxUsers: number
  maxDevices: number
  description: string
}

// Define Zod schema for subscription plan validation
const subscriptionPlanSchema = z.object({
  id: z.number().optional(), // ID is optional for creation
  name: z.string().min(1, 'Name is required'),
  priceMonthly: z.number().min(0, 'Price Monthly must be a positive number'),
  priceYearly: z.number().min(0, 'Price Yearly must be a positive number'),
  maxUsers: z.number().min(1, 'Max Users must be at least 1'),
  maxDevices: z.number().min(1, 'Max Devices must be at least 1'),
  description: z.string().min(1, 'Description is required')
})

type SubscriptionPlanFormData = z.infer<typeof subscriptionPlanSchema>

interface SubscriptionPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (plan: SaveableSubscriptionPlan) => void
  initialData: SaveableSubscriptionPlan | null
}

const SubscriptionPlanModal: React.FC<SubscriptionPlanModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SubscriptionPlanFormData>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      id: undefined,
      name: '',
      priceMonthly: 0,
      priceYearly: 0,
      maxUsers: 1,
      maxDevices: 1,
      description: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({
        id: undefined,
        name: '',
        priceMonthly: 0,
        priceYearly: 0,
        maxUsers: 1,
        maxDevices: 1,
        description: ''
      })
    }
  }, [initialData, reset])

  const onSubmit = (data: SubscriptionPlanFormData) => {
    onSave(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="priceMonthly"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price Monthly
            </label>
            <input
              type="number"
              id="priceMonthly"
              {...register('priceMonthly', { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.priceMonthly && (
              <p className="text-red-500 text-xs italic">
                {errors.priceMonthly.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="priceYearly"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price Yearly
            </label>
            <input
              type="number"
              id="priceYearly"
              {...register('priceYearly', { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.priceYearly && (
              <p className="text-red-500 text-xs italic">
                {errors.priceYearly.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxUsers"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Max Users
            </label>
            <input
              type="number"
              id="maxUsers"
              {...register('maxUsers', { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.maxUsers && (
              <p className="text-red-500 text-xs italic">
                {errors.maxUsers.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxDevices"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Max Devices
            </label>
            <input
              type="number"
              id="maxDevices"
              {...register('maxDevices', { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.maxDevices && (
              <p className="text-red-500 text-xs italic">
                {errors.maxDevices.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              {initialData
                ? 'Update Subscription Plan'
                : 'Add Subscription Plan'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscriptionPlanModal
