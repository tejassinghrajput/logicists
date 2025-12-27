
import React, { useState } from 'react';
import { Card, Button, Input, Modal, useToast } from '../../../../common/components/Shared';
import { ShieldCheck, Check, QrCode } from 'lucide-react';

export const TwoFactorSection: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const handleVerify = () => {
      if (code === '123456') {
          setEnabled(true); setShowModal(false); setCode('');
          toast.success('2FA Enabled', { description: 'Two-factor authentication is now active.' });
      } else {
          toast.error('Invalid Code', { description: 'Please try again. (Hint: 123456)' });
      }
  };

  return (
    <>
      <Card>
          <div className="flex items-center justify-between">
              <div className="flex items-start space-x-5">
                  <div className={`p-4 rounded-xl ${enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}><ShieldCheck className="w-8 h-8" /></div>
                  <div>
                      <h3 className="text-lg font-bold text-slate-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-slate-500 mt-1 max-w-lg">{enabled ? 'Your account is secured.' : 'Add an extra layer of security.'}</p>
                      {enabled && <div className="mt-2 flex items-center text-xs font-bold text-emerald-600"><Check className="w-3 h-3 mr-1" /> Active</div>}
                  </div>
              </div>
              <Button variant={enabled ? 'outline' : 'primary'} onClick={() => enabled ? setEnabled(false) : setShowModal(true)}>{enabled ? 'Disable' : 'Enable'}</Button>
          </div>
      </Card>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Setup 2FA" footer={<Button variant="primary" onClick={handleVerify}>Verify</Button>}>
          <div className="text-center space-y-4">
              <div className="p-4 bg-white border rounded-xl inline-block"><QrCode className="w-24 h-24" /></div>
              <p className="text-sm text-slate-600">Scan QR and enter code.</p>
              <Input placeholder="000 000" className="text-center text-lg font-mono" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
      </Modal>
    </>
  );
};
