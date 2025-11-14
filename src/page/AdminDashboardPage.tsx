import React from 'react'
import AdminLayout from '../components/admin/AdminLayout'
import AdminContent from '../components/admin/AdminContent'

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminContent title="Dashboard">
      {/* Placeholder content for the dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-900">$45,678</p>
          <p className="text-green-500">+5.4%</p>
        </div>

        {/* New Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">New Users</h3>
          <p className="text-3xl font-bold text-gray-900">1,204</p>
          <p className="text-green-500">+12.1%</p>
        </div>

        {/* Active Sessions Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Active Sessions</h3>
          <p className="text-3xl font-bold text-gray-900">3,456</p>
          <p className="text-red-500">-2.3%</p>
        </div>

        {/* Server Uptime Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Server Uptime</h3>
          <p className="text-3xl font-bold text-gray-900">99.98%</p>
          <p className="text-green-500">+0.01%</p>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-4">
          Revenue (Last 30 Days)
        </h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          [Revenue Chart Placeholder]
        </div>
      </div>

      {/* User Sign-ups by Week Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-600 mb-4">
          User Sign-ups by Week
        </h3>
        <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          [User Sign-ups Chart Placeholder]
        </div>
      </div>
    </AdminContent>
  )
}

export default AdminDashboardPage
