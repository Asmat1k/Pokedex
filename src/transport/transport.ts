import type { PokemonTransportInterface } from '@/model/transport/transport';

class PokemonTransport implements PokemonTransportInterface {
  private readonly URL = 'https://pokeapi.co/api/v2/pokemon';
  private static instance: PokemonTransport;

  constructor() {
    if (PokemonTransport.instance) {
      return PokemonTransport.instance;
    }
    PokemonTransport.instance = this;
  }

  getCurUrl(): string {
    return this.URL;
  }

  async fetchPokemon(baseUrl = this.URL) {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        throw new Error('Не удалось отправить запрос, проверьте url');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Ошибка при запросе покемонов - ${error}`);
      return null;
    }
  }
}

export { PokemonTransport };
