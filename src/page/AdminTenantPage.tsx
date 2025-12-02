import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminContent from '../components/admin/AdminContent'
import { useTenantStore, Tenant } from '../store/tenantStore'
import 'react-toastify/dist/ReactToastify.css'
import TenantModal, { SaveableTenant } from '../components/admin/TenantModal'
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal'
import {
  PlusCircleIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon // New icon for actions
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
  const [currentTenant, setCurrentTenant] = useState<SaveableTenant | null>(
    null
  )
  const [filterIsActive, setFilterIsActive] = useState<boolean | undefined>(
    undefined
  )
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null) // State to manage open dropdown

  useEffect(() => {
    fetchTenants(filterIsActive)
  }, [fetchTenants, filterIsActive])

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

  const handleSave = async (tenantFormData: FormData) => {
    // Extract ID if it exists in the FormData
    const id = tenantFormData.get('id')
    if (id) {
      await updateTenant(Number(id), tenantFormData)
    } else {
      await createTenant(tenantFormData)
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
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="statusFilter" className="text-gray-700">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={
                filterIsActive === undefined
                  ? 'all'
                  : filterIsActive
                  ? 'active'
                  : 'inactive'
              }
              onChange={(e) => {
                if (e.target.value === 'all') {
                  setFilterIsActive(undefined)
                } else if (e.target.value === 'active') {
                  setFilterIsActive(true)
                } else {
                  setFilterIsActive(false)
                }
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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
                    No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Logo
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
                {tenants.map((tenant, index) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {tenant.email}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap text-xs">
                        {tenant.domain} / {tenant.subdomain}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.phoneNumber}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {tenant.logoUrl ? (
                        <img
                          src={tenant.logoUrl}
                          alt={`${tenant.name} logo`}
                          className="h-10 w-10 object-contain"
                        />
                      ) : (
                        'N/A'
                      )}
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
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === tenant.id ? null : tenant.id
                          )
                        }
                        className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Actions"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                      {openDropdownId === tenant.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <Link
                            to={`/admin/tenants/${tenant.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            title="View Details"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => {
                              handleEdit(tenant.id)
                              setOpenDropdownId(null)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            title="Edit Tenant"
                          >
                            Edit Tenant
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(tenant.id)
                              setOpenDropdownId(null)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            title="Delete Tenant"
                          >
                            Delete Tenant
                          </button>
                        </div>
                      )}
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
          initialData={
            currentTenant
              ? {
                  ...currentTenant,
                  logoUrl: tenants.find((t) => t.id === currentTenant.id)
                    ?.logoUrl // Ensure logoUrl is passed if available
                }
              : null
          }
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
