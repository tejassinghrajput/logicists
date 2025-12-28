import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './modules/layout/Layout';
import { Dashboard } from './modules/dashboard/Dashboard';
import { Shipments } from './modules/shipments/Shipments';
import { Tracking } from './modules/tracking/Tracking';
import { Wallet } from './modules/wallet/Wallet';
import { Invoices } from './modules/invoices/Invoices';
import { Settings } from './modules/settings/Settings';
import { ActiveView } from './modules/channels/views/ActiveView';
import { AllView } from './modules/channels/views/AllView';
import { OrdersView } from './modules/channels/views/OrdersView';
import { ActivityView } from './modules/notifications/views/ActivityView';
import { Auth } from './modules/auth/Auth';
import { RateCalculator } from './modules/shipments/RateCalculator';
import { initializeStorage } from './common/utils/storage';
import { ToastProvider } from './common/components/Shared';
import { MOCK_NOTIFICATIONS } from './common/mockData/notifications';
import { authService } from './common/services/auth';

export default function App() {
  const [auth, setAuth] = useState(authService.isAuthenticated());
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  useEffect(() => initializeStorage(), []);
  const logout = () => { authService.logout(); setAuth(false); };
  if (!auth) return <ToastProvider><Auth onLogin={() => setAuth(true)} /></ToastProvider>;
  return (
    <ToastProvider><Layout onLogout={logout} notifications={notifs} onMarkAsRead={() => {}} onMarkAllAsRead={() => {}}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/shipments/rates" element={<RateCalculator />} />
        <Route path="/tracking" element={<Tracking />} /><Route path="/tracking/:id" element={<Tracking />} />
        <Route path="/wallet" element={<Wallet />} /><Route path="/invoices" element={<Invoices />} />
        <Route path="/channels/active" element={<ActiveView />} /><Route path="/channels/all" element={<AllView />} />
        <Route path="/channels/orders" element={<OrdersView />} />
        <Route path="/settings/:tab" element={<Settings />} /><Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout></ToastProvider>
  );
}