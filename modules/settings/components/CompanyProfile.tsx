
import React, { useState } from 'react';
import { Card, Button, Input, Select, useToast } from '../../../common/components/Shared';
import { Building2, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          toast.success('Business Profile Saved', { description: 'Your company details have been updated.' });
      }, 800);
  };

  return (
    <Card title="Business Identity" subtitle="Manage your public vendor profile and business information.">
        <div className="flex flex-col xl:flex-row gap-8 mt-2">
            <div className="flex flex-col items-center space-y-4 min-w-[200px]">
                <div className="h-32 w-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:border-brand-500 hover:bg-brand-50/10 cursor-pointer transition-all group">
                    <Building2 className="w-8 h-8 text-slate-400 group-hover:text-brand-500 transition-colors mb-2" />
                    <span className="text-xs text-slate-400 group-hover:text-brand-600 font-medium">Upload Logo</span>
                </div>
                <div className="text-center">
                    <p className="text-xs text-slate-400">Recommended: 400x400px</p>
                    <p className="text-xs text-slate-400">Max size: 2MB</p>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2"><Input label="Legal Business Name" defaultValue="Logistics Pro Solutions LLC" icon={Building2} placeholder="e.g. Acme Logistics Inc." /></div>
                <Input label="Tax ID / EIN" defaultValue="US-88392102" icon={FileText} />
                <Select label="Business Type" options={[{ label: 'LLC', value: 'llc' }, { label: 'Corporation', value: 'corp' }, { label: 'Sole Proprietorship', value: 'sole_prop' }]} defaultValue="llc"/>
                <Input label="Business Email" defaultValue="support@logisticspro.com" icon={Mail} />
                <Input label="Support Phone" defaultValue="+1 (800) 555-0199" icon={Phone} />
                <div className="md:col-span-2"><Input label="Website" defaultValue="https://logisticspro.com" icon={Globe} placeholder="https://" /></div>
                <div className="md:col-span-2"><Input label="Headquarters Address" defaultValue="1200 Logistics Way, San Francisco, CA 94103" icon={MapPin} /></div>
                
                <div className="md:col-span-2 flex justify-end pt-4 border-t border-slate-50">
                    <Button variant="primary" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Business Profile'}</Button>
                </div>
            </div>
        </div>
    </Card>
  );
};
