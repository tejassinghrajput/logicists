
import React from 'react';
import { DataTable } from '../../../common/components/DataTable';
import { Notification } from '../../../common/types';
import { Trash2, MailOpen, Check } from 'lucide-react';
import { getNotificationColumns, NOTIFICATION_FILTERS } from './config';

interface ActivityViewProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
    filter?: 'all' | 'alerts' | 'announcements';
}

export const ActivityView: React.FC<ActivityViewProps> = ({ notifications, onMarkAsRead, onDelete, filter = 'all' }) => {
    
    // Pre-filter data based on the route view, but let the DataTable handle the rest
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

    return (
        <div className="animate-fade-in space-y-6">
            <DataTable 
                title={getTitle()}
                columns={getNotificationColumns()}
                data={routeFilteredData}
                enableSearch={true}
                searchPlaceholder="Search activity..."
                searchKeys={['title', 'message']}
                filterConfig={NOTIFICATION_FILTERS}
                emptyMessage="No notifications found matching your criteria."
                
                // Using library action props
                primaryAction={{
                    label: 'Mark All Read',
                    icon: Check,
                    onClick: () => notifications.forEach(n => onMarkAsRead(n.id)),
                    variant: 'secondary'
                }}
                
                rowActions={(n) => [
                    { 
                        label: 'Mark as Read', 
                        icon: MailOpen, 
                        onClick: () => onMarkAsRead(n.id) 
                    },
                    { 
                        label: 'Delete', 
                        icon: Trash2, 
                        onClick: () => onDelete(n.id), 
                        variant: 'danger' 
                    }
                ]}
            />
        </div>
    );
};
