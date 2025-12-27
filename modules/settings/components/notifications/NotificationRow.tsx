
import React, { useState } from 'react';

interface Props { label: string; desc: string; email?: boolean; push?: boolean; sms?: boolean; color: string; }

export const NotificationRow: React.FC<Props> = ({ label, desc, email = true, push = true, sms = false, color }) => {
    const [state, setState] = useState({ email, push, sms });
    return (
        <div className="grid grid-cols-12 gap-4 py-4 items-center border-b border-slate-50 hover:bg-slate-50/80 rounded-lg px-2 -mx-2 group transition-colors">
            <div className="col-span-6">
                <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <div className="col-span-2 flex justify-center"><Toggle checked={state.email} onChange={() => setState({...state, email: !state.email})} color={color} /></div>
            <div className="col-span-2 flex justify-center"><Toggle checked={state.push} onChange={() => setState({...state, push: !state.push})} color={color} /></div>
            <div className="col-span-2 flex justify-center"><Toggle checked={state.sms} onChange={() => setState({...state, sms: !state.sms})} color={color} /></div>
        </div>
    );
};

const Toggle: React.FC<{ checked: boolean, onChange: () => void, color: string }> = ({ checked, onChange, color }) => {
    const bg = { teal: 'bg-teal-500', violet: 'bg-violet-500', orange: 'bg-orange-500', rose: 'bg-rose-500', brand: 'bg-brand-500' }[color] || 'bg-brand-500';
    return (
        <div onClick={onChange} className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${checked ? bg : 'bg-slate-200'}`}>
            <span className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
    );
};
