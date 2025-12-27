
import React, { useState } from 'react';
import { VendorDetails } from './components/VendorDetails';
import { PayoutSettings } from './components/PayoutSettings';
import { Building, Wallet, Shield } from 'lucide-react';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'payouts' | 'security'>('details');

  const tabs = [
    { id: 'details', label: 'Company Details', icon: Building },
    { id: 'payouts', label: 'Payout Methods', icon: Wallet },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
  ] as const;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Vendor Profile</h1>
        <p className="text-slate-500 mt-1">Manage your business information and payout preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                    }`}
                >
                    <tab.icon className={`w-4 h-4 mr-3 ${activeTab === tab.id ? 'text-brand-200' : 'text-slate-400'}`} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 animate-fade-in">
            {activeTab === 'details' && <VendorDetails />}
            {activeTab === 'payouts' && <PayoutSettings />}
            {activeTab === 'security' && (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                    <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900">Compliance Center</h3>
                    <p className="text-slate-500 max-w-md mx-auto mt-2">
                        View your contract agreements, insurance certificates, and SOC2 compliance reports here.
                    </p>
                </div>
            )}
        </div>
      </div>
    </>
  );
};
