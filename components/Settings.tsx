import React from 'react';
import { Card, Button, Input } from './Shared';
import { User, Lock, Bell, Globe } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Settings Nav */}
         <div className="lg:col-span-1 space-y-1">
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium bg-white text-brand-600 shadow-sm rounded-lg border border-slate-200">
               <User className="w-4 h-4 mr-3" />
               Profile
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
               <Lock className="w-4 h-4 mr-3" />
               Security
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
               <Bell className="w-4 h-4 mr-3" />
               Notifications
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
               <Globe className="w-4 h-4 mr-3" />
               API Keys
            </button>
         </div>

         {/* Settings Content */}
         <div className="lg:col-span-3 space-y-6">
            <Card title="Personal Information">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div className="col-span-1 md:col-span-2 flex items-center space-x-4 mb-4">
                     <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xl font-bold">
                        AM
                     </div>
                     <div>
                        <Button variant="outline" size="sm">Change Avatar</Button>
                        <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. 1MB Max.</p>
                     </div>
                  </div>
                  <Input label="First Name" defaultValue="Alex" />
                  <Input label="Last Name" defaultValue="Morgan" />
                  <Input label="Email Address" defaultValue="alex.morgan@logiflow.com" className="bg-slate-50" readOnly />
                  <Input label="Phone Number" defaultValue="+1 (555) 000-1234" />
               </div>
               <div className="mt-6 flex justify-end">
                  <Button variant="primary">Save Changes</Button>
               </div>
            </Card>

            <Card title="Company Preferences">
               <div className="space-y-4 mt-2">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                        <p className="text-xs text-slate-500">Receive updates about your shipment status.</p>
                     </div>
                     <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-6 checked:border-brand-600" defaultChecked/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-brand-200 cursor-pointer"></label>
                     </div>
                  </div>
                  <hr className="border-slate-100" />
                   <div className="flex items-center justify-between">
                     <div>
                        <p className="text-sm font-medium text-slate-900">SMS Alerts</p>
                        <p className="text-xs text-slate-500">Get text messages for critical exceptions.</p>
                     </div>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" className="absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer right-6"/>
                        <div className="block overflow-hidden h-6 rounded-full bg-slate-300"></div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
      <style>{`
      .toggle-checkbox:checked {
         right: 0;
         border-color: #0ea5e9;
      }
      .toggle-checkbox:checked + .toggle-label {
         background-color: #0ea5e9;
      }
      `}</style>
    </>
  );
};
