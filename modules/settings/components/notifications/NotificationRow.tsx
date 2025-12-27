
import React, { useState } from 'react';
import { Mail, Bell, MessageSquare } from 'lucide-react';

interface Props { label: string; desc: string; email?: boolean; push?: boolean; sms?: boolean; color: string; }

export const NotificationRow: React.FC<Props> = ({ label, desc, email = true, push = true, sms = false, color }) => {
    const [state, setState] = useState({ email, push, sms });

    const toggle = (key: keyof typeof state) => {
        setState(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    const icons = { email: Mail, push: Bell, sms: MessageSquare };

    return (
        <div className="py-4 border-b border-slate-50 hover:bg-slate-50/80 rounded-lg px-2 -mx-2 group transition-colors">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-6">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <div className="col-span-2 flex justify-center"><Toggle checked={state.email} onChange={() => toggle('email')} color={color} /></div>
                <div className="col-span-2 flex justify-center"><Toggle checked={state.push} onChange={() => toggle('push')} color={color} /></div>
                <div className="col-span-2 flex justify-center"><Toggle checked={state.sms} onChange={() => toggle('sms')} color={color} /></div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-3">
                <div className="mb-1">
                    <p className="text-sm font-bold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <div className="flex gap-2">
                    {(['email', 'push', 'sms'] as const).map((type) => {
                        const Icon = icons[type];
                        return (
                            <div 
                                key={type} 
                                onClick={() => toggle(type)} 
                                className={`flex-1 flex flex-col items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                                    state[type] 
                                        ? 'bg-slate-50 border-brand-200 shadow-sm' 
                                        : 'bg-white border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                     <div className={`p-1.5 rounded-full transition-colors ${state[type] ? 'bg-white shadow-sm text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                                        <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${state[type] ? 'text-brand-900' : 'text-slate-400'}`}>
                                        {type}
                                    </span>
                                </div>
                                <Toggle checked={state[type]} onChange={() => toggle(type)} color={color} size="sm" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Toggle: React.FC<{ checked: boolean, onChange: () => void, color: string, size?: 'sm' | 'md' }> = ({ checked, onChange, color, size = 'md' }) => {
    const colors: Record<string, string> = { 
        teal: 'bg-teal-500', 
        violet: 'bg-violet-500', 
        orange: 'bg-orange-500', 
        rose: 'bg-rose-500', 
        brand: 'bg-brand-500' 
    };
    const bgClass = colors[color] || 'bg-brand-500';
    
    const isSmall = size === 'sm';
    const h = isSmall ? 'h-5' : 'h-6';
    const w = isSmall ? 'w-9' : 'w-11';
    const dot = isSmall ? 'h-4 w-4' : 'h-5 w-5';
    const translate = isSmall ? 'translate-x-4' : 'translate-x-5';

    return (
        <div 
            onClick={(e) => { 
                e.stopPropagation(); 
                onChange(); 
            }} 
            className={`relative ${h} ${w} cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${checked ? bgClass : 'bg-slate-200'}`}
        >
            <span 
                className={`pointer-events-none inline-block ${dot} transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${checked ? translate : 'translate-x-0'}`} 
            />
        </div>
    );
};
