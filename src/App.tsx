import React, { useEffect, useMemo, useState } from 'react';
import {
  fetchPokemonByName,
  fetchPokemonPage,
  fetchTypeDetail,
  fetchTypes,
} from './api/pokeapi';
import { Pokemon, PokemonTypeSummary } from './types';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import Pagination from './components/Pagination';
import PokemonGrid from './components/PokemonGrid';
import PokemonDetailModal from './components/PokemonDetailModal';
import { useFavorites } from './hooks/useFavorites';

const PAGE_SIZE = 20;

type Mode = 'all' | 'type';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [types, setTypes] = useState<PokemonTypeSummary[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [allTypePokemons, setAllTypePokemons] = useState<Pokemon[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Load types once
  useEffect(() => {
    fetchTypes()
      .then((res) => setTypes(res.results))
      .catch(() => {
        // silently ignore on initial load
      });
  }, []);

  // Load "all" mode page from API (paginated)
  useEffect(() => {
    if (mode !== 'all') return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (page - 1) * PAGE_SIZE;
        const list = await fetchPokemonPage(PAGE_SIZE, offset);

        const details = await Promise.all(
          list.results.map((item) => fetchPokemonByName(item.name))
        );

        setPokemons(details);
        setTotalPages(Math.ceil(list.count / PAGE_SIZE));
      } catch (e) {
        setError('Failed to load Pokémon. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mode, page]);

  // When type changes, load all Pokémon for that type once and paginate client-side
  useEffect(() => {
    if (!selectedType) {
      setMode('all');
      setPage(1);
      return;
    }

    setMode('type');
    setPage(1);

    const loadByType = async () => {
      setLoading(true);
      setError(null);
      try {
        const typeDetail = await fetchTypeDetail(selectedType);
        const entries = typeDetail.pokemon.slice(0, 300); // soft cap

        const details = await Promise.all(
          entries.map((entry) => fetchPokemonByName(entry.pokemon.name))
        );

        setAllTypePokemons(details);
        setTotalPages(Math.ceil(details.length / PAGE_SIZE));
      } catch (e) {
        setError('Failed to load Pokémon for this type.');
      } finally {
        setLoading(false);
      }
    };

    loadByType();
  }, [selectedType]);

  // Filter by search (current source list)
  const visiblePokemons = useMemo(() => {
    const source = mode === 'all' ? pokemons : allTypePokemons;

    const filtered = search
      ? source.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase().trim())
        )
      : source;

    if (mode === 'all') {
      // server-paginated already
      return filtered;
    }

    // client-side pagination for type mode
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [mode, pokemons, allTypePokemons, search, page]);

  // Recompute total pages when searching in type mode
  useEffect(() => {
    if (mode === 'type') {
      const filteredCount = search
        ? allTypePokemons.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase().trim())
          ).length
        : allTypePokemons.length;
      setTotalPages(Math.max(1, Math.ceil(filteredCount / PAGE_SIZE)));
      setPage(1);
    }
  }, [search, mode, allTypePokemons]);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-red-500 text-white py-3 px-4 md:px-8 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Pokédex Lite</h1>
            <p className="text-xs text-red-50">
              Browse, search, filter, and favorite Pokémon.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onChange={setSelectedType}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Mode:{' '}
            <strong className="capitalize">
              {mode === 'all' ? 'All Pokémon' : `${selectedType} type`}
            </strong>
          </span>
          <span>Favorites: {favorites.length}</span>
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin h-8 w-8 rounded-full border border-gray-300 border-t-red-500" />
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 text-sm px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <PokemonGrid
              pokemons={visiblePokemons}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onSelect={(p) => setSelectedPokemon(p)}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      </main>
    </div>
  );
};

export default App;
