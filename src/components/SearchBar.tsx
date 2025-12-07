import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    className="w-full md:w-80 px-3 py-2 rounded-md border border-gray-300 text-sm"
    placeholder="Search Pokémon by name..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
