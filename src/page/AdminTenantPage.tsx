import React, { useEffect, useState } from 'react'
import AdminContent from '../components/admin/AdminContent'
import { useTenantStore, Tenant } from '../store/tenantStore'
import 'react-toastify/dist/ReactToastify.css'
import TenantModal from '../components/admin/TenantModal'
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal'
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const AdminTenantPage: React.FC = () => {
  const {
    tenants,
    loading,
    error,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant
  } = useTenantStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [tenantToDeleteId, setTenantToDeleteId] = useState<number | null>(null)
  const [currentTenant, setCurrentTenant] = useState<Omit<
    Tenant,
    'createdAt' | 'updatedAt'
  > | null>(null)

  useEffect(() => {
    fetchTenants()
  }, [fetchTenants])

  const handleCreate = () => {
    setCurrentTenant(null)
    setIsModalOpen(true)
  }

  const handleEdit = (id: number) => {
    const tenantToEdit = tenants.find((tenant) => tenant.id === id)
    if (tenantToEdit) {
      setCurrentTenant(tenantToEdit)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    setTenantToDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (tenantToDeleteId !== null) {
      await deleteTenant(tenantToDeleteId)
      setIsDeleteModalOpen(false)
      setTenantToDeleteId(null)
    }
  }

  const handleSave = async (
    tenantData: Omit<Tenant, 'createdAt' | 'updatedAt'>
  ) => {
    if (tenantData.id) {
      await updateTenant(tenantData.id, tenantData)
    } else {
      const { id, ...newTenantData } = tenantData // Exclude id for creation
      await createTenant(newTenantData)
    }
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <AdminContent title="Tenants">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin mb-3" />
          <p className="text-gray-700">Loading tenants...</p>
        </div>
      </AdminContent>
    )
  }

  if (error) {
    return (
      <AdminContent title="Tenants">
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </AdminContent>
    )
  }

  return (
    <>
      <AdminContent title="Tenants">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Tenant
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subdomain
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.domain}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.subdomain}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.phoneNumber}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          tenant.active ? 'text-green-900' : 'text-red-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            tenant.active ? 'bg-green-200' : 'bg-red-200'
                          }`}
                        ></span>
                        <span className="relative">
                          {tenant.active ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleEdit(tenant.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Edit Tenant"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tenant.id)}
                        className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Delete Tenant"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminContent>
      {isModalOpen && (
        <TenantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={currentTenant}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={
            tenants.find((t) => t.id === tenantToDeleteId)?.name || 'tenant'
          }
        />
      )}
    </>
  )
}

export default AdminTenantPage
