interface CatchedPokemonStoreInterface {
  getCapturedPokemonsInfo(): Array<{ id: number; date: string }>;
  getCapturedPokemonsCount(): number;
  getPokemonCatchDate(id: number): string;
  catchPokemon(id: number): void;
  isPokemonCatched(id: number): boolean;
}

export { CatchedPokemonStoreInterface };
