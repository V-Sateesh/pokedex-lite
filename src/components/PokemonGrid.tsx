import React from 'react';
import { Pokemon } from '../types';
import PokemonCard from './PokemonCard';

interface Props {
  pokemons: Pokemon[];
  isFavorite: (name: string) => boolean;
  onToggleFavorite: (name: string) => void;
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonGrid: React.FC<Props> = ({
  pokemons,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  if (!pokemons.length) {
    return (
      <div className="text-center text-sm text-gray-500 mt-6">
        No Pokémon found.
      </div>
    );
  }

  return (
    <div
      className="grid gap-4 mt-4
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6"
    >
      {pokemons.map((p) => (
        <PokemonCard
          key={p.name}
          pokemon={p}
          isFavorite={isFavorite(p.name)}
          onToggleFavorite={() => onToggleFavorite(p.name)}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
