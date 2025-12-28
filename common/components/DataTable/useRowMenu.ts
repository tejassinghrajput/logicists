import React, { useState, useEffect } from 'react';
import { RowAction } from './types';

export function useRowMenu<T>() {
    const [menu, setMenu] = useState<{ x: number, y: number, items: any[], isOpen: boolean, origin: string } | null>(null);
    
    useEffect(() => {
        const close = () => setMenu(null);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => { window.removeEventListener('scroll', close, true); window.removeEventListener('resize', close); };
    }, []);

    // Explicitly using React.MouseEvent requires React in scope
    const open = (e: React.MouseEvent, actions: RowAction<T>[], item: T) => {
        e.stopPropagation(); e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const w = 192; const h = (actions.length * 40) + 16;
        const vw = window.innerWidth; const vh = window.innerHeight;
        
        let x = rect.right - w;
        let ox = 'right';
        if (x < 10) { x = rect.left; ox = 'left'; }
        if (x + w > vw) x = vw - w - 10;

        let y = rect.bottom + 6;
        let oy = 'top';
        if (y + h > vh - 10) { y = rect.top - h - 6; oy = 'bottom'; }
        
        setMenu({ 
            x, y, origin: `origin-${oy}-${ox}`, isOpen: true,
            items: actions.map(a => ({ label: a.label, icon: a.icon, variant: a.variant, onClick: () => a.onClick(item) }))
        });
    };
    return { menu, setMenu, open };
}