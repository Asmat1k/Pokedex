import type { PokemonInterface, PokemonsListInterface } from '../transport/api';

interface PokemonServiceInterface {
  getPokemonList(url?: string): Promise<PokemonsListInterface>;
  getOnePokemon(url: string): Promise<PokemonInterface>;
  getPokemonIdByName(name: string): Promise<number | null>;
  getPokemonByParam(param: string | number): Promise<PokemonInterface | null>;
}

export { PokemonServiceInterface };
