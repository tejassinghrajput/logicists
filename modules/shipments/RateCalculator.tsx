import React, { useState } from 'react';
import { CalculationForm } from './components/CalculationForm';
import { ResultsView } from './components/ResultsView';

export const RateCalculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-12 pb-24">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Instant Rate Quote</h1>
        <p className="text-slate-500 font-bold text-lg">Compare global shipping costs across your connected carriers.</p>
      </div>
      <div className="space-y-16">
        <CalculationForm onCalculate={handleCalculate} loading={loading} />
        <div className="px-2"><ResultsView done={done} loading={loading} /></div>
      </div>
    </div>
  );
};