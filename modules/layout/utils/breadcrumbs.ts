import { NAV_GROUPS } from '../config';
import { BreadcrumbItem } from '../../../common/components/Breadcrumbs/Breadcrumbs';

export const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            // Using any cast to handle union types from the configuration object
            const i = item as any;
            if (i.path && pathname === i.path) return [{ label: group.label }, { label: i.label, active: true }];
            if (i.children) {
                for (const child of i.children) {
                    const c = child as any;
                    if (c.path && pathname.startsWith(c.path)) {
                         const isExact = pathname === c.path;
                         const crumbs = [{ label: group.label }, { label: item.label }, { label: c.label, active: isExact }];
                         if (!isExact) crumbs.push({ label: 'Details', active: true });
                         return crumbs;
                    }
                }
            }
        }
    }
    return [{ label: 'Overview', active: true }];
};