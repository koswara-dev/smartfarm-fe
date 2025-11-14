import React from 'react'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import { ToastContainer } from 'react-toastify'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminLayout
