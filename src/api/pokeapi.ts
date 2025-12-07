import {
  PokemonListResponse,
  TypeListResponse,
  TypeDetailResponse,
  Pokemon,
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchPokemonPage(limit: number, offset: number) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return handleResponse<PokemonListResponse>(res);
}

export async function fetchPokemonByName(name: string) {
  const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  return handleResponse<Pokemon>(res);
}

export async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  return handleResponse<TypeListResponse>(res);
}

export async function fetchTypeDetail(typeName: string) {
  const res = await fetch(`${BASE_URL}/type/${typeName.toLowerCase()}`);
  return handleResponse<TypeDetailResponse>(res);
}
