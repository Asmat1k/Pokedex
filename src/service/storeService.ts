import type { StoreServiceInterface } from '@/model/service/storeService';
import type { PokemonsListInterface } from '@/model/transport/api';
import { CatchedPokemonStore } from '@/store/store';

class StoreService implements StoreServiceInterface {
  private static instance: StoreService;
  private store: CatchedPokemonStore;

  constructor(newStore: CatchedPokemonStore) {
    if (StoreService.instance) {
      return StoreService.instance;
    }
    StoreService.instance = this;
    this.store = newStore;
  }

  catchPokemon(id: number): void {
    this.store.catchPokemon(id);
  }

  checkPokemon(id: number): boolean {
    return this.store.isPokemonCatched(id);
  }

  getPokemonCatchDate(id: number): string {
    return this.store.getPokemonCatchDate(id);
  }

  generatePokemonListFromStore(start: number, limit: number): PokemonsListInterface {
    const resultObj: PokemonsListInterface = { results: [] };
    const capturedPokemons = this.store.capturedPokemonsInfo;
    const paginatedPokemons = capturedPokemons.slice(start, start + limit);

    for (const item of paginatedPokemons) {
      resultObj.results.push({ url: `https://pokeapi.co/api/v2/pokemon/${item.id}` });
    }
    return resultObj;
  }

  get totalPokemonsCount(): number {
    return this.store.capturedPokemonsCount;
  }
}

const storeService = new StoreService(new CatchedPokemonStore());

export { storeService };
