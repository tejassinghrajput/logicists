import React, { useState } from 'react';
import { Package, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button, Input } from './Shared';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@logiflow.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-600 mb-4 shadow-lg shadow-brand-200">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome to LogiFlow</h1>
          <p className="text-slate-500 mt-2">Enterprise Logistics Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Work Email" 
            type="email" 
            icon={Mail} 
            placeholder="name@company.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-500">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                className="block w-full rounded-lg border-slate-300 border bg-white shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2.5 pl-10"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-3" 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <span className="flex items-center justify-center">
                Sign In <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account? <a href="#" className="font-medium text-brand-600 hover:text-brand-500">Contact Sales</a>
          </p>
        </div>
      </div>
    </div>
  );
};
