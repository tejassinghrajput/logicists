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
import { Notification } from './common/types';
import { initializeStorage } from './common/utils/storage';
import { ToastProvider } from './common/components/Shared';
import { MOCK_NOTIFICATIONS } from './common/mockData/notifications';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => { initializeStorage(); setNotifications(MOCK_NOTIFICATIONS); }, []);

  const handleMarkAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const handleMarkAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const handleDeleteNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  if (!isAuthenticated) return <ToastProvider><Auth onLogin={() => setIsAuthenticated(true)} /></ToastProvider>;

  return (
    <ToastProvider>
        <Layout onLogout={() => setIsAuthenticated(false)} notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllAsRead={handleMarkAllAsRead}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/shipments" element={<Shipments />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/tracking/:id" element={<Tracking />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/channels/active" element={<ActiveView />} />
                <Route path="/channels/all" element={<AllView />} />
                <Route path="/channels/orders" element={<OrdersView />} />
                <Route path="/notifications/all" element={<ActivityView notifications={notifications} onMarkAsRead={handleMarkAsRead} onDelete={handleDeleteNotification} filter="all" />} />
                <Route path="/notifications/alerts" element={<ActivityView notifications={notifications} onMarkAsRead={handleMarkAsRead} onDelete={handleDeleteNotification} filter="alerts" />} />
                <Route path="/notifications/announcements" element={<ActivityView notifications={notifications} onMarkAsRead={handleMarkAsRead} onDelete={handleDeleteNotification} filter="announcements" />} />
                <Route path="/settings/:tab" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    </ToastProvider>
  );
}