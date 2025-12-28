import React from 'react';
import { Package, ChevronLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarItem, NavItem } from './SidebarItem';

interface DesktopSidebarProps {
    navGroups: { label: string; items: NavItem[] }[];
    isExpanded: boolean; isPinned: boolean; togglePin: () => void;
    openParents: Record<string, boolean>; toggleParent: (id: string) => void;
    onHover: (v: boolean) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ navGroups, isExpanded, isPinned, togglePin, openParents, toggleParent, onHover }) => (
    <aside className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-30 bg-slate-900 border-r border-slate-800 text-slate-400 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-[72px]'}`} onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
        <div className={`h-16 flex items-center flex-shrink-0 transition-all duration-300 ${isExpanded ? 'px-5 justify-between' : 'justify-center'}`}>
            <div className={`flex items-center overflow-hidden transition-all duration-300 ${isExpanded ? 'gap-3' : 'gap-0'}`}>
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-glow flex-shrink-0"><Package className="w-5 h-5 text-white" /></div>
                <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}><span className="font-bold text-base text-white tracking-tight">LogiFlow</span></div>
            </div>
            {isExpanded && <button onClick={togglePin} className="text-slate-500 hover:text-white transition-colors"><ChevronLeft className={`w-5 h-5 transition-transform ${isPinned ? '' : 'rotate-180'}`} /></button>}
        </div>
        <div className={`flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 ${isExpanded ? 'space-y-8' : 'space-y-4'}`}>
            {navGroups.map((group, idx) => (
                <div key={idx}>
                    {isExpanded && <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 animate-fade-in">{group.label}</div>}
                    <div className="space-y-0.5">{group.items.map(item => <SidebarItem key={item.id} item={item} isExpanded={isExpanded} isOpen={!!openParents[item.id]} onToggle={toggleParent} />)}</div>
                </div>
            ))}
        </div>
        <div className="p-3 border-t border-slate-800 bg-slate-900">
            <Link to="/settings/profile" className={`flex items-center w-full rounded-lg transition-all duration-200 group ${!isExpanded ? 'justify-center p-1' : 'hover:bg-slate-800 p-2'}`}>
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-violet-500 flex items-center justify-center text-white font-medium text-xs ring-2 ring-slate-900 group-hover:ring-slate-700 transition-all">AM</div>
                 <div className={`ml-3 text-left overflow-hidden transition-all duration-300 ${!isExpanded ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    <p className="text-sm font-medium text-white group-hover:text-brand-200">Alex Morgan</p><p className="text-xs text-slate-500">View Profile</p>
                 </div>
                 {isExpanded && <Settings className="w-4 h-4 ml-auto text-slate-600 group-hover:text-slate-400" />}
            </Link>
        </div>
    </aside>
);