
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '../../common/types';
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

  // Fix: Explicitly cast the flattened items to any[] to bypass complex union inference errors
  useEffect(() => {
    const activeParent = (NAV_GROUPS.flatMap(g => g.items) as any[]).find(item => 
      item.children?.some((c: any) => c.path && loc.pathname.startsWith(c.path))
    );
    if (activeParent) setOpenParents({ [activeParent.id]: true });
  }, [loc.pathname]);

  useEffect(() => { const s = localStorage.getItem('logiflow_pin'); if (s !== null) setIsPinned(JSON.parse(s)); }, []);
  const togglePin = () => { setIsPinned(!isPinned); localStorage.setItem('logiflow_pin', JSON.stringify(!isPinned)); };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DesktopSidebar navGroups={NAV_GROUPS} isExpanded={isPinned || isHovered} isPinned={isPinned} togglePin={togglePin} openParents={openParents} toggleParent={(id) => setOpenParents({ [id]: !openParents[id] })} onHover={setIsHovered} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navGroups={NAV_GROUPS} onLogout={onLogout} />
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 md:ml-20 ${(isPinned || isHovered) ? 'md:ml-72' : ''}`}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-80"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-modern-violet/20 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-modern-sky/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute top-[40%] left-[-20%] w-[500px] h-[500px] bg-modern-fuchsia/15 rounded-full blur-[90px] mix-blend-multiply animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-modern-teal/15 rounded-full blur-[110px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-modern-amber/10 rounded-full blur-[80px] mix-blend-multiply animate-drift"></div>
            <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-soft-light"></div>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
        <Header onMobileMenuOpen={() => setIsMobileMenuOpen(true)} onLogout={onLogout} notifications={notifications} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10 scroll-smooth relative">
            <div className="w-full space-y-6 animate-fade-in pb-10">
                {loc.pathname !== '/' && <Breadcrumbs items={getBreadcrumbs(loc.pathname)} onHome={() => navigate('/')} />}
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};
