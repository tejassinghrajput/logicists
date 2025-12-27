
import React, { useState } from 'react';
import { Package, Lock, Mail, ArrowRight, Loader2, User, Phone, Check } from 'lucide-react';
import { Button, Input, useToast } from '../../common/components/Shared';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  // Login State
  const [email, setEmail] = useState('demo@logiflow.com');
  const [password, setPassword] = useState('password');

  // Register State
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    terms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering && !regData.terms) {
        toast.error("Terms Required", { description: "Please accept the terms and conditions to continue." });
        return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const toggleMode = () => {
      setIsRegistering(!isRegistering);
      // Reset sensitive fields if needed, or keep for UX
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-24 animate-fade-in overflow-y-auto">
        <div className="w-full max-w-sm my-auto">
            <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">LogiFlow</span>
            </div>
            
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {isRegistering ? 'Create an account' : 'Welcome back'}
                </h1>
                <p className="text-slate-500 mt-2">
                    {isRegistering ? 'Start your 14-day free trial. No credit card required.' : 'Enter your credentials to access the portal.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {isRegistering && (
                    <div className="grid grid-cols-2 gap-4 animate-slide-up">
                        <Input 
                            label="First Name" 
                            icon={User} 
                            placeholder="Alex" 
                            required 
                            value={regData.firstName}
                            onChange={(e) => setRegData({...regData, firstName: e.target.value})}
                        />
                        <Input 
                            label="Last Name" 
                            placeholder="Morgan" 
                            required 
                            value={regData.lastName}
                            onChange={(e) => setRegData({...regData, lastName: e.target.value})}
                        />
                    </div>
                )}

                <Input 
                    label="Email Address" 
                    type="email" 
                    icon={Mail} 
                    placeholder="name@company.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {isRegistering && (
                    <div className="animate-slide-up">
                        <Input 
                            label="Phone Number" 
                            type="tel" 
                            icon={Phone} 
                            placeholder="+1 (555) 000-0000" 
                            required 
                            value={regData.phone}
                            onChange={(e) => setRegData({...regData, phone: e.target.value})}
                        />
                    </div>
                )}
                
                <div>
                    {!isRegistering && (
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700 ml-0.5">Password</label>
                            <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-500 hover:underline">Forgot password?</a>
                        </div>
                    )}
                    {isRegistering && <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">Password</label>}
                    
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                            <Lock className="h-5 w-5" />
                        </div>
                        <input
                            type="password"
                            className="block w-full rounded-xl border-slate-200 bg-slate-50/50 shadow-sm focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-900 sm:text-sm py-2.5 pl-10 transition-all duration-200 placeholder:text-slate-400"
                            placeholder={isRegistering ? "Create a strong password" : "••••••••"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isRegistering && <p className="text-[10px] text-slate-500 mt-1 ml-1">Must be at least 8 characters.</p>}
                </div>

                {isRegistering && (
                    <div className="flex items-start animate-slide-up">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={regData.terms}
                                onChange={(e) => setRegData({...regData, terms: e.target.checked})}
                                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-slate-700 cursor-pointer">
                                I agree to the <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
                            </label>
                        </div>
                    </div>
                )}

                <Button 
                    type="submit" 
                    className="w-full py-3 text-base shadow-lg shadow-brand-500/25 mt-2" 
                    disabled={isLoading}
                    fullWidth
                >
                    {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                    <span className="flex items-center justify-center">
                        {isRegistering ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                    )}
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={toggleMode} className="font-semibold text-brand-600 hover:text-brand-500 transition-colors hover:underline">
                        {isRegistering ? 'Sign In' : 'Create one now'}
                    </button>
                </p>
            </div>
        </div>
      </div>

      {/* Right Side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-slate-900/90"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-24 h-full text-white">
            <div className="flex justify-end">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
                    Enterprise Edition v2.4
                </div>
            </div>
            
            <div className="max-w-md">
                <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mb-8 shadow-glow">
                    <Package className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
                    {isRegistering ? 'Join thousands of logistics leaders' : 'Streamline your global supply chain'}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                    {isRegistering 
                        ? 'Get instant access to advanced analytics, real-time tracking, and automated workflows.' 
                        : 'Advanced analytics, real-time tracking, and automated workflows designed for modern logistics teams.'}
                </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
                <span>© 2023 LogiFlow Inc.</span>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
        </div>
      </div>
    </div>
  );
};
