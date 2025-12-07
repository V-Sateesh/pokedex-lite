import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<Props> = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const img =
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full mx-4 rounded-2xl shadow-xl p-4 md:p-6 relative">
        <button
          className="absolute top-3 right-3 text-lg"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col items-center">
            {img && (
              <img
                src={img}
                alt={pokemon.name}
                className="w-40 h-40 object-contain"
              />
            )}
            <h2 className="mt-2 text-xl font-bold capitalize">
              {pokemon.name} <span className="text-gray-400">#{pokemon.id}</span>
            </h2>
            <div className="mt-2 flex gap-2 flex-wrap justify-center">
              {pokemon.types.map((t) => (
                <span
                  key={t.slot}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Height: {pokemon.height} · Weight: {pokemon.weight}
            </p>
          </div>

          <div className="flex-1 text-sm">
            <h3 className="font-semibold mb-1">Stats</h3>
            <ul className="space-y-1">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name} className="flex gap-2 items-center">
                  <span className="capitalize w-24 text-xs text-gray-600">
                    {s.stat.name}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-400"
                      style={{ width: `${Math.min(s.base_stat, 150) / 1.5}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs">{s.base_stat}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4 mb-1">Abilities</h3>
            <ul className="flex flex-wrap gap-1">
              {pokemon.abilities.map((a) => (
                <li
                  key={a.ability.name}
                  className="px-2 py-0.5 bg-gray-100 rounded-full text-xs capitalize"
                >
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
