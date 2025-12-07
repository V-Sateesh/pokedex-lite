import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const PokemonCard: React.FC<Props> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
}) => {
  const img =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default;

  return (
    <div
      className="bg-white rounded-xl shadow-md p-3 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs text-gray-500">#{pokemon.id}</span>
        <button
          className="text-xl"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label="Toggle favorite"
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      {img && (
        <img
          src={img}
          alt={pokemon.name}
          className="w-full aspect-square object-contain mb-2"
        />
      )}

      <div className="text-sm font-semibold capitalize mb-1 text-center">
        {pokemon.name}
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {pokemon.types.map((t) => (
          <span
            key={t.slot}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
