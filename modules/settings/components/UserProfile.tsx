import React, { useState } from 'react';
import { Card, Button, EditableInput, useToast } from '../../../common/components/Shared';
import { Upload, User, Mail, Phone, Briefcase } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { toast } = useToast();
  const [data, setData] = useState({ first: 'Alex', last: 'Morgan', email: 'alex@logiflow.com', phone: '+1 (555) 000-1234' });

  const save = (key: string, val: string) => {
    setData(p => ({ ...p, [key]: val }));
    toast.success('Updated', { description: `${key.charAt(0).toUpperCase() + key.slice(1)} saved successfully.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Personal Information" subtitle="Manage your personal details.">
          <div className="flex flex-col md:flex-row gap-8 mt-4">
            <div className="flex flex-col items-center space-y-3 min-w-[160px]">
                <div className="relative group cursor-pointer">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-brand-100 to-indigo-100 flex items-center justify-center text-brand-600 text-2xl font-bold border-4 border-white shadow-card group-hover:border-brand-100 transition-all">AM</div>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Upload className="w-6 h-6" /></div>
                </div>
                <Button variant="outline" size="sm" className="mb-1">Change Avatar</Button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                <EditableInput label="First Name" value={data.first} onSave={v => save('first', v)} icon={User} />
                <EditableInput label="Last Name" value={data.last} onSave={v => save('last', v)} />
                <EditableInput label="Email Address" value={data.email} onSave={() => {}} icon={Mail} readOnly />
                <EditableInput label="Phone Number" value={data.phone} onSave={v => save('phone', v)} icon={Phone} />
            </div>
          </div>
      </Card>
      
      <Card title="Role & Permissions">
          <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-5 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-brand-50 rounded-lg text-brand-600"><Briefcase className="w-5 h-5" /></div>
              <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-slate-900 text-sm">Vendor Administrator</p>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">Active</span>
                  </div>
                  <p className="text-xs text-slate-500">You have full access to shipment creation, billing management, and team settings.</p>
              </div>
          </div>
      </Card>
    </div>
  );
};