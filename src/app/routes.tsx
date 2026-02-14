import { createBrowserRouter, Navigate } from 'react-router';
import React from 'react';
import LoginPage from './pages/LoginPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import HomePage from './pages/HomePage';
import RatesPage from './pages/RatesPage';
import SchedulePickupPage from './pages/SchedulePickupPage';
import PickupSuccessPage from './pages/PickupSuccessPage';
import TrackingPage from './pages/TrackingPage';
import HistoryPage from './pages/HistoryPage';
import FeedbackPage from './pages/FeedbackPage';
import VendorLoginPage from './pages/vendor/VendorLoginPage';
import VendorDashboardPage from './pages/vendor/VendorDashboardPage';
import PickupRequestPage from './pages/vendor/PickupRequestPage';
import PickupConfirmationPage from './pages/vendor/PickupConfirmationPage';
import InvoicePage from './pages/vendor/InvoicePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import VendorManagementPage from './pages/admin/VendorManagementPage';
import DataManagementPage from './pages/admin/DataManagementPage';
import ComplaintManagementPage from './pages/admin/ComplaintManagementPage';
import ReportsPage from './pages/admin/ReportsPage';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/citizen/login" replace />;
  }
  
  return children;
};

const VendorProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isVendorAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/vendor/login" replace />;
  }
  
  return children;
};

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RoleSelectionPage,
  },
  {
    path: '/citizen/login',
    Component: LoginPage,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/rates',
    element: (
      <ProtectedRoute>
        <RatesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/schedule',
    element: (
      <ProtectedRoute>
        <SchedulePickupPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pickup-success',
    element: (
      <ProtectedRoute>
        <PickupSuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/track',
    element: (
      <ProtectedRoute>
        <TrackingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/feedback',
    element: (
      <ProtectedRoute>
        <FeedbackPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/vendor/login',
    Component: VendorLoginPage,
  },
  {
    path: '/vendor/dashboard',
    element: (
      <VendorProtectedRoute>
        <VendorDashboardPage />
      </VendorProtectedRoute>
    ),
  },
  {
    path: '/vendor/request/:id',
    element: (
      <VendorProtectedRoute>
        <PickupRequestPage />
      </VendorProtectedRoute>
    ),
  },
  {
    path: '/vendor/pickup/:id',
    element: (
      <VendorProtectedRoute>
        <PickupConfirmationPage />
      </VendorProtectedRoute>
    ),
  },
  {
    path: '/vendor/invoice/:id',
    element: (
      <VendorProtectedRoute>
        <InvoicePage />
      </VendorProtectedRoute>
    ),
  },
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminProtectedRoute>
        <AdminDashboardPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/vendors',
    element: (
      <AdminProtectedRoute>
        <VendorManagementPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/data',
    element: (
      <AdminProtectedRoute>
        <DataManagementPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/complaints',
    element: (
      <AdminProtectedRoute>
        <ComplaintManagementPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <AdminProtectedRoute>
        <ReportsPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
