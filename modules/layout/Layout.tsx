
import React, { useState, useEffect } from 'react';
import { ViewState } from '../../common/types';
import { MOCK_NOTIFICATIONS } from '../../mockData/notifications';
import { DesktopSidebar } from './components/DesktopSidebar';
import { Header } from './components/Header';
import { NAV_GROUPS } from './config';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(true); 
  const [isHovered, setIsHovered] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({ 'ops_parent': true, 'fin_parent': true });

  useEffect(() => {
    const savedPin = localStorage.getItem('logiflow_sidebar_pinned');
    if (savedPin !== null) setIsPinned(JSON.parse(savedPin));
  }, []);

  const togglePin = () => {
    const newState = !isPinned;
    setIsPinned(newState);
    localStorage.setItem('logiflow_sidebar_pinned', JSON.stringify(newState));
  };

  return (
    <div className="flex h-screen bg-surface-50 overflow-hidden font-sans">
      <DesktopSidebar 
          navGroups={NAV_GROUPS} 
          currentView={currentView} 
          onNavigate={onNavigate} 
          isExpanded={isPinned || isHovered} 
          isPinned={isPinned} 
          togglePin={togglePin}
          openParents={openParents}
          toggleParent={(id) => setOpenParents(p => ({...p, [id]: !p[id]}))}
          onHover={setIsHovered}
      />
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 md:ml-20 ${(isPinned || isHovered) ? 'md:ml-72' : ''}`}>
        
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-50/50 via-surface-50/30 to-surface-50"></div>
             <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[100px]"></div>
             <div className="absolute top-[20%] left-[-100px] w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-[80px]"></div>
        </div>

        <Header 
            onMobileMenuOpen={() => setIsMobileMenuOpen(true)} 
            onNavigate={onNavigate} 
            onLogout={onLogout} 
            unreadCount={MOCK_NOTIFICATIONS.filter(n => !n.read).length} 
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10 scroll-smooth relative">
          <div className="w-full space-y-8 animate-fade-in pb-10">{children}</div>
        </main>
      </div>
    </div>
  );
};
