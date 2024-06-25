import type { PokemonsListInterface } from '../transport/api';

interface PaginationServiceInterface {
  currentPage: number;
  nextUrl: string;
  previousUrl: string;

  init(currentPage: number, pokemonList: PokemonsListInterface): void;
  getCurrentPage(): number;
  canGoNext(): boolean;
  canGoPrev(): boolean;
  nextPage(): Promise<PokemonsListInterface | null>;
  prevPage(): Promise<PokemonsListInterface | null>;
}

export { PaginationServiceInterface };
