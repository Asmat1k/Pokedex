import type { PokemonInterface, PokemonsListInterface } from './api';

interface PokemonTransportInterface {
  fetchPokemon(id: string): Promise<PokemonsListInterface | PokemonInterface | null>;
}

export { PokemonTransportInterface };
