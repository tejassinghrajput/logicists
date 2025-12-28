import React, { useState } from 'react';
import { X, Package, LogOut } from 'lucide-react';
import { NavItem, SidebarItem } from './SidebarItem';

interface Props {
    isOpen: boolean; onClose: () => void; navGroups: { label: string; items: NavItem[] }[]; onLogout: () => void;
}

export const MobileSidebar: React.FC<Props> = ({ isOpen, onClose, navGroups, onLogout }) => {
    const [openParents, setOpenParents] = useState<Record<string, boolean>>({});

    return (
        <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop: Closes menu when clicked */}
            <div 
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
                onClick={onClose} 
            />
            
            {/* Sidebar Container: Stops propagation so clicks inside don't trigger backdrop close */}
            <div 
                className={`fixed inset-y-0 left-0 w-72 bg-slate-900 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-white font-bold">
                        <div className="p-1 bg-brand-600 rounded"><Package className="w-5 h-5 text-white" /></div>
                        LogiFlow
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 h-[calc(100%-80px)]">
                    {navGroups.map((g, i) => (
                        <div key={i}>
                            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{g.label}</div>
                            {g.items.map(item => (
                                <SidebarItem 
                                    key={item.id} 
                                    item={item} 
                                    isExpanded={true} 
                                    isOpen={!!openParents[item.id]} 
                                    onToggle={(id) => setOpenParents(p => ({...p, [id]: !p[id]}))} 
                                    onLinkClick={onClose} // Pass onClose here so only links trigger it
                                />
                            ))}
                        </div>
                    ))}
                    <button onClick={onLogout} className="w-full flex items-center px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-900/20 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};