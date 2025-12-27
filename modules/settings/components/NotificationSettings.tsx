
import React, { useState } from 'react';
import { Card, Button, useToast } from '../../../../common/components/Shared';
import { NotificationRow } from './notifications/NotificationRow';

export const NotificationSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          toast.success('Preferences saved', { description: 'Your notification settings have been updated.' });
      }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <Card title="Notification Preferences" subtitle="Manage how and when you receive updates.">
            <div className="mt-4">
                <div className="grid grid-cols-12 gap-4 border-b border-slate-100 pb-3 mb-3">
                    <div className="col-span-6 text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">Activity</div>
                    <div className="col-span-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Email</div>
                    <div className="col-span-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Push</div>
                    <div className="col-span-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">SMS</div>
                </div>
                <NotificationRow label="Shipment Status" desc="Delivered, Exceptions" email push sms color="teal" />
                <NotificationRow label="Billing & Invoices" desc="New invoice, Payment failed" email push color="violet" />
                <NotificationRow label="Security Alerts" desc="New login, Password change" email push sms color="rose" />
                <NotificationRow label="Marketing" desc="Product updates, Newsletter" email={false} push={false} sms={false} color="orange" />
            </div>
            <div className="mt-6 flex justify-end pt-4 border-t border-slate-50">
                <Button variant="primary" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Preferences'}</Button>
            </div>
        </Card>
    </div>
  );
};
