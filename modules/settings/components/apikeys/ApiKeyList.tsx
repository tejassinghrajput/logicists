
import React from 'react';
import { Card, Button, useToast } from '../../../../common/components/Shared';
import { Copy, Trash2, Key, Check } from 'lucide-react';

interface KeyData { id: number; name: string; prefix: string; type: string; created: string; lastUsed: string; }
interface Props { keys: KeyData[]; onRevoke: (id: number) => void; }

export const ApiKeyList: React.FC<Props> = ({ keys, onRevoke }) => {
  const { toast } = useToast();
  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.info('Prefix copied'); };

  return (
    <Card noPadding>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                    <tr>{['Details', 'Prefix', 'Created', 'Last Used', 'Actions'].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {keys.map((k) => {
                        const isProd = k.type === 'prod';
                        return (
                            <tr key={k.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4"><div className="flex items-center"><Key className={`w-4 h-4 mr-3 ${isProd ? 'text-violet-600' : 'text-orange-600'}`} /><span className="text-sm font-bold text-slate-900">{k.name}</span></div></td>
                                <td className="px-6 py-4"><code className="text-sm bg-slate-100 rounded px-2 py-1">{k.prefix}</code></td>
                                <td className="px-6 py-4 text-sm text-slate-500">{k.created}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{k.lastUsed}</td>
                                <td className="px-6 py-4 flex gap-2"><button onClick={() => copy(k.prefix)} className="p-2 hover:bg-slate-100 rounded"><Copy className="w-4 h-4 text-slate-400" /></button><button onClick={() => onRevoke(k.id)} className="p-2 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4 text-rose-500" /></button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </Card>
  );
};
