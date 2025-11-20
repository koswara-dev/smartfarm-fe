import React from 'react'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <LockClosedIcon className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="text-6xl font-bold text-gray-800 mt-4">403</h1>
        <p className="text-2xl text-gray-600 mt-4">Access Denied</p>
        <p className="text-lg text-gray-500 mt-2">
          You do not have permission to access this page. Please log in with an
          authorized account.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
        >
          Go to Login
        </a>
      </div>
    </div>
  )
}

export default AccessDeniedPage
