import { makeAutoObservable } from 'mobx';
import type { CatchedPokemonStoreInterface } from '@/model/store/store';

class CatchedPokemonStore implements CatchedPokemonStoreInterface {
  private static instance: CatchedPokemonStore;
  private capturedPokemons: Map<number, string>;

  constructor() {
    if (CatchedPokemonStore.instance) {
      return CatchedPokemonStore.instance;
    }
    CatchedPokemonStore.instance = this;
    if (localStorage.getItem('catchedPokemons')) {
      this.capturedPokemons = new Map(JSON.parse(localStorage.getItem('catchedPokemons')));
    } else {
      this.capturedPokemons = new Map();
    }
    makeAutoObservable(this);
    return this;
  }

  get capturedPokemonsInfo(): Array<{ id: number; date: string }> {
    return Array.from(this.capturedPokemons.entries()).map(([id, date]) => ({
      id,
      date
    }));
  }

  get capturedPokemonsCount(): number {
    return this.capturedPokemons.size;
  }

  getPokemonCatchDate(id: number): string {
    return this.capturedPokemons.get(id);
  }

  catchPokemon(id: number): void {
    const date = this.generateCurrentDate();
    this.capturedPokemons.set(id, date);
    localStorage.setItem('catchedPokemons', JSON.stringify(Array.from(this.capturedPokemons.entries())));
  }

  isPokemonCatched(id: number): boolean {
    return this.capturedPokemons.has(id);
  }

  private generateCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}

export { CatchedPokemonStore };
