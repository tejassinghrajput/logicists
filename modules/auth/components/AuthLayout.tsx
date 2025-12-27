import React from 'react';
import { Package } from 'lucide-react';

interface Props { form: React.ReactNode; sidePanel: React.ReactNode; }

export const AuthLayout: React.FC<Props> = ({ form, sidePanel }) => (
  <div className="min-h-screen bg-white flex font-sans">
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-24 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-sm my-auto">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">LogiFlow</span>
        </div>
        {form}
      </div>
    </div>
    {sidePanel}
  </div>
);