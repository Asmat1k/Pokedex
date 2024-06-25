import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { InfiniteScroll } from '@/view/widgets/infiniteScroll';
import { List } from '@/view/widgets/list';
import styles from './catched.module.scss';
import type { PokemonsListInterface } from '@/model/transport/api';
import { storeService } from '@/service/storeService';

const CatchedPage: FC = (): ReactElement => {
  const [catchedPokemons, setCatchedPokemons] = useState<PokemonsListInterface>({ results: [] });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPokemons, setTotalPokemons] = useState<number>(0);

  useEffect(() => {
    (async function getList() {
      const start = (currentPage - 1) * 12;
      const pokemonList = storeService.generatePokemonListFromStore(start, 12);
      if (pokemonList.results.length > 0) {
        setCatchedPokemons((prev) => ({
          results: [
            ...prev.results,
            ...pokemonList.results.filter(
              (newPokemon) => !prev.results.some((existingPokemon) => existingPokemon.url === newPokemon.url)
            )
          ]
        }));
      }
      setTotalPokemons(storeService.getTotalPokemonsCount());
    })();
  }, [currentPage]);

  return (
    <section className={styles.catched}>
      {catchedPokemons.results.length > 0 ? (
        <>
          <List pokemonList={catchedPokemons} />
          <InfiniteScroll
            currentPage={currentPage}
            itemsLoaded={catchedPokemons.results.length}
            setCurrentPage={setCurrentPage}
            totalItems={totalPokemons}
          />
        </>
      ) : (
        <div className={styles.nothing}>Вы пока не поймали ни одного покемона!</div>
      )}
    </section>
  );
};

export default CatchedPage;
