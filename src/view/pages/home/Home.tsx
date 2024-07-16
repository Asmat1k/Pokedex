import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { List } from '@/view/widgets/list';
import { Pagination } from '@/view/widgets/pagination';
import styles from './home.module.scss';
import type { PokemonsListInterface } from '@/model/transport/api';
import { paginationService } from '@/service/paginationService';
import { pokemonService } from '@/service/pokemonService';

const HomePage: FC = (): ReactElement => {
  const [pokemonList, setPokemonList] = useState<PokemonsListInterface | null>(null);

  useEffect(() => {
    (async function getList() {
      const pokemonList = await pokemonService.getPokemonList();
      setPokemonList(pokemonList);
      if (pokemonList) paginationService.init(1, pokemonList);
    })();
  }, []);

  return (
    <section className={styles.home}>
      {pokemonList && (
        <>
          <List pokemonList={pokemonList} />
          <Pagination pokemonList={pokemonList} setPokemonList={setPokemonList} />
        </>
      )}
    </section>
  );
};

export default HomePage;
