import React from 'react';
import { PokemonTypeSummary } from '../types';

interface Props {
  types: PokemonTypeSummary[];
  selectedType: string | null;
  onChange: (type: string | null) => void;
}

const TypeFilter: React.FC<Props> = ({ types, selectedType, onChange }) => {
  return (
    <select
      className="px-3 py-2 rounded-md border border-gray-300 text-sm"
      value={selectedType ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">All types</option>
      {types.map((t) => (
        <option key={t.name} value={t.name}>
          {t.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
