import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import avatar from '../../../assets/avatar1.png'

const AdminSidebar: React.FC = () => {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    const baseClasses = 'flex items-center space-x-2 py-2 px-4 rounded-lg'
    const activeClasses = 'bg-blue-600 text-white'
    const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white'

    return `${baseClasses} ${
      location.pathname === path ? activeClasses : inactiveClasses
    }`
  }

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900 text-white text-2xl font-semibold uppercase">
        Admin Panel
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link to="/admin" className={getLinkClass('/admin')}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/admin/users" // Assuming a user management route exists or will be created
          className={getLinkClass('/admin/users')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.165-1.294-.47-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.165-1.294.47-1.857m0 0a5.002 5.002 0 019.06 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span>User Management</span>
        </Link>
        <Link to="/admin/tenants" className={getLinkClass('/admin/tenants')}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4m0-10h.01"
            ></path>
          </svg>
          <span>Tenants</span>
        </Link>
        <Link
          to="/admin/analytics" // Assuming an analytics route exists or will be created
          className={getLinkClass('/admin/analytics')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          <span>Analytics</span>
        </Link>
        <Link
          to="/admin/orders" // Assuming an orders route exists or will be created
          className={getLinkClass('/admin/orders')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 16h.01"
            ></path>
          </svg>
          <span>Orders</span>
        </Link>
        <Link
          to="/admin/settings" // Assuming a settings route exists or will be created
          className={getLinkClass('/admin/settings')}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>Settings</span>
        </Link>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full"
            src={avatar} // Placeholder image
            alt="User Avatar"
          />
          <div>
            <p className="text-sm font-medium text-white">Alex Turner</p>
            <p className="text-xs text-gray-400">alex.turner@modern.inc</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
