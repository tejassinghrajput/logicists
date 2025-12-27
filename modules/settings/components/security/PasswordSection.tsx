
import React, { useState } from 'react';
import { Card, Button, Input, useToast } from '../../../../common/components/Shared';
import { Lock } from 'lucide-react';

export const PasswordSection: React.FC = () => {
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = () => {
      if (!pass.current || !pass.new || !pass.confirm) return toast.error('Missing fields', { description: 'Please fill in all password fields.' });
      if (pass.new !== pass.confirm) return toast.error('Mismatch', { description: 'New passwords do not match.' });
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          toast.success('Password updated', { description: 'Your password has been changed securely.' });
          setPass({ current: '', new: '', confirm: '' });
      }, 1000);
  };

  return (
      <Card title="Password" subtitle="Ensure your account is using a strong, unique password.">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
             <div className="space-y-4">
                 <Input label="Current Password" type="password" value={pass.current} onChange={e => setPass({...pass, current: e.target.value})} />
                 <Input label="New Password" type="password" value={pass.new} onChange={e => setPass({...pass, new: e.target.value})} />
                 <Input label="Confirm New Password" type="password" value={pass.confirm} onChange={e => setPass({...pass, confirm: e.target.value})} />
                 <div className="pt-2"><Button variant="primary" onClick={handleUpdate} disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</Button></div>
             </div>
             <div>
                 <div className="p-5 bg-violet-50 border border-violet-100 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                        <Lock className="w-5 h-5 text-violet-600" />
                        <h4 className="text-sm font-bold text-violet-900">Requirements</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-violet-700 ml-1 list-disc list-inside">
                        <li>Minimum 8 characters long</li>
                        <li>At least one uppercase letter & number</li>
                    </ul>
                 </div>
             </div>
         </div>
      </Card>
  );
};
