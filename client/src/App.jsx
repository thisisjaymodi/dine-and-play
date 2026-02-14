import { Routes, Route, Navigate } from "react-router";

// Layouts
import MainLayout from "./layouts/MainLayout";
import TenantLayout from './layouts/TenantLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Public Pages
import Home from "./pages/public/Home";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import Cookies from "./pages/public/Cookies";
import Unsubscribe from "./pages/public/Unsubscribe";

// Customer Pages
import GameLobby from './pages/customer/GameLobby';
import GameSession from './pages/customer/GameSession';
import ClaimPrize from './pages/customer/ClaimPrize';
import ViewCoupon from './pages/customer/ViewCoupon';

// Staff/Admin Pages
import Login from "./pages/staff/Login";
import Scanner from './pages/staff/Scanner';
import RecentScans from './pages/staff/RecentScans';
import Analytics from './pages/staff/Analytics';
import CustomerDetails from './pages/staff/CustomerDetails';
import StaffManagement from './pages/staff/StaffManagement';
import Profile from './pages/staff/Profile';
import UpdatePassword from './pages/staff/UpdatePassword';
import ForgotPassword from './pages/staff/ForgotPassword';
import ResetPassword from './pages/staff/ResetPassword';

// System Admin Pages & Layout
import AdminLayout from './layouts/AdminLayout';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminRequests from './pages/admin/AdminRequests';
import RestaurantSignup from './pages/public/RestaurantSignup';

// Error Page
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        {/* 1. PUBLIC & LEGAL ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/unsubscribe/:id" element={<Unsubscribe />} />
        </Route>

        {/* 2. CUSTOMER TENANT ROUTES (/r/:slug) */}
        {/* The TenantLayout handles fetching restaurant branding via the :slug */}
        <Route path="/r/:slug" element={<TenantLayout />}>
          <Route index element={<Navigate to="all-games" replace />} /> {/* Default nev  on /r/:slug */}
          <Route path="all-games" element={<GameLobby />} />
          <Route path="play/:gameName" element={<GameSession />} />
          <Route path="claim" element={<ClaimPrize />} />
          <Route path="coupon/:id" element={<ViewCoupon />} />
        </Route>

        {/* 3. STAFF & AUTH ROUTES */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<RestaurantSignup />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        

        {/* Staff/Admin Layout for protected routes */}
        <Route element={<DashboardLayout />}>

          {/* Waiter and Manager */}
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/recent-scans" element={<RecentScans />} />

          {/* Manager Only */}
          <Route path="/dashboard" element={<Analytics />} />
          <Route path="/dashboard/customers" element={<CustomerDetails />} />
          <Route path="/dashboard/staff" element={<StaffManagement />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        {/* 4. SYSTEM ADMIN protected ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />  {/* Default nev  on /admin */}
          <Route path="dashboard" element={<AdminRestaurants />} /> 
          <Route path="requests" element={<AdminRequests />} />
        </Route>

        {/* 4. 404 FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
