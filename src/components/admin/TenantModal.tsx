import React, { useState, useEffect } from 'react'
import { Tenant } from '../../store/tenantStore'

interface TenantModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (tenant: Omit<Tenant, 'createdAt' | 'updatedAt'>) => void
  initialData: Omit<Tenant, 'createdAt' | 'updatedAt'> | null
}

const TenantModal: React.FC<TenantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [tenantData, setTenantData] = useState<
    Omit<Tenant, 'createdAt' | 'updatedAt'>
  >({
    id: 0,
    name: '',
    email: '',
    domain: '',
    subdomain: '',
    phoneNumber: '',
    active: false
  })

  useEffect(() => {
    if (initialData) {
      setTenantData(initialData)
    } else {
      setTenantData({
        id: 0,
        name: '',
        email: '',
        domain: '',
        subdomain: '',
        phoneNumber: '',
        active: false
      })
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const target = e.target as HTMLInputElement
    setTenantData((prevData) => ({
      ...prevData,
      [name]: target.type === 'checkbox' ? target.checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(tenantData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? 'Edit Tenant' : 'Add Tenant'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={tenantData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
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
              name="email"
              id="email"
              value={tenantData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
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
              name="domain"
              id="domain"
              value={tenantData.domain}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
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
              name="subdomain"
              id="subdomain"
              value={tenantData.subdomain}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
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
              name="phoneNumber"
              id="phoneNumber"
              value={tenantData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="active"
              id="active"
              checked={tenantData.active}
              onChange={handleChange}
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
