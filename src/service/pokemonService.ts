import type { PokemonServiceInterface } from '@/model/service/pokemonService';
import type { PokemonsListInterface, PokemonInterface } from '@/model/transport/api';
import { PokemonTransport } from '@/transport/transport';

class PokemonService implements PokemonServiceInterface {
  private static instance: PokemonService;
  private pokemonAPI: PokemonTransport;

  constructor(pokemonTransport: PokemonTransport) {
    if (PokemonService.instance) {
      return PokemonService.instance;
    }
    this.pokemonAPI = pokemonTransport;
    PokemonService.instance = this;
  }

  async getPokemonList(url?: string): Promise<PokemonsListInterface> {
    return await this.pokemonAPI.fetchPokemon(url);
  }

  async getOnePokemon(url: string): Promise<PokemonInterface> {
    return await this.pokemonAPI.fetchPokemon(url);
  }

  async getPokemonIdByName(name: string): Promise<number | null> {
    const baseUrl = this.pokemonAPI.getCurUrl();
    const pokemonInfo: PokemonInterface = await this.pokemonAPI.fetchPokemon(
      `${baseUrl}/${name.toLowerCase()}`
    );
    if (!pokemonInfo) return null;
    return pokemonInfo.id;
  }

  async getPokemonByParam(param: number | string): Promise<PokemonInterface | null> {
    const baseUrl = this.pokemonAPI.getCurUrl();
    const pokemonInfo = await this.pokemonAPI.fetchPokemon(`${baseUrl}/${param}`.toLowerCase());
    return pokemonInfo || null;
  }
}

const pokemonService = new PokemonService(new PokemonTransport());

export { pokemonService };
