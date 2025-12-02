import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define the type for tenant data that can be saved (excluding createdAt and updatedAt)
export type SaveableTenant = {
  id?: number // Explicitly optional for saving
  name: string
  email: string
  domain: string
  subdomain: string
  phoneNumber: string
  active: boolean
  logoUrl?: string // Add logoUrl to the saveable tenant type
}

// Define Zod schema for tenant validation
const tenantSchema = z.object({
  id: z.number().optional(), // ID is optional for creation
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  domain: z.string().min(1, 'Domain is required'),
  subdomain: z.string().min(1, 'Subdomain is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone Number is required')
    .regex(/^\d+$/, 'Phone Number must contain only digits'),
  active: z.boolean(), // Active is always a boolean
  logo: z.any().optional() // Allow any file type for logo, optional
})

type TenantFormData = z.infer<typeof tenantSchema>

interface TenantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (tenant: FormData) => void // Change onSave to accept FormData
  initialData: SaveableTenant | null
}

const TenantModal: React.FC<TenantModalProps> = ({
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
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      id: undefined,
      name: '',
      email: '',
      domain: '',
      subdomain: '',
      phoneNumber: '',
      active: false,
      logo: undefined
    }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        logo: undefined // Reset logo input when initialData changes
      })
    } else {
      reset({
        id: undefined, // Set id to undefined for new tenants
        name: '',
        email: '',
        domain: '',
        subdomain: '',
        phoneNumber: '',
        active: false,
        logo: undefined
      })
    }
  }, [initialData, reset])

  const onSubmit = (data: TenantFormData) => {
    const formData = new FormData()

    if (data.id) {
      formData.append('id', data.id.toString())
    }
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('domain', data.domain)
    formData.append('subdomain', data.subdomain)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('active', data.active.toString())

    if (data.logo && data.logo[0]) {
      formData.append('logo', data.logo[0])
    }

    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit Tenant' : 'Add Tenant'}
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
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="domain"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Domain
            </label>
            <input
              type="text"
              id="domain"
              {...register('domain')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.domain && (
              <p className="text-red-500 text-xs italic">
                {errors.domain.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="subdomain"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Subdomain
            </label>
            <input
              type="text"
              id="subdomain"
              {...register('subdomain')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.subdomain && (
              <p className="text-red-500 text-xs italic">
                {errors.subdomain.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              {...register('phoneNumber')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tenant Logo
            </label>
            <input
              type="file"
              id="logo"
              {...register('logo')}
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.logo && (
              <p className="text-red-500 text-xs italic">
                {errors.logo.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="active"
              {...register('active')}
              className="mr-2 leading-tight"
            />
            <label htmlFor="active" className="text-gray-700 text-sm font-bold">
              Active
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              {initialData ? 'Update Tenant' : 'Add Tenant'}
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

export default TenantModal
