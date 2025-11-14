import React, { useEffect, useState } from 'react'
import AdminContent from '../components/admin/AdminContent'
import {
  useSubscriptionPlanStore,
  SubscriptionPlan
} from '../store/subscriptionPlanStore'
import 'react-toastify/dist/ReactToastify.css'
import SubscriptionPlanModal, {
  SaveableSubscriptionPlan
} from '../components/admin/SubscriptionPlanModal'
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal'
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const AdminSubscriptionPlanPage: React.FC = () => {
  const {
    subscriptionPlans,
    loading,
    error,
    fetchSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan
  } = useSubscriptionPlanStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [planToDeleteId, setPlanToDeleteId] = useState<number | null>(null)
  const [currentPlan, setCurrentPlan] =
    useState<SaveableSubscriptionPlan | null>(null)

  useEffect(() => {
    fetchSubscriptionPlans()
  }, [fetchSubscriptionPlans])

  const handleCreate = () => {
    setCurrentPlan(null)
    setIsModalOpen(true)
  }

  const handleEdit = (id: number) => {
    const planToEdit = subscriptionPlans.find((plan) => plan.id === id)
    if (planToEdit) {
      setCurrentPlan(planToEdit)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    setPlanToDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (planToDeleteId !== null) {
      await deleteSubscriptionPlan(planToDeleteId)
      setIsDeleteModalOpen(false)
      setPlanToDeleteId(null)
    }
  }

  const handleSave = async (planData: SaveableSubscriptionPlan) => {
    if (planData.id) {
      await updateSubscriptionPlan(planData.id, planData)
    } else {
      const { id, ...newPlanData } = planData // Exclude id for creation
      await createSubscriptionPlan(newPlanData)
    }
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <AdminContent title="Subscription Plans">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin mb-3" />
          <p className="text-gray-700">Loading subscription plans...</p>
        </div>
      </AdminContent>
    )
  }

  if (error) {
    return (
      <AdminContent title="Subscription Plans">
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </AdminContent>
    )
  }

  return (
    <>
      <AdminContent title="Subscription Plans">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={handleCreate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Subscription Plan
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
                    Price Monthly
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price Yearly
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max Users
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max Devices
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptionPlans.map((plan, index) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.priceMonthly.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      })}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.priceYearly.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      })}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.maxUsers}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.maxDevices}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {plan.description}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleEdit(plan.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Edit Subscription Plan"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out transform hover:scale-110"
                        title="Delete Subscription Plan"
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
        <SubscriptionPlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={currentPlan}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={
            subscriptionPlans.find((p) => p.id === planToDeleteId)?.name ||
            'subscription plan'
          }
        />
      )}
    </>
  )
}

export default AdminSubscriptionPlanPage
