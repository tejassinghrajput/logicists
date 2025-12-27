import { NAV_GROUPS } from '../config';
import { ViewState } from '../../../common/types';
import { BreadcrumbItem } from '../../../common/components/Breadcrumbs/Breadcrumbs';

export const getBreadcrumbs = (view: ViewState): BreadcrumbItem[] => {
    for (const group of NAV_GROUPS) {
        for (const item of group.items) {
            if (item.view === view) return [{ label: group.label }, { label: item.label, active: true }];
            if (item.children) {
                for (const child of item.children) {
                    if (child.view === view) {
                        return [
                            { label: group.label },
                            { label: item.label },
                            { label: child.label, active: true }
                        ];
                    }
                }
            }
        }
    }
    return [{ label: 'Overview', active: true }];
};