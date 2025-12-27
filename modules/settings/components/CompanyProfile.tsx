import React, { useState } from 'react';
import { Card, EditableInput, EditableSelect, useToast } from '../../../common/components/Shared';
import { Building2, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

export const CompanyProfile: React.FC = () => {
  const { toast } = useToast();
  const [info, setInfo] = useState({
      name: 'Logistics Pro Solutions LLC', tax: 'US-88392102', type: 'llc',
      email: 'support@logisticspro.com', phone: '+1 (800) 555-0199', web: 'https://logisticspro.com',
      addr: '1200 Logistics Way, San Francisco, CA 94103'
  });

  const save = (k: string, v: string | number) => {
      setInfo(p => ({ ...p, [k]: v }));
      toast.success('Business Profile Updated');
  };

  return (
    <Card title="Business Identity" subtitle="Manage public vendor profile.">
        <div className="flex flex-col xl:flex-row gap-8 mt-2">
            <div className="flex flex-col items-center space-y-4 min-w-[200px]">
                <div className="h-32 w-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center hover:border-brand-500 hover:bg-brand-50/10 cursor-pointer transition-all group">
                    <Building2 className="w-8 h-8 text-slate-400 group-hover:text-brand-500 mb-2" />
                    <span className="text-xs text-slate-400 group-hover:text-brand-600 font-medium">Upload Logo</span>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2"><EditableInput label="Legal Business Name" value={info.name} onSave={v => save('name', v)} icon={Building2} /></div>
                <EditableInput label="Tax ID / EIN" value={info.tax} onSave={v => save('tax', v)} icon={FileText} />
                <EditableSelect label="Business Type" value={info.type} onSave={v => save('type', v)} options={[{label:'LLC',value:'llc'},{label:'Corporation',value:'corp'},{label:'Sole Prop',value:'sole'}]} />
                <EditableInput label="Business Email" value={info.email} onSave={v => save('email', v)} icon={Mail} />
                <EditableInput label="Support Phone" value={info.phone} onSave={v => save('phone', v)} icon={Phone} />
                <div className="md:col-span-2"><EditableInput label="Website" value={info.web} onSave={v => save('web', v)} icon={Globe} /></div>
                <div className="md:col-span-2"><EditableInput label="Headquarters Address" value={info.addr} onSave={v => save('addr', v)} icon={MapPin} /></div>
            </div>
        </div>
    </Card>
  );
};