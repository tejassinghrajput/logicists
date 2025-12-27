import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '../../common/types';
import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileSidebar } from './components/MobileSidebar';
import { Header } from './components/Header';
import { Breadcrumbs } from '../../common/components/Shared';
import { NAV_GROUPS } from './config';
import { getBreadcrumbs } from './utils/breadcrumbs';

interface LayoutProps {
  onLogout: () => void; children: React.ReactNode; notifications: Notification[];
  onMarkAsRead: (id: string) => void; onMarkAllAsRead: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onLogout, children, notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(true); 
  const [isHovered, setIsHovered] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({ 'ops_parent': true, 'fin_parent': true, 'settings_parent': true, 'channels_parent': true, 'notifications_parent': true });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { const s = localStorage.getItem('logiflow_pin'); if (s !== null) setIsPinned(JSON.parse(s)); }, []);
  const togglePin = () => { setIsPinned(!isPinned); localStorage.setItem('logiflow_pin', JSON.stringify(!isPinned)); };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <DesktopSidebar navGroups={NAV_GROUPS} isExpanded={isPinned || isHovered} isPinned={isPinned} togglePin={togglePin} openParents={openParents} toggleParent={(id) => setOpenParents(p => ({...p, [id]: !p[id]}))} onHover={setIsHovered} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navGroups={NAV_GROUPS} onLogout={onLogout} />
      
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 md:ml-20 ${(isPinned || isHovered) ? 'md:ml-72' : ''}`}>
        
        {/* Modern "Nebula Mesh" Background System */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-80"></div>
            
            {/* Color Orb 1: Violet (Anchor) - Top Left */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-modern-violet/20 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
            
            {/* Color Orb 2: Sky (Tech) - Top Right */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-modern-sky/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            
            {/* Color Orb 3: Fuchsia (Vibrancy) - Center Left */}
            <div className="absolute top-[40%] left-[-20%] w-[500px] h-[500px] bg-modern-fuchsia/15 rounded-full blur-[90px] mix-blend-multiply animate-pulse-slow"></div>
            
            {/* Color Orb 4: Teal (Freshness) - Bottom Right */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-modern-teal/15 rounded-full blur-[110px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            
            {/* Color Orb 5: Amber (Warmth) - Bottom Center Accent */}
            <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-modern-amber/10 rounded-full blur-[80px] mix-blend-multiply animate-drift"></div>

            {/* Noise Texture Overlay for Production Feel */}
            <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-soft-light"></div>
            
            {/* Glass Frosted Overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <Header onMobileMenuOpen={() => setIsMobileMenuOpen(true)} onLogout={onLogout} notifications={notifications} onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10 scroll-smooth relative">
            <div className="w-full space-y-6 animate-fade-in pb-10">
                {location.pathname !== '/' && <Breadcrumbs items={getBreadcrumbs(location.pathname)} onHome={() => navigate('/')} />}
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};