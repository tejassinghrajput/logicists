import React, { useState } from 'react';
import { Mail, Send, ArrowLeft, Loader2 } from 'lucide-react';
import { Button, Input, useToast } from '../../../common/components/Shared';

export const ResetPasswordForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { 
        setLoading(false); 
        toast.success("Reset Link Sent", { description: "Check your email for instructions." });
        onBack();
    }, 1500);
  };

  return (
    <>
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Reset Password</h1><p className="text-slate-500 mt-2">Enter your email for reset instructions.</p></div>
      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
        <Input label="Email Address" type="email" icon={Mail} placeholder="name@company.com" required />
        <Button type="submit" fullWidth className="py-3">
            {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <span className="flex items-center">Send Reset Link <Send className="w-4 h-4 ml-2"/></span>}
        </Button>
        <div className="text-center pt-2">
            <button type="button" onClick={onBack} className="text-sm font-medium text-slate-500 hover:text-brand-600 flex items-center justify-center mx-auto transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Sign In
            </button>
        </div>
      </form>
    </>
  );
};