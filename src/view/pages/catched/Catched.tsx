import { observer } from 'mobx-react-lite';
import type { FC, ReactElement } from 'react';
import { useState } from 'react';

import { InfiniteScroll } from '@/view/widgets/infiniteScroll';
import { List } from '@/view/widgets/list';
import styles from './catched.module.scss';
import { storeService } from '@/service/storeService';

const ITEMS_PER_PAGE = 12;

const CatchedPage: FC = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const catchedPokemons = storeService.generatePokemonListFromStore(0, currentPage * ITEMS_PER_PAGE);
  const totalPokemons = storeService.totalPokemonsCount;

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

export default observer(CatchedPage);
