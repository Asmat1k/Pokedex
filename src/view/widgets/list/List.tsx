import type { FC, ReactElement } from 'react';
import { useLayoutEffect, useState, useCallback } from 'react';

import { useLoading } from '@/view/shared/lib/context';
import { Error } from '../../shared/ui/error';
import { PokeballLoader } from '../../shared/ui/pokeballLoader';
import { Card } from '../card/Card';
import styles from './List.module.scss';
import type { PokemonInterface, PokemonsListInterface } from '@/model/transport/api';
import { pokemonService } from '@/service/pokemonService';

interface ListProps {
  pokemonList: PokemonsListInterface;
}

const List: FC<ListProps> = ({ pokemonList }): ReactElement => {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { startLoading, stopLoading, isLoading } = useLoading();

  const fetchPokemons = useCallback(async () => {
    try {
      startLoading();
      setError(null);
      const pokemonPromises = pokemonList.results.map((pokemonData) =>
        pokemonService.getOnePokemon(pokemonData.url)
      );
      const responses = await Promise.all(pokemonPromises);
      setPokemons(responses);
    } catch (err) {
      setError(err.message || 'Неизвестная ошибка при получении покемонов');
    } finally {
      stopLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonList]);

  // Вычисление до отрисовки*
  useLayoutEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  if (isLoading) {
    return (
      <ul className={styles.list}>
        <PokeballLoader />
      </ul>
    );
  }

  if (error || pokemons.length === 0) {
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
};

export { List };
