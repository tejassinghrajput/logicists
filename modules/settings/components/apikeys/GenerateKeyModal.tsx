import React, { useState } from 'react';
import { Button, Input, Modal, Select, useToast } from '../../../../common/components/Shared';
import { AlertTriangle, Key } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; onGenerate: (name: string, type: string) => void; }

export const GenerateKeyModal: React.FC<Props> = ({ isOpen, onClose, onGenerate }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('test');
  const [key, setKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGen = () => {
      const k = (type === 'prod' ? 'pk_live_' : 'pk_test_') + Math.random().toString(36).substr(2, 20);
      setKey(k);
      toast.success('Key Generated', { description: 'Copy it now.' });
      onGenerate(name, type);
  };

  const close = () => { setKey(null); setName(''); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Generate API Key" footer={!key ? <Button onClick={handleGen} disabled={!name}>Generate</Button> : <Button onClick={close}>Done</Button>}>
        {!key ? (
            <div className="space-y-4">
                <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
                <Select label="Env" options={[{label:'Test',value:'test'},{label:'Prod',value:'prod'}]} value={type} onChange={setType} />
            </div>
        ) : (
            <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl flex items-start text-amber-800 text-sm"><AlertTriangle className="w-5 h-5 mr-2" />Copy this key now.</div>
                <div className="relative"><Input readOnly value={key} /><button onClick={() => navigator.clipboard.writeText(key)} className="absolute right-2 top-2 text-xs bg-white border px-2 py-1 rounded">Copy</button></div>
            </div>
        )}
    </Modal>
  );
};