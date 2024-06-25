import type { FC, ReactElement } from 'react';
import { useEffect, useState } from 'react';

import { useLoading } from '@/view/shared/lib/context';
import styles from './Pagination.module.scss';
import type { PokemonsListInterface } from '@/model/transport/api';
import { paginationService } from '@/service/paginationService';

interface PaginationProps {
  pokemonList: PokemonsListInterface;
  setPokemonList: (data: PokemonsListInterface) => void;
}

const Pagination: FC<PaginationProps> = ({ pokemonList, setPokemonList }): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(paginationService.currentPage);
  const [canGoNext, setCanGoNext] = useState<boolean>(paginationService.canGoNext());
  const [canGoPrev, setCanGoPrev] = useState<boolean>(paginationService.canGoPrev());

  const { isLoading, startLoading } = useLoading();

  useEffect(() => {
    setCanGoNext(paginationService.canGoNext());
    setCanGoPrev(paginationService.canGoPrev());
  }, [pokemonList]);

  const handlePagination = async (btnId: string) => {
    startLoading();
    try {
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
        disabled={!canGoPrev || isLoading}
        id='prev'
        onClick={() => handlePagination('prev')}
      >
        &larr;
      </button>
      <span className={styles.pagination__current}>{currentPage}</span>
      <button
        className={styles.pagination__arrow}
        disabled={!canGoNext || isLoading}
        id='next'
        onClick={() => handlePagination('next')}
      >
        &rarr;
      </button>
    </section>
  );
};

export { Pagination };
