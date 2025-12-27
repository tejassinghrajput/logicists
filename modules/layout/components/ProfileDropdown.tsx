import React from 'react';
import { User, LogOut, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../common/components/Shared';

interface Props { onClose: () => void; onLogout: () => void; }

export const ProfileDropdown: React.FC<Props> = ({ onClose, onLogout }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const nav = (path: string) => { navigate(path); onClose(); };

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully');
    onClose();
  };

  return (
    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-scale-in origin-top-right">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <p className="text-sm font-bold text-slate-900">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">alex@logiflow.com</p>
        </div>
        <div className="p-1 space-y-0.5">
            <button onClick={() => nav('/settings/profile')} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center"><User className="w-4 h-4 mr-2" />Profile</button>
            <button onClick={() => nav('/settings/payouts')} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center"><CreditCard className="w-4 h-4 mr-2" />Billing</button>
        </div>
        <div className="p-1 border-t border-slate-50">
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center"><LogOut className="w-4 h-4 mr-2" />Sign Out</button>
        </div>
    </div>
  );
};