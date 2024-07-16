import type { PaginationServiceInterface } from '@/model/service/paginationService';
import type { PokemonsListInterface } from '@/model/transport/api';
import { PokemonTransport } from '@/transport/transport';

class PaginationService implements PaginationServiceInterface {
  private pokemonAPI: PokemonTransport;
  currentPage: number;
  nextUrl: string;
  previousUrl: string;

  constructor(pokemonTransport: PokemonTransport) {
    this.pokemonAPI = pokemonTransport;
  }

  init(currentPage = 1, pokemonList: PokemonsListInterface): void {
    this.currentPage = currentPage;
    this.updateUrls(pokemonList);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  canGoNext(): boolean {
    return !!this.nextUrl;
  }

  canGoPrev(): boolean {
    return !!this.previousUrl;
  }

  async nextPage(): Promise<PokemonsListInterface | null> {
    return await this.changePage(this.nextUrl, 1);
  }

  async prevPage(): Promise<PokemonsListInterface | null> {
    return await this.changePage(this.previousUrl, -1);
  }

  private async changePage(url: string, pageIncrement: number): Promise<PokemonsListInterface | null> {
    if (url) {
      this.currentPage += pageIncrement;
      const pokemonList = await this.pokemonAPI.fetchPokemon(url);
      if (pokemonList) {
        this.updateUrls(pokemonList);
        return pokemonList;
      }
      this.currentPage -= pageIncrement;
      return null;
    }
    return null;
  }

  private updateUrls(pokemonList: PokemonsListInterface): void {
    this.nextUrl = pokemonList.next || '';
    this.previousUrl = pokemonList.previous || '';
  }
}

const paginationService = new PaginationService(new PokemonTransport());

export { paginationService };
