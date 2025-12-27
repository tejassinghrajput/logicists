
import React, { useState } from 'react';
import { DataTable } from '../../../common/components/DataTable';
import { Modal, Button, useToast } from '../../../common/components/Shared';
import { Notification } from '../../../common/types';
import { Trash2, MailOpen, Check, Eye, CheckCircle2, AlertTriangle, Info, Clock, Calendar } from 'lucide-react';
import { getNotificationColumns, NOTIFICATION_FILTERS } from './config';

interface ActivityViewProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
    filter?: 'all' | 'alerts' | 'announcements';
}

export const ActivityView: React.FC<ActivityViewProps> = ({ notifications, onMarkAsRead, onDelete, filter = 'all' }) => {
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const { toast } = useToast();

    // Pre-filter data based on the route view
    const routeFilteredData = notifications.filter(n => {
        if (filter === 'alerts') return n.type === 'warning' || n.type === 'error';
        if (filter === 'announcements') return n.category === 'announcement';
        return true;
    });

    const getTitle = () => {
        if (filter === 'alerts') return 'System Alerts';
        if (filter === 'announcements') return 'Announcements';
        return 'Activity Feed';
    };

    const handleMarkAsRead = (n: Notification) => {
        onMarkAsRead(n.id);
        toast.success('Notification marked as read');
        if (selectedNotification?.id === n.id) {
            setSelectedNotification(null);
        }
    };

    const handleDelete = (n: Notification) => {
        onDelete(n.id);
        toast.success('Notification deleted');
        if (selectedNotification?.id === n.id) {
            setSelectedNotification(null);
        }
    };

    const getModalIcon = (type: string) => {
        const icons = {
            success: { Icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            warning: { Icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
            error: { Icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100' },
            info: { Icon: Info, color: 'text-brand-600', bg: 'bg-brand-100' }
        };
        return icons[type as keyof typeof icons] || icons.info;
    };

    return (
        <>
            <div className="animate-fade-in space-y-6 w-full max-w-[1920px] mx-auto">
                <DataTable 
                    title={getTitle()}
                    columns={getNotificationColumns()}
                    data={routeFilteredData}
                    enableSearch={true}
                    searchPlaceholder="Search activity..."
                    searchKeys={['title', 'message']}
                    filterConfig={NOTIFICATION_FILTERS}
                    emptyMessage="No notifications found matching your criteria."
                    
                    primaryAction={{
                        label: 'Mark All Read',
                        icon: Check,
                        onClick: () => {
                            notifications.forEach(n => onMarkAsRead(n.id));
                            toast.success('All notifications marked as read');
                        },
                        variant: 'secondary'
                    }}
                    
                    rowActions={(n) => [
                        {
                            label: 'View Details',
                            icon: Eye,
                            onClick: () => setSelectedNotification(n)
                        },
                        { 
                            label: 'Mark as Read', 
                            icon: MailOpen, 
                            onClick: () => handleMarkAsRead(n) 
                        },
                        { 
                            label: 'Delete', 
                            icon: Trash2, 
                            onClick: () => handleDelete(n), 
                            variant: 'danger' 
                        }
                    ]}
                />
            </div>

            <Modal 
                isOpen={!!selectedNotification} 
                onClose={() => setSelectedNotification(null)}
                title="Notification Details"
                footer={
                    <div className="flex w-full justify-between items-center bg-slate-50/50 -mx-6 -mb-6 px-6 py-4 border-t border-slate-100 rounded-b-2xl">
                        <Button variant="danger" icon={Trash2} onClick={() => { 
                            if(selectedNotification) handleDelete(selectedNotification); 
                        }}>Delete</Button>
                        <div className="flex gap-3">
                            {selectedNotification && !selectedNotification.read && (
                                <Button variant="secondary" icon={MailOpen} onClick={() => handleMarkAsRead(selectedNotification)}>Mark as Read</Button>
                            )}
                            <Button variant="primary" onClick={() => setSelectedNotification(null)}>Close</Button>
                        </div>
                    </div>
                }
            >
                {selectedNotification && (() => {
                    const { Icon, color, bg } = getModalIcon(selectedNotification.type);
                    return (
                        <div className="flex flex-col items-center text-center">
                            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${bg} ${color} ring-4 ring-white shadow-lg`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedNotification.title}</h3>
                            
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                                    selectedNotification.category === 'announcement' ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {selectedNotification.category}
                                </span>
                                <span className="text-xs font-medium text-slate-400 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" /> {selectedNotification.time}
                                </span>
                            </div>

                            <div className="w-full bg-slate-50 p-5 rounded-xl border border-slate-100 text-left">
                                <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                                    {selectedNotification.message}
                                </p>
                            </div>
                        </div>
                    );
                })()}
            </Modal>
        </>
    );
};
