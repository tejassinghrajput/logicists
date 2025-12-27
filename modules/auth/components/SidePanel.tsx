import React from 'react';
import { Package } from 'lucide-react';
import { AuthMode } from '../types';

export const SidePanel: React.FC<{ mode: AuthMode }> = ({ mode }) => {
  const config = {
    login: { t: 'Streamline your global supply chain', d: 'Advanced analytics, real-time tracking, and automated workflows designed for modern logistics teams.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
    register: { t: 'Join thousands of logistics leaders', d: 'Get instant access to advanced analytics, real-time tracking, and automated workflows.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' },
    forgot_password: { t: 'Secure & Reliable', d: 'We use industry-standard encryption to keep your account and data safe at all times.', img: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80' }
  }[mode];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden transition-all duration-500">
      <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-all duration-700" style={{ backgroundImage: `url('${config.img}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-slate-900/90"></div>
      <div className="relative z-10 flex flex-col justify-between p-24 h-full text-white animate-fade-in">
        <div className="flex justify-end"><div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">Enterprise Edition v2.4</div></div>
        <div className="max-w-md">
           <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mb-8 shadow-glow"><Package className="w-8 h-8 text-white" /></div>
           <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">{config.t}</h2>
           <p className="text-lg text-slate-300 leading-relaxed">{config.d}</p>
        </div>
        <div className="flex items-center space-x-6 text-sm text-slate-400"><span>© 2023 LogiFlow Inc.</span><a href="#" className="hover:text-white">Privacy</a><a href="#" className="hover:text-white">Terms</a></div>
      </div>
    </div>
  );
};