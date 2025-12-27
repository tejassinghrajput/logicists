import { NAV_GROUPS } from '../config';
import { BreadcrumbItem } from '../../../common/components/Breadcrumbs/Breadcrumbs';

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            if (item.path && pathname === item.path) return [{ label: group.label }, { label: item.label, active: true }];
            if (item.children) {
                for (const child of item.children) {
                    if (child.path && pathname.startsWith(child.path)) {
                         // Check for exact match or detailed view
                         const isExact = pathname === child.path;
                         const crumbs = [{ label: group.label }, { label: item.label }, { label: child.label, active: isExact }];
                         if (!isExact) crumbs.push({ label: 'Details', active: true });
                         return crumbs;
                    }
                }
            }
        }
    }
    return [{ label: 'Overview', active: true }];
};