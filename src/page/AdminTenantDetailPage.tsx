import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminContent from '../components/admin/AdminContent'
import { useTenantStore, Tenant } from '../store/tenantStore'
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const AdminTenantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const tenantId = id ? parseInt(id, 10) : null
  const { tenants, loading, error, fetchTenants } = useTenantStore()
  const [tenant, setTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    if (tenantId !== null) {
      // Check if tenants are already loaded in the store
      const foundTenant = tenants.find((t) => t.id === tenantId)
      if (foundTenant) {
        setTenant(foundTenant)
      } else {
        // If not found, fetch all tenants and then find the specific one
        // This might be inefficient for a large number of tenants; a dedicated
        // fetchTenantById function would be better in a real application.
        fetchTenants().then(() => {
          const refoundTenant = useTenantStore
            .getState()
            .tenants.find((t) => t.id === tenantId)
          setTenant(refoundTenant || null)
        })
      }
    }
  }, [tenantId, tenants, fetchTenants])

  if (loading) {
    return (
      <AdminContent title="Tenant Details">
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin mb-3" />
          <p className="text-gray-700">Loading tenant details...</p>
        </div>
      </AdminContent>
    )
  }

  if (error) {
    return (
      <AdminContent title="Tenant Details">
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </AdminContent>
    )
  }

  if (!tenant) {
    return (
      <AdminContent title="Tenant Details">
        <div className="text-center py-10 text-gray-700">Tenant not found.</div>
      </AdminContent>
    )
  }

  // Mockup data for logo and map if not present
  const displayLogoUrl =
    tenant.logoUrl ||
    'https://img.pikbest.com/png-images/20241029/an-agriculture-logo-sun-and-crops-icon_11024322.png!w700wp'
  const displayLatitude = tenant.latitude || -6.2088 // Jakarta latitude
  const displayLongitude = tenant.longitude || 106.8456 // Jakarta longitude

  return (
    <AdminContent title={`Tenant: ${tenant.name}`}>
      <div className="mb-6">
        <Link
          to="/admin/tenants"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Tenants List
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant Logo */}
          <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
            <img
              src={displayLogoUrl}
              alt={`${tenant.name} Logo`}
              className="w-32 h-32 object-contain mb-4 rounded-full shadow-md"
            />
            <p className="text-gray-600 text-sm">Tenant Logo</p>
          </div>

          {/* Tenant Details */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Details
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {tenant.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {tenant.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Domain:</span> {tenant.domain}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Subdomain:</span>{' '}
                {tenant.subdomain}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {tenant.phoneNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold leading-tight rounded-full ${
                    tenant.active
                      ? 'bg-green-200 text-green-900'
                      : 'bg-red-200 text-red-900'
                  }`}
                >
                  {tenant.active ? 'Active' : 'Inactive'}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Created At:</span>{' '}
                {new Date(tenant.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Updated At:</span>{' '}
                {new Date(tenant.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Location</h3>
        <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden border border-gray-200">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${displayLatitude},${displayLongitude}&hl=es&z=14&output=embed`}
            title="Tenant Location"
          ></iframe>
        </div>
        <div className="text-sm text-gray-600 mt-3 text-center">
          Latitude: {displayLatitude}, Longitude: {displayLongitude}
        </div>
      </div>
    </AdminContent>
  )
}

export default AdminTenantDetailPage
