import React, { useRef, useState, useEffect } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../../common/types';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

interface HeaderProps {
    onMobileMenuOpen: () => void; onLogout: () => void; notifications: Notification[];
    onMarkAsRead: (id: string) => void; onMarkAllAsRead: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuOpen, onLogout, notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const [openPopover, setOpenPopover] = useState<'none'|'profile'|'notif'>('none');
    const notifRef = useRef<HTMLDivElement>(null);
    const profRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const unread = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
             const target = e.target as Node;
             if (openPopover === 'profile' && profRef.current && !profRef.current.contains(target)) setOpenPopover('none');
             if (openPopover === 'notif' && window.innerWidth >= 640 && notifRef.current && !notifRef.current.contains(target)) setOpenPopover('none');
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [openPopover]);

    const handleViewAll = () => { setOpenPopover('none'); navigate('/notifications/all'); };

    return (
        <header className="sticky top-0 z-20 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between glass transition-all duration-200">
          <div className="flex items-center flex-1">
            <button onClick={onMobileMenuOpen} className="md:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Menu className="w-6 h-6" /></button>
            <div className="relative hidden sm:block w-full max-w-md ml-2 group"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><Search className="h-4 w-4" /></div><input type="text" className="block w-full pl-10 pr-3 py-2 border-0 bg-slate-100/50 hover:bg-white hover:shadow-sm focus:bg-white rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 sm:text-sm transition-all duration-200" placeholder="Search..." /></div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative" ref={notifRef}>
                <button onClick={() => setOpenPopover(openPopover === 'notif' ? 'none' : 'notif')} className={`relative p-2.5 rounded-xl transition-all ${openPopover === 'notif' ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-brand-600 hover:bg-brand-50'}`}>
                    {unread > 0 && <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />}<Bell className="w-5 h-5" />
                </button>
                {openPopover === 'notif' && (
                    <>
                        <div className="fixed inset-x-0 top-16 bottom-0 bg-slate-900/20 z-40 sm:hidden backdrop-blur-[2px]" onClick={() => setOpenPopover('none')} />
                        <div className="fixed left-4 right-4 top-20 z-50 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-in origin-top sm:origin-top-right">
                            <NotificationDropdown notifications={notifications} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} onClose={() => setOpenPopover('none')} onViewAll={handleViewAll} />
                        </div>
                    </>
                )}
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="relative" ref={profRef}>
                <button onClick={() => setOpenPopover(openPopover === 'profile' ? 'none' : 'profile')} className="flex items-center space-x-3 p-1.5 rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm">
                    <div className="hidden sm:flex flex-col items-end mr-1"><span className="text-sm font-semibold text-slate-900">Alex Morgan</span><span className="text-[10px] uppercase tracking-wide font-medium text-slate-500">Vendor Admin</span></div>
                    <div className="h-9 w-9 bg-brand-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><span className="text-sm font-bold text-brand-700">AM</span></div>
                </button>
                {openPopover === 'profile' && <ProfileDropdown onClose={() => setOpenPopover('none')} onLogout={onLogout} />}
            </div>
          </div>
        </header>
    );
};