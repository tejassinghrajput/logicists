
import React, { useState } from 'react';
import { Card, Button, Modal, useToast } from '../../../../common/components/Shared';
import { Laptop, Smartphone, LogOut } from 'lucide-react';

export const SessionsSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const handleRevoke = () => {
      setShowModal(false);
      toast.success('Session Revoked', { description: 'Device logged out successfully.' });
  };

  return (
    <>
      <Card title="Active Sessions">
          <div className="space-y-1 mt-2">
              <SessionItem icon={Laptop} device="MacBook Pro" loc="San Francisco, CA" active />
              <div className="border-t border-slate-50 my-2" />
              <SessionItem icon={Smartphone} device="iPhone 14" loc="San Francisco, CA" time="2h ago" onRevoke={() => setShowModal(true)} />
          </div>
      </Card>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Revoke Session?" footer={<><Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button><Button variant="danger" onClick={handleRevoke}>Revoke</Button></>}>
          <p className="text-slate-600 text-sm">Are you sure you want to log out this device?</p>
      </Modal>
    </>
  );
};

const SessionItem: React.FC<{ icon: any, device: string, loc: string, active?: boolean, time?: string, onRevoke?: () => void }> = ({ icon: Icon, device, loc, active, time, onRevoke }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl ${active ? 'bg-violet-50/40 border border-violet-100/50' : 'hover:bg-slate-50'}`}>
        <div className="flex items-center space-x-4">
            <div className={`p-2.5 rounded-xl ${active ? 'bg-white text-violet-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}><Icon className="w-6 h-6" /></div>
            <div>
                <p className="text-sm font-bold text-slate-900">{device}</p>
                <p className="text-xs text-slate-500">{loc} • {active ? <span className="text-emerald-600 font-bold">Active</span> : time}</p>
            </div>
        </div>
        {!active && <Button variant="ghost" size="sm" onClick={onRevoke} icon={LogOut}>Revoke</Button>}
    </div>
);
