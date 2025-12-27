
import React, { useRef, useState, useEffect } from 'react';
import { Menu, Search, Bell, User, LogOut, CreditCard } from 'lucide-react';
import { ViewState, Notification } from '../../../common/types';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
    onMobileMenuOpen: () => void;
    onNavigate: (view: ViewState) => void;
    onLogout: () => void;
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuOpen, onNavigate, onLogout, notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
             if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfileMenu(false);
             if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) setShowNotifications(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between glass transition-all duration-200">
          <div className="flex items-center flex-1">
            <button onClick={onMobileMenuOpen} className="md:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Menu className="w-6 h-6" /></button>
            <div className="relative hidden sm:block w-full max-w-md ml-2 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search className="h-4 w-4" /></div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border-0 bg-slate-100/50 hover:bg-white hover:shadow-sm focus:bg-white rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:text-sm transition-all duration-200" placeholder="Search..." />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2.5 rounded-xl transition-all ${showNotifications ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-brand-600 hover:bg-brand-50'}`}
                >
                    {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />}
                    <Bell className="w-5 h-5" />
                </button>
                {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-scale-in origin-top-right">
                        <NotificationDropdown 
                            notifications={notifications} 
                            onMarkAsRead={onMarkAsRead} 
                            onMarkAllAsRead={onMarkAllAsRead}
                            onClose={() => setShowNotifications(false)}
                        />
                    </div>
                )}
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            
            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-3 p-1.5 rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm">
                    <div className="hidden sm:flex flex-col items-end mr-1"><span className="text-sm font-semibold text-slate-900">Alex Morgan</span><span className="text-[10px] uppercase tracking-wide font-medium text-slate-500">Vendor Admin</span></div>
                    <div className="h-9 w-9 bg-brand-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><span className="text-sm font-bold text-brand-700">AM</span></div>
                </button>
                {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-scale-in origin-top-right">
                        <div className="p-4 border-b border-slate-50 bg-slate-50/50"><p className="text-sm font-bold text-slate-900">Alex Morgan</p><p className="text-xs text-slate-500 truncate">alex@logiflow.com</p></div>
                        <div className="p-1 space-y-0.5">
                            <button onClick={() => onNavigate('settings_user')} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center"><User className="w-4 h-4 mr-2" />Profile</button>
                            <button onClick={() => onNavigate('settings_payouts')} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center"><CreditCard className="w-4 h-4 mr-2" />Billing</button>
                        </div>
                        <div className="p-1 border-t border-slate-50"><button onClick={onLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center"><LogOut className="w-4 h-4 mr-2" />Sign Out</button></div>
                    </div>
                )}
            </div>
          </div>
        </header>
    );
};
