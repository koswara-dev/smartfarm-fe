import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import RegisterPage from './page/RegisterPage'
import NotFoundPage from './page/NotFoundPage'
import AdminDashboardPage from './page/AdminDashboardPage'
import AdminTenantPage from './page/AdminTenantPage'
import AdminLayout from './components/admin/AdminLayout'
import { Outlet } from 'react-router-dom'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="tenants" element={<AdminTenantPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
