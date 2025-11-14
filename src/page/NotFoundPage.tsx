import React, { useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import data from '../../assets/data.json'

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    const originalFavicon = document.getElementById(
      'favicon'
    ) as HTMLLinkElement | null
    const originalFaviconHref = originalFavicon ? originalFavicon.href : ''

    document.title = data.titleApp + ' - 404 Not Found'
    if (originalFavicon) {
      originalFavicon.href = data.favicon
    }

    return () => {
      document.title = originalTitle
      if (originalFavicon) {
        originalFavicon.href = originalFaviconHref
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-yellow-500" />
        <h1 className="text-6xl font-bold text-gray-800 mt-4">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist or an other error occurred.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage
