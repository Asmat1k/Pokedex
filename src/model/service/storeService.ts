import type { PokemonsListInterface } from '../transport/api';

interface StoreServiceInterface {
  catchPokemon(id: number): void;
  checkPokemon(id: number): boolean;
  getPokemonCatchDate(id: number): string;
  generatePokemonListFromStore(start: number, limit: number): PokemonsListInterface;
  getTotalPokemonsCount(): number;
}

export { StoreServiceInterface };
