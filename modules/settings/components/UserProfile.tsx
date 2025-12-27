
import React, { useState } from 'react';
import { Card, Button, Input, useToast } from '../../../common/components/Shared';
import { Upload, User, Mail, Phone, Briefcase } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Controlled Inputs
  const [formData, setFormData] = useState({
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex.morgan@logiflow.com',
      phone: '+1 (555) 000-1234'
  });

  const handleSave = () => {
      setLoading(true);
      // Simulate API
      setTimeout(() => {
          setLoading(false);
          toast.success('Profile updated successfully', {
              description: 'Your personal information has been saved.'
          });
      }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Personal Information" subtitle="Update your photo and personal details here.">
          <div className="flex flex-col md:flex-row gap-8 mt-4">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-3 min-w-[160px]">
                <div className="relative group cursor-pointer">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-brand-100 to-indigo-100 flex items-center justify-center text-brand-600 text-2xl font-bold border-4 border-white shadow-card group-hover:border-brand-100 transition-all">
                      AM
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Upload className="w-6 h-6" />
                    </div>
                </div>
                <div className="text-center">
                   <Button variant="outline" size="sm" className="mb-1">Change Avatar</Button>
                   <p className="text-[10px] text-slate-400">JPG or PNG. 1MB Max.</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input 
                    label="First Name" 
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    icon={User}
                />
                <Input 
                    label="Last Name" 
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
                <Input 
                    label="Email Address" 
                    value={formData.email}
                    className="bg-slate-50 text-slate-500 cursor-not-allowed" 
                    readOnly 
                    icon={Mail}
                    title="Contact admin to change email"
                />
                <Input 
                    label="Phone Number" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    icon={Phone}
                />
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-end border-t border-slate-50 pt-5 gap-4">
            <Button variant="secondary" onClick={() => window.location.reload()}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
      </Card>
      
      <Card title="Role & Permissions">
          <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-5 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-brand-50 rounded-lg text-brand-600">
                  <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-slate-900 text-sm">Vendor Administrator</p>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wide border border-emerald-100">Active</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                      You have full access to shipment creation, billing management, and team settings. 
                      To request a role change, please contact your account manager.
                  </p>
              </div>
          </div>
      </Card>
    </div>
  );
};
