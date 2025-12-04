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
import AdminSubscriptionPlanPage from './page/AdminSubscriptionPlanPage'
import AdminSubscriptionPage from './page/AdminSubscriptionPage' // Import the new page
import LoginPage from './page/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import AccessDeniedPage from './page/AccessDeniedPage'
import AdminTenantDetailPage from './page/AdminTenantDetailPage' // Import AdminTenantDetailPage
import AdminUserPage from './page/AdminUserPage' // Import AdminUserPage

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="tenants" element={<AdminTenantPage />} />
            <Route
              path="tenants/:id"
              element={<AdminTenantDetailPage />}
            />{' '}
            {/* New route for tenant detail */}
            <Route
              path="subscription-plans"
              element={<AdminSubscriptionPlanPage />}
            />
            <Route path="subscriptions" element={<AdminSubscriptionPage />} />{' '}
            {/* New route */}
            <Route path="users" element={<AdminUserPage />} />{' '}
            {/* New route for user management */}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
