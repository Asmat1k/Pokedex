import { observer } from 'mobx-react-lite';
import type { FC, ReactElement } from 'react';

import { Button } from '@/view/shared/ui/button';
import loadingService from '@/service/loadingService';

interface InfiniteScrollProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsLoaded: number;
}

const InfiniteScroll: FC<InfiniteScrollProps> = observer(
  ({ currentPage, setCurrentPage, totalItems, itemsLoaded }): ReactElement => {
    const loadMoreItems = () => {
      setCurrentPage(currentPage + 1);
    };

    return (
      <div>
        <Button disabled={itemsLoaded >= totalItems || loadingService.isLoading} onClick={loadMoreItems}>
          {itemsLoaded >= totalItems ? 'Все покемоны загружены' : 'Загрузить ещё'}
        </Button>
      </div>
    );
  }
);

export { InfiniteScroll };
