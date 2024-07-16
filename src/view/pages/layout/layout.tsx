import { Suspense, type FC, type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/view/widgets/header/Header';
import { PokeballLoader } from '@/view/shared/ui/pokeballLoader';
import styles from './layout.module.scss';

export const Layout: FC = (): ReactElement => {
  return (
    <>
      <Header />
      <main className={styles.body}>
        <Suspense fallback={<PokeballLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
