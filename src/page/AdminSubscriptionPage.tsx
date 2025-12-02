import React, { useEffect, useState } from 'react'
import {
  useSubscriptionStore,
  Subscription,
  Page
} from '../store/subscriptionStore'
import { useTenantStore, Tenant } from '../store/tenantStore'
import {
  useSubscriptionPlanStore,
  SubscriptionPlan
} from '../store/subscriptionPlanStore'
import SubscriptionModal from '../components/admin/SubscriptionModal'
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal'
import AdminContent from '../components/admin/AdminContent'
import {
  ArrowPathIcon,
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'

const AdminSubscriptionPage: React.FC = () => {
  const {
    subscriptions,
    page,
    loading,
    error,
    fetchSubscriptions,
    deleteSubscription
  } = useSubscriptionStore()
  const { tenants, fetchTenants } = useTenantStore()
  const { subscriptionPlans, fetchSubscriptionPlans } =
    useSubscriptionPlanStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null)
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<
    number | null
  >(null)
  const [filterStatus, setFilterStatus] = useState<string>('All') // 'All', 'Active', 'Inactive'
  const [filterBillingCycle, setFilterBillingCycle] = useState<string>('All') // 'All', 'Monthly', 'Annually', etc.
  const [filterSubscriptionPlanId, setFilterSubscriptionPlanId] = useState<
    string | null
  >(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    fetchSubscriptions(
      filterStatus,
      filterBillingCycle,
      filterSubscriptionPlanId,
      currentPage,
      pageSize
    )
    fetchTenants()
    fetchSubscriptionPlans()
  }, [
    fetchSubscriptions,
    fetchTenants,
    fetchSubscriptionPlans,
    filterStatus,
    filterBillingCycle,
    filterSubscriptionPlanId,
    currentPage,
    pageSize
  ])
  const handleAddClick = () => {
    setSelectedSubscription(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setSubscriptionToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (subscriptionToDelete !== null) {
      await deleteSubscription(subscriptionToDelete)
      setIsDeleteModalOpen(false)
      setSubscriptionToDelete(null)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSubscription(null)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSubscriptionToDelete(null)
  }

  const { exportSubscriptionsToExcel } = useSubscriptionStore()

  const handleExportExcel = async () => {
    await exportSubscriptionsToExcel(
      filterStatus,
      filterBillingCycle,
      filterSubscriptionPlanId
    )
  }

  if (loading) {
    return (
      <AdminContent title="Subscriptions">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin mb-3" />
          <p className="text-gray-700">Loading subscriptions...</p>
        </div>
      </AdminContent>
    )
  }

  return (
    <AdminContent title="Subscriptions">
      <div className="flex justify-between items-center mb-6">
        {/* Filters on the left */}
        <div className="flex space-x-4">
          {/* Status Filter */}
          <div className="flex flex-col">
            <label
              htmlFor="statusFilter"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Billing Cycle Filter */}
          <div className="flex flex-col">
            <label
              htmlFor="billingCycleFilter"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Billing Cycle:
            </label>
            <select
              id="billingCycleFilter"
              value={filterBillingCycle}
              onChange={(e) => setFilterBillingCycle(e.target.value)}
              className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="All">All</option>
              <option value="TAHUNAN">TAHUNAN</option>
              <option value="BULANAN">BULANAN</option>
              {/* Add other billing cycles as needed */}
            </select>
          </div>

          {/* Subscription Plan Filter */}
          <div className="flex flex-col">
            <label
              htmlFor="subscriptionPlanFilter"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Plan:
            </label>
            <select
              id="subscriptionPlanFilter"
              value={filterSubscriptionPlanId || 'All'}
              onChange={(e) =>
                setFilterSubscriptionPlanId(
                  e.target.value === 'All' ? null : e.target.value
                )
              }
              className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="All">All</option>
              {subscriptionPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          {/* Export to Excel button */}
          <button
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export to Excel
          </button>
          {/* Add New Subscription button on the right */}
          <button
            onClick={handleAddClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add New Subscription
          </button>
        </div>
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
                  Tenant
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Billing Cycle
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
              {subscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500"
                  >
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.tenantName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.subscriptionPlanName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.endDate
                        ? new Date(subscription.endDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {subscription.billingCycle}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          subscription.isActive
                            ? 'text-green-900'
                            : 'text-red-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 opacity-50 rounded-full ${
                            subscription.isActive
                              ? 'bg-green-200'
                              : 'bg-red-200'
                          }`}
                        ></span>
                        <span className="relative">
                          {subscription.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleEditClick(subscription)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Edit Subscription"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(subscription.id)}
                        className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Delete Subscription"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {page && page.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage + 1} of {page.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(page.totalPages - 1, prev + 1))
            }
            disabled={currentPage === page.totalPages - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          currentSubscription={selectedSubscription}
          tenants={tenants}
          subscriptionPlans={subscriptionPlans}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          itemName="this subscription"
        />
      )}
    </AdminContent>
  )
}

export default AdminSubscriptionPage
