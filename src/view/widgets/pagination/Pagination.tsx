import { observer } from 'mobx-react-lite';
import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import styles from './Pagination.module.scss';
import type { PokemonsListInterface } from '@/model/transport/api';
import loadingService from '@/service/loadingService';
import { paginationService } from '@/service/paginationService';

interface PaginationProps {
  pokemonList: PokemonsListInterface;
  setPokemonList: (data: PokemonsListInterface) => void;
}

const Pagination: FC<PaginationProps> = observer(({ pokemonList, setPokemonList }): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(paginationService.currentPage);
  const [canGoNext, setCanGoNext] = useState<boolean>(paginationService.canGoNext());
  const [canGoPrev, setCanGoPrev] = useState<boolean>(paginationService.canGoPrev());

  useEffect(() => {
    setCanGoNext(paginationService.canGoNext());
    setCanGoPrev(paginationService.canGoPrev());
  }, [pokemonList]);

  const handlePagination = async (btnId: string) => {
    try {
      loadingService.startLoading();
      const newPokemonList =
        btnId === 'next' ? await paginationService.nextPage() : await paginationService.prevPage();
      if (newPokemonList) {
        setCurrentPage(paginationService.getCurrentPage());
        setPokemonList(newPokemonList);
      }
    } finally {
      setCanGoNext(paginationService.canGoNext());
      setCanGoPrev(paginationService.canGoPrev());
    }
  };

  return (
    <section className={styles.pagination}>
      <button
        className={styles.pagination__arrow}
        disabled={!canGoPrev || loadingService.isLoadingNow()}
        id='prev'
        onClick={() => handlePagination('prev')}
      >
        &larr;
      </button>
      <span className={styles.pagination__current}>{currentPage}</span>
      <button
        className={styles.pagination__arrow}
        disabled={!canGoNext || loadingService.isLoadingNow()}
        id='next'
        onClick={() => handlePagination('next')}
      >
        &rarr;
      </button>
    </section>
  );
});

export { Pagination };
