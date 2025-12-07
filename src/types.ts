export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonTypeSummary {
  name: string;
  url: string;
}

export interface TypeListResponse {
  count: number;
  results: PokemonTypeSummary[];
}

export interface TypePokemonEntry {
  pokemon: {
    name: string;
    url: string;
  };
}

export interface TypeDetailResponse {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  height: number;
  weight: number;
}
