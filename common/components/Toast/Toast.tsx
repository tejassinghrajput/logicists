
import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { ToastData } from './types';

export const Toast: React.FC<{ toast: ToastData; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const handleDismiss = () => { setIsExiting(true); setTimeout(() => onDismiss(toast.id), 300); };

  useEffect(() => {
    if (toast.duration) { const t = setTimeout(handleDismiss, toast.duration); return () => clearTimeout(t); }
  }, []);

  const style = {
    default: "bg-white border-slate-200 text-slate-900 shadow-card",
    success: "bg-emerald-50 border-emerald-100 text-emerald-900",
    error: "bg-rose-50 border-rose-100 text-rose-900",
    warning: "bg-amber-50 border-amber-100 text-amber-900",
    info: "bg-brand-50 border-brand-100 text-brand-900",
  }[toast.type];

  const Icon = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle, info: Info, default: null }[toast.type];

  return (
    <div className={`w-full max-w-sm rounded-xl border p-4 shadow-lg transition-all duration-300 ${style} ${isExiting ? 'opacity-0 translate-x-full' : 'animate-slide-up'}`} role="alert">
      <div className="flex items-start gap-3">
        {Icon && <Icon className="w-5 h-5 flex-shrink-0 opacity-80" />}
        <div className="flex-1">
            {toast.title && <h5 className="font-semibold text-sm mb-0.5">{toast.title}</h5>}
            {toast.description && <p className="text-sm opacity-90 leading-snug">{toast.description}</p>}
            {toast.action && (
                <button onClick={(e) => { e.stopPropagation(); toast.action?.onClick(); }} className="mt-2 text-xs font-bold uppercase tracking-wider hover:underline">
                    {toast.action.label}
                </button>
            )}
        </div>
        <button onClick={handleDismiss} className="opacity-50 hover:opacity-100"><X className="w-4 h-4" /></button>
      </div>
    </div>
  );
};
