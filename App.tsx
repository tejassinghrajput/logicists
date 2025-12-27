
import React, { useState, useEffect } from 'react';
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
import { Auth } from './modules/auth/Auth';
import { ViewState } from './common/types';
import { initializeStorage } from './common/utils/storage';
import { ToastProvider } from './common/components/Shared';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { initializeStorage(); }, []);
  const handleNav = (view: ViewState, id?: string) => { if (id) setSelectedId(id); setCurrentView(view); };

  if (!isAuthenticated) return <ToastProvider><Auth onLogin={() => setIsAuthenticated(true)} /></ToastProvider>;

  const renderContent = () => {
    if (currentView.startsWith('settings_')) return <Settings view={currentView} />;
    
    switch (currentView) {
      case 'dashboard': return <Dashboard onNavigate={handleNav} />;
      case 'shipments': return <Shipments onNavigate={handleNav} />;
      case 'tracking': return <Tracking shipmentId={selectedId} onBack={() => handleNav('shipments')} />;
      case 'wallet': return <Wallet />;
      case 'invoices': return <Invoices />;
      case 'channels_active': return <ActiveView />;
      case 'channels_all': return <AllView />;
      case 'channels_orders': return <OrdersView />;
      default: return <Dashboard onNavigate={handleNav} />;
    }
  };

  return (
    <ToastProvider>
        <Layout currentView={currentView} onNavigate={handleNav} onLogout={() => setIsAuthenticated(false)}>
          {renderContent()}
        </Layout>
    </ToastProvider>
  );
}
