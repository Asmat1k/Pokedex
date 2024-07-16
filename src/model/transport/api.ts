interface PokemonsListInterface {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<{ name?: string; url: string }>;
}

interface PokemonInterface {
  name: string;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
  id: number;
  types: Array<{ type: { name: string } }>;
}

enum CardsColors {
  bug = '#A8B820',
  dragon = '#7038F8',
  dark = '#4E4E4E',
  electric = '#F8D030',
  fairy = '#EE99AC',
  fighting = '#C03028',
  fire = '#F08030',
  flying = '#A890F0',
  grass = '#78C850',
  ground = '#E0C068',
  ghost = '#705898',
  ice = '#98D8D8',
  normal = '#A8A878',
  poison = '#A040A0',
  psychic = '#F85888',
  rock = '#B8A038',
  water = '#6890F0',
  steel = '#B8B8D0'
}

export { PokemonsListInterface, PokemonInterface, CardsColors };
