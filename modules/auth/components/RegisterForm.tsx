import React, { useState } from 'react';
import { User, Phone, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button, Input, useToast } from '../../../common/components/Shared';

export const RegisterForm: React.FC<{ onLogin: () => void; onSignIn: () => void }> = ({ onLogin, onSignIn }) => {
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!terms) return toast.error("Terms Required"); setLoading(true); setTimeout(() => { setLoading(false); onLogin(); }, 1500); };

  return (
    <>
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Create an account</h1><p className="text-slate-500 mt-2">Start your 14-day free trial.</p></div>
      <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
        <div className="grid grid-cols-2 gap-4"><Input label="First Name" icon={User} required /><Input label="Last Name" required /></div>
        <Input label="Email" type="email" icon={Mail} required /><Input label="Phone" type="tel" icon={Phone} required />
        <div className="space-y-1"><label className="text-sm font-semibold text-slate-700 ml-0.5">Password</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><Lock className="h-5 w-5"/></div><input type="password" className="block w-full rounded-xl border-slate-200 bg-slate-50/50 py-2.5 pl-10 sm:text-sm" required /></div></div>
        <div className="flex items-center"><input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="h-4 w-4 text-brand-600 rounded border-slate-300"/><span className="ml-3 text-sm text-slate-700">I agree to the <a href="#" className="text-brand-600">Terms</a>.</span></div>
        <Button type="submit" fullWidth className="py-3">{loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <span className="flex items-center">Create Account <ArrowRight className="w-4 h-4 ml-2"/></span>}</Button>
      </form>
      <div className="mt-6 pt-6 border-t border-slate-100 text-center"><p className="text-sm text-slate-500">Already have an account? <button onClick={onSignIn} className="font-semibold text-brand-600 hover:underline">Sign In</button></p></div>
    </>
  );
};