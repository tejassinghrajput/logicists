
import React from 'react';
import { Notification, ViewState } from '../../../common/types';
import { Check, CheckCircle2, AlertTriangle, Info, Bell, X, ArrowRight } from 'lucide-react';

interface Props {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
    onClose: () => void;
    onNavigate?: (view: ViewState) => void;
}

export const NotificationDropdown: React.FC<Props> = ({ notifications, onMarkAsRead, onMarkAllAsRead, onClose }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: string) => {
        switch(type) {
            case 'success': return { Icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' };
            case 'warning': return { Icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' };
            case 'error': return { Icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' };
            default: return { Icon: Info, color: 'text-brand-500', bg: 'bg-brand-50' };
        }
    };

    return (
        <div className="flex flex-col max-h-[520px]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-900">Notifications</h3>
                    {unreadCount > 0 && <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-extrabold">{unreadCount}</span>}
                </div>
                {unreadCount > 0 && (
                    <button 
                        onClick={onMarkAllAsRead} 
                        className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center transition-colors"
                    >
                        <Check className="w-4 h-4 mr-1.5" /> Mark all read
                    </button>
                )}
            </div>
            
            <div className="overflow-y-auto flex-1 p-0">
                {notifications.length === 0 ? (
                    <div className="p-10 text-center text-slate-500">
                        <Bell className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="text-base font-medium">No notifications yet</p>
                    </div>
                ) : (
                    notifications.map(n => {
                        const { Icon, color, bg } = getIcon(n.type);
                        return (
                            <div 
                                key={n.id}
                                onClick={() => onMarkAsRead(n.id)}
                                className={`group flex gap-4 p-4 border-b border-slate-50 cursor-pointer transition-all duration-200 ${n.read ? 'hover:bg-slate-50 bg-white' : 'bg-brand-50/20 hover:bg-brand-50/40'}`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 ${bg} ${color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className={`text-sm ${n.read ? 'font-semibold text-slate-700' : 'font-bold text-slate-900'}`}>{n.title}</p>
                                        {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0 shadow-sm" />}
                                    </div>
                                    <p className={`text-sm leading-snug line-clamp-2 ${n.read ? 'text-slate-500' : 'text-slate-800'}`}>{n.message}</p>
                                    <p className="text-xs text-slate-400 mt-2 font-medium">{n.time}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center sticky bottom-0 z-10 backdrop-blur-sm">
                 <button className="text-sm font-bold text-slate-600 hover:text-brand-600 transition-colors w-full flex items-center justify-center py-1">
                     View All Activity <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
            </div>
        </div>
    );
};
