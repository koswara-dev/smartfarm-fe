import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminContent from '../components/admin/AdminContent'
import { useUserStore, User } from '../store/userStore'
import 'react-toastify/dist/ReactToastify.css'
import UserModal, { SaveableUser } from '../components/admin/UserModal'
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal'
import {
  PlusCircleIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon // New icon for actions
} from '@heroicons/react/24/outline'
import { decryptAES } from '../utils/crypto'

const AdminUserPage: React.FC = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null)
  const [currentUser, setCurrentUser] = useState<SaveableUser | null>(null)
  const [filterIsActive, setFilterIsActive] = useState<boolean | undefined>(
    undefined
  )
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null) // State to manage open dropdown

  useEffect(() => {
    fetchUsers(filterIsActive)
  }, [fetchUsers, filterIsActive])

  const handleCreate = () => {
    setCurrentUser(null)
    setIsModalOpen(true)
  }

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id)
    if (userToEdit) {
      setCurrentUser(userToEdit)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    setUserToDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (userToDeleteId !== null) {
      await deleteUser(userToDeleteId)
      setIsDeleteModalOpen(false)
      setUserToDeleteId(null)
    }
  }

  const handleSave = async (userFormData: FormData) => {
    // Extract ID if it exists in the FormData
    const id = userFormData.get('id')
    if (id) {
      await updateUser(Number(id), userFormData)
    } else {
      await createUser(userFormData)
    }
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <AdminContent title="Users">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin mb-3" />
          <p className="text-gray-700">Loading users...</p>
        </div>
      </AdminContent>
    )
  }

  if (error) {
    return (
      <AdminContent title="Users">
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </AdminContent>
    )
  }

  return (
    <>
      <AdminContent title="Users">
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
            Add User
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
                    Full Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tenant Name
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
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {decryptAES(user.fullName)}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {decryptAES(user.email)}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.tenantName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          user.isActive ? 'text-green-900' : 'text-red-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            user.isActive ? 'bg-green-200' : 'bg-red-200'
                          }`}
                        ></span>
                        <span className="relative">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === user.id ? null : user.id
                          )
                        }
                        className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Actions"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                      {openDropdownId === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          {/* No detail page for users, so removing this link */}
                          <button
                            onClick={() => {
                              handleEdit(user.id)
                              setOpenDropdownId(null)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            title="Edit User"
                          >
                            Edit User
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(user.id)
                              setOpenDropdownId(null)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                            title="Delete User"
                          >
                            Delete User
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
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={currentUser}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={
            users.find((u) => u.id === userToDeleteId)?.fullName || 'user'
          }
        />
      )}
    </>
  )
}

export default AdminUserPage
