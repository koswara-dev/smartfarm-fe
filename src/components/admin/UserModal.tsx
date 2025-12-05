import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { encryptAES, decryptAES } from '../../utils/crypto'
import { Tenant } from '../../store/tenantStore'

// Define the type for user data that can be saved (excluding createdAt, updatedAt, and tenantName)
export type SaveableUser = {
  id?: number // Explicitly optional for saving
  fullName: string
  email: string
  isActive: boolean
  tenantId: number
  password?: string // Add password field here
}

// Define Zod schema for user validation
const userSchema = z.object({
  id: z.number().optional(), // ID is optional for creation
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.email('Invalid email address').min(1, 'Email is required'),
  isActive: z.boolean(), // isActive is always a boolean
  tenantId: z.number().min(1, 'Tenant ID is required'),
  password: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length >= 6, {
      message: 'Password must be at least 6 characters long',
      path: ['password']
    }) // Optional for edit, min length for create
})

type UserFormData = z.infer<typeof userSchema>

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (user: UserFormData) => void // Change onSave to accept UserFormData
  initialData: SaveableUser | null
  tenants: Tenant[] // Add tenants prop
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  tenants // Destructure tenants prop
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: undefined,
      fullName: '',
      email: '',
      isActive: false,
      tenantId: 0, // Default to 0 or a sensible default
      password: '' // Add default for password
    }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        fullName: decryptAES(initialData.fullName),
        email: decryptAES(initialData.email)
        // password should not be set here for security reasons
      })
    } else {
      reset({
        id: undefined, // Set id to undefined for new users
        fullName: '',
        email: '',
        isActive: false,
        tenantId: 0,
        password: ''
      })
    }
  }, [initialData, reset])

  const onSubmit = (data: UserFormData) => {
    const userToSave: UserFormData = {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      isActive: data.isActive,
      tenantId: data.tenantId
    }

    if (data.password) {
      userToSave.password = data.password
    }

    onSave(userToSave)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit User' : 'Add User'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs italic">
                {errors.fullName.message}
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
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="tenantId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tenant
            </label>
            <select
              id="tenantId"
              {...register('tenantId', { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="0">Select a Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            {errors.tenantId && (
              <p className="text-red-500 text-xs italic">
                {errors.tenantId.message}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="mr-2 leading-tight"
            />
            <label
              htmlFor="isActive"
              className="text-gray-700 text-sm font-bold"
            >
              Active
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              {initialData ? 'Update User' : 'Add User'}
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

export default UserModal
