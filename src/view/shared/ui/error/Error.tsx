import type { FC, ReactElement } from 'react';

import styles from './Error.module.scss';

interface ErrorProps {
  message?: string;
}

const Error: FC<ErrorProps> = ({ message }): ReactElement => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Что-то пошло не так...</h2>
      <span className={styles.error__message}>{message || 'Неизвестная ошибка :('}</span>
    </div>
  );
};

export { Error };
