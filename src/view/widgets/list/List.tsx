import { observer } from 'mobx-react-lite';
import type { FC, ReactElement } from 'react';
import { useLayoutEffect, useState, useCallback } from 'react';

import { Error } from '../../shared/ui/error';
import { PokeballLoader } from '../../shared/ui/pokeballLoader';
import { Card } from '../card/Card';
import styles from './List.module.scss';
import type { PokemonInterface, PokemonsListInterface } from '@/model/transport/api';
import loadingService from '@/service/loadingService';
import { pokemonService } from '@/service/pokemonService';

interface ListProps {
  pokemonList: PokemonsListInterface;
}

const List: FC<ListProps> = observer(({ pokemonList }): ReactElement => {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback(async () => {
    try {
      loadingService.startLoading();
      setError(null);
      const pokemonPromises = pokemonList.results.map((pokemonData) =>
        pokemonService.getOnePokemon(pokemonData.url)
      );
      const responses = await Promise.all(pokemonPromises);
      if (responses.length == 0) {
        setError('На данной странице не найдено покемонов');
      }
      setPokemons(responses);
    } catch (err) {
      setError(err.message || 'Неизвестная ошибка при получении покемонов');
    } finally {
      loadingService.stopLoading();
    }
  }, [pokemonList]);

  useLayoutEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  if (loadingService.isLoadingNow()) {
    return (
      <ul className={styles.list}>
        <PokeballLoader />
      </ul>
    );
  }

  if (error) {
    return (
      <ul className={styles.list}>
        <Error message={error} />
      </ul>
    );
  }

  return (
    <ul className={styles.list}>
      {pokemons && pokemons.map((pokemonData) => <Card key={pokemonData.id} pokemon={pokemonData} />)}
    </ul>
  );
});

export { List };
