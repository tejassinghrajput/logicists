import React, { useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { Step1Addresses } from './Step1Addresses';
import { Step2OrderPackage } from './Step2OrderPackage';
import { Step3RatesPlace } from './Step3RatesPlace';

export const CreateOrder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ 
    seller: {}, buyer: {}, pickup: null, 
    order: { type: 'international', purpose: 'csb5' }, 
    pkg: { l: '', b: '', h: '', unit: 'cm' }, 
    items: [{ name: '', sku: '', hsn: '', weight: '', val: '', desc: '' }],
    courier: null 
  });

  const next = (patch: any) => { setData(p => ({ ...p, ...patch })); setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <StepIndicator current={step} />
      <div className="animate-slide-up">
        {step === 1 && <Step1Addresses data={data} onNext={next} />}
        {step === 2 && <Step2OrderPackage data={data} onNext={next} onBack={back} />}
        {step === 3 && <Step3RatesPlace data={data} onBack={back} />}
      </div>
    </div>
  );
};