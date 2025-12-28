import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from '../../../common/components/Shared';

export type NavItem = { id: string; label: string; icon?: React.ElementType; path?: string; children?: NavItem[]; };
interface SidebarItemProps { item: NavItem; isExpanded: boolean; isOpen: boolean; onToggle: (id: string) => void; depth?: number; onLinkClick?: () => void; }

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, isExpanded, isOpen, onToggle, depth = 0, onLinkClick }) => {
  const loc = useLocation();
  const isLeaf = !item.children;
  // Dashboard path '/' needs exact match, others can use prefix matching if they are parent categories
  const isActive = item.path === '/' 
    ? loc.pathname === '/' 
    : (isLeaf ? loc.pathname === item.path : (item.path && loc.pathname.startsWith(item.path)));
  
  const hasActiveChild = item.children?.some(c => c.path && loc.pathname.startsWith(c.path));
  const pad = isExpanded ? (depth === 0 ? 'px-3' : 'pl-11 pr-3') : 'px-0 justify-center';

  if (item.children) {
    return (
      <div className="mb-1">
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); if(isExpanded) onToggle(item.id); }} className={`w-full flex items-center py-2.5 rounded-xl transition-all duration-200 group ${hasActiveChild ? 'text-white bg-white/5 shadow-inner' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'} ${pad}`}>
          <div className="flex items-center min-w-0 justify-center">
            {item.icon && <item.icon className={`w-5 h-5 flex-shrink-0 ${hasActiveChild ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} />}
            <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'opacity-0 w-0 ml-0' : 'opacity-100 ml-3'}`}>{item.label}</span>
          </div>
          {isExpanded && <ChevronRight className={`ml-auto w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90 text-brand-400' : 'text-slate-600'}`} />}
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen && isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
          {item.children.map(child => <SidebarItem key={child.id} item={child} isExpanded={isExpanded} isOpen={false} onToggle={onToggle} depth={depth + 1} onLinkClick={onLinkClick} />)}
        </div>
      </div>
    );
  }

  const btn = (
    <Link to={item.path || '#'} onClick={onLinkClick} className={`flex items-center py-2.5 mb-1 rounded-xl transition-all duration-200 group relative ${isActive ? 'bg-brand-600 shadow-glow text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${pad}`}>
      {item.icon && <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />}
      <span className={`font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ${!isExpanded ? 'opacity-0 w-0 ml-0' : 'opacity-100 ml-3'}`}>{item.label}</span>
    </Link>
  );
  return !isExpanded ? <Tooltip content={item.label} position="right">{btn}</Tooltip> : btn;
};