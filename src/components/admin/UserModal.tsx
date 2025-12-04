import React, { useState, useEffect } from 'react'
import { SaveableUser } from '../../store/userStore'
import { useTenantStore } from '../../store/tenantStore'
import { encryptAES, decryptAES } from '../../utils/crypto'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (formData: FormData) => void
  initialData: SaveableUser | null
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [tenantId, setTenantId] = useState<number | undefined>(undefined)
  const { tenants, fetchTenants } = useTenantStore()

  useEffect(() => {
    fetchTenants(true) // Fetch only active tenants
  }, [fetchTenants])

  useEffect(() => {
    if (initialData) {
      setFullName(decryptAES(initialData.fullName))
      setEmail(decryptAES(initialData.email))
      setIsActive(initialData.isActive)
      setTenantId(initialData.tenantId)
      setPassword('') // Password is not pre-filled for security reasons
    } else {
      setFullName('')
      setEmail('')
      setPassword('')
      setIsActive(true)
      setTenantId(undefined)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    if (initialData?.id) {
      formData.append('id', initialData.id.toString())
    }
    formData.append('fullName', encryptAES(fullName))
    formData.append('email', encryptAES(email))
    if (password) {
      formData.append('password', password)
    }
    formData.append('isActive', isActive.toString())
    if (tenantId) {
      formData.append('tenantId', tenantId.toString())
    }
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit User' : 'Add User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {
                ...(!initialData && { required: true }) // Only require password for new users
              }
            />
            {!initialData && (
              <p className="text-xs text-gray-500 mt-1">
                Password is required for new users.
              </p>
            )}
            {initialData && (
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to keep current password.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="tenantId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tenant:
            </label>
            <select
              id="tenantId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={tenantId || ''}
              onChange={(e) => setTenantId(Number(e.target.value))}
              required
            >
              <option value="">Select a Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              className="mr-2 leading-tight"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label
              htmlFor="isActive"
              className="text-gray-700 text-sm font-bold"
            >
              Active
            </label>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal
