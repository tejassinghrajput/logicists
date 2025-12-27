import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button, Input } from '../../../common/components/Shared';

interface Props { onLogin: () => void; onForgot: () => void; onRegister: () => void; }

export const LoginForm: React.FC<Props> = ({ onLogin, onForgot, onRegister }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };

  return (
    <>
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Welcome back</h1><p className="text-slate-500 mt-2">Enter your credentials to access the portal.</p></div>
      <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">
        <Input label="Email Address" type="email" icon={Mail} required defaultValue="demo@logiflow.com" />
        <div className="space-y-1.5">
           <div className="flex justify-between"><label className="text-sm font-semibold text-slate-700 ml-0.5">Password</label><button type="button" onClick={onForgot} className="text-xs font-medium text-brand-600 hover:underline">Forgot password?</button></div>
           <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><Lock className="h-5 w-5" /></div><input type="password" className="block w-full rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-brand-500/10 py-2.5 pl-10 sm:text-sm" required defaultValue="password" /></div>
        </div>
        <Button type="submit" fullWidth className="py-3 mt-2">{loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <span className="flex items-center">Sign In <ArrowRight className="w-4 h-4 ml-2"/></span>}</Button>
      </form>
      <div className="mt-8 pt-6 border-t border-slate-100 text-center"><p className="text-sm text-slate-500">Don't have an account? <button onClick={onRegister} className="font-semibold text-brand-600 hover:underline">Create one now</button></p></div>
    </>
  );
};