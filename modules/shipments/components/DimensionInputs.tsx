import React from 'react';
import { Input, Select } from '../../../common/components/Shared';
import { DIMENSION_UNITS } from '../../../mockData/dimensionUnits';

interface Props { 
  values: { l: string; b: string; h: string; unit: string };
  onChange: (key: string, val: any) => void;
}

export const DimensionInputs: React.FC<Props> = ({ values, onChange }) => {
  const fields = [
    { k: 'l', l: 'Length', i: 'Longest side of the parcel.' },
    { k: 'b', l: 'Width', i: 'Horizontal width of the parcel.' },
    { k: 'h', l: 'Height', i: 'Vertical height of the parcel.' }
  ] as const;

  return (
    <>
      {fields.map((f) => (
        <div key={f.k} className="w-full">
          <Input
            label={f.l} info={f.i} placeholder="0" type="number"
            value={(values as any)[f.k]} unit={values.unit}
            onChange={(e) => onChange(f.k, e.target.value)}
            className="text-center" required
          />
        </div>
      ))}
      <div className="w-full">
        <Select label="Unit" options={DIMENSION_UNITS} value={values.unit} onChange={(v) => onChange('unit', v)} />
      </div>
    </>
  );
};