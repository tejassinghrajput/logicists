import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileSidebar } from './components/MobileSidebar';
import { Header } from './components/Header';
import { Breadcrumbs } from '../../common/components/Shared';
import { NAV_GROUPS } from './config';
import { getBreadcrumbs } from './utils/breadcrumbs';

export const Layout: React.FC<any> = ({ onLogout, children, notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(true); 
  const [isHovered, setIsHovered] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});
  
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    NAV_GROUPS.forEach(g => {
      const found = g.items.find((item: any) => 
        item.children?.some((c: any) => loc.pathname.startsWith(c.path))
      );
      if (found) setOpenParents({ [found.id]: true });
    });
  }, [loc.pathname]);

  useEffect(() => { const s = localStorage.getItem('logiflow_pin'); if (s !== null) setIsPinned(JSON.parse(s)); }, []);
  const togglePin = () => { setIsPinned(!isPinned); localStorage.setItem('logiflow_pin', JSON.stringify(!isPinned)); };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DesktopSidebar navGroups={NAV_GROUPS} isExpanded={isPinned || isHovered} isPinned={isPinned} togglePin={togglePin} openParents={openParents} toggleParent={(id) => setOpenParents({ [id]: !openParents[id] })} onHover={setIsHovered} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navGroups={NAV_GROUPS} onLogout={onLogout} />
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 md:ml-20 ${(isPinned || isHovered) ? 'md:ml-72' : ''}`}>
        <div className="absolute inset-0 z-0 pointer-events-none bg-slate-50">
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-modern-violet/10 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-modern-sky/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
        <Header onMobileMenuOpen={() => setIsMobileMenuOpen(true)} onLogout={onLogout} notifications={notifications} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10 relative">
            <div className="w-full space-y-6 animate-fade-in pb-10">
                {loc.pathname !== '/' && <Breadcrumbs items={getBreadcrumbs(loc.pathname)} onHome={() => navigate('/')} />}
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};