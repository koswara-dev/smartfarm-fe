import React, { useState, useEffect } from 'react'
import {
  useSubscriptionStore,
  Subscription
} from '../../store/subscriptionStore'
import { Tenant } from '../../store/tenantStore'
import { SubscriptionPlan } from '../../store/subscriptionPlanStore'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  currentSubscription: Subscription | null
  tenants: Tenant[]
  subscriptionPlans: SubscriptionPlan[]
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentSubscription,
  tenants,
  subscriptionPlans
}) => {
  const { addSubscription, updateSubscription, loading } =
    useSubscriptionStore()

  const [formData, setFormData] = useState({
    tenantId: '',
    subscriptionPlanId: '',
    startDate: '',
    endDate: '',
    billingCycle: 'BULANAN',
    isActive: true,
    priceMonthly: 0,
    priceYearly: 0
  })

  useEffect(() => {
    if (currentSubscription) {
      setFormData({
        tenantId: currentSubscription.tenantId.toString(),
        subscriptionPlanId: currentSubscription.subscriptionPlanId.toString(),
        startDate: currentSubscription.startDate.split('T')[0], // Format to YYYY-MM-DD
        endDate: currentSubscription.endDate
          ? currentSubscription.endDate.split('T')[0]
          : '',
        billingCycle: currentSubscription.billingCycle,
        isActive: currentSubscription.isActive,
        priceMonthly: currentSubscription.priceMonthly,
        priceYearly: currentSubscription.priceYearly
      })
    } else {
      setFormData({
        tenantId: '',
        subscriptionPlanId: '',
        startDate: '',
        endDate: '',
        billingCycle: 'BULANAN',
        isActive: true,
        priceMonthly: 0,
        priceYearly: 0
      })
    }
  }, [currentSubscription])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (name === 'subscriptionPlanId') {
      const selectedPlan = subscriptionPlans.find(
        (plan) => plan.id === parseInt(value)
      )
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        priceMonthly: selectedPlan?.priceMonthly || 0,
        priceYearly: selectedPlan?.priceYearly || 0
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      tenantId: parseInt(formData.tenantId),
      subscriptionPlanId: parseInt(formData.subscriptionPlanId),
      endDate: formData.endDate === '' ? null : formData.endDate,
      billingCycle: formData.billingCycle as 'TAHUNAN' | 'BULANAN'
    }

    if (currentSubscription) {
      await updateSubscription(currentSubscription.id, payload)
    } else {
      await addSubscription(payload)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {currentSubscription ? 'Edit Subscription' : 'Add New Subscription'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="tenantId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tenant
            </label>
            <select
              id="tenantId"
              name="tenantId"
              value={formData.tenantId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="subscriptionPlanId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Subscription Plan
            </label>
            <select
              id="subscriptionPlanId"
              name="subscriptionPlanId"
              value={formData.subscriptionPlanId}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Plan</option>
              {subscriptionPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              End Date (Optional)
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="billingCycle"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Billing Cycle
            </label>
            <select
              id="billingCycle"
              name="billingCycle"
              value={formData.billingCycle}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="BULANAN">BULANAN</option>
              <option value="TAHUNAN">TAHUNAN</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Is Active
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {currentSubscription ? 'Update Subscription' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscriptionModal
