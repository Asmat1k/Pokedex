import type { FC, ReactElement } from 'react';

import { useLoading } from '@/view/shared/lib/context';
import { Button } from '@/view/shared/ui/button';

interface InfiniteScrollProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsLoaded: number;
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsLoaded
}): ReactElement => {
  const { isLoading } = useLoading();

  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Button disabled={itemsLoaded >= totalItems || isLoading} onClick={loadMoreItems}>
        {itemsLoaded >= totalItems ? 'Все покемоны загружены' : 'Загрузить ещё'}
      </Button>
    </div>
  );
};

export { InfiniteScroll };
