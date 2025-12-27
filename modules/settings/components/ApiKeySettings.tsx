
import React, { useState } from 'react';
import { Button, useToast } from '../../../common/components/Shared';
import { Plus } from 'lucide-react';
import { ApiKeyList } from './apikeys/ApiKeyList';
import { GenerateKeyModal } from './apikeys/GenerateKeyModal';

export const ApiKeySettings: React.FC = () => {
  const { toast } = useToast();
  const [keys, setKeys] = useState([
      { id: 1, name: 'Production Backend', prefix: 'pk_live_83...', created: 'Oct 24', lastUsed: '2m ago', type: 'prod' },
      { id: 2, name: 'Staging Env', prefix: 'pk_test_99...', created: 'Sep 12', lastUsed: '5d ago', type: 'test' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const addKey = (name: string, type: string) => {
      setKeys([...keys, { id: Date.now(), name, prefix: type === 'prod' ? 'pk_live_...' : 'pk_test_...', created: 'Just now', lastUsed: 'Never', type }]);
  };
  const revoke = (id: number) => {
      setKeys(keys.filter(k => k.id !== id));
      toast.error('Key Revoked');
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
             <div><h2 className="text-lg font-bold text-slate-900">API Keys</h2><p className="text-sm text-slate-500">Manage access keys.</p></div>
             <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>Generate Key</Button>
        </div>
        <ApiKeyList keys={keys} onRevoke={revoke} />
        <GenerateKeyModal isOpen={showModal} onClose={() => setShowModal(false)} onGenerate={addKey} />
    </div>
  );
};
