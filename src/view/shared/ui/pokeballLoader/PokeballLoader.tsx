import type { FC, ReactElement } from 'react';

import styles from './PokeballLoader.module.scss';

const PokeballLoader: FC = (): ReactElement => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.pokeball}></div>
      <div className={styles.text}>Загрузка...</div>
    </section>
  );
};

export { PokeballLoader };
