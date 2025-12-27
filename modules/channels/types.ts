
import { LucideIcon } from 'lucide-react';

export interface AppDef {
    id: string;
    name: string;
    desc: string;
    icon: string;
    logo?: string;
    color: string;
    bg: string;
}

export interface OrderLog {
    id: string;
    channel: string;
    orderNumber: string;
    customer: string;
    amount: number;
    currency: string;
    status: string;
    date: string;
    items: number;
    message?: string;
    productPreview: string;
}
