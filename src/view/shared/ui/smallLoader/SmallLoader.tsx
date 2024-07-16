import type { FC, ReactElement } from 'react';

import styles from './SmallLoader.module.scss';

const SmallLoader: FC = (): ReactElement => {
  return <div className={styles.small_loader}></div>;
};

export { SmallLoader };
