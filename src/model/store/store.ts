interface CatchedPokemonStoreInterface {
  get capturedPokemonsInfo(): Array<{ id: number; date: string }>;
  get capturedPokemonsCount(): number;
  getPokemonCatchDate(id: number): string;
  catchPokemon(id: number): void;
  isPokemonCatched(id: number): boolean;
}

export { CatchedPokemonStoreInterface };
