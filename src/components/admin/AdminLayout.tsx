import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import the CSS
import { Outlet } from 'react-router-dom'

interface AdminLayoutProps {}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminLayout
