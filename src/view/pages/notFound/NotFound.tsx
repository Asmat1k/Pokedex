import type { FC, ReactElement } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { Button } from '@/view/shared/ui/button';
import styles from './notFound.module.scss';

const PageNotFound: FC = (): ReactElement => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  if (isRouteErrorResponse(error)) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.page__body}>
            <div className={styles.page__header}>
              <h2 className={styles.page__title}>{error.status}</h2>
              <h3 className={styles.page__status}>
                ({error.statusText} - {error.data})
              </h3>
            </div>
            <p className={styles.page__description}>
              Ой, похоже такой страницы не существует! <br />
              <span>Вернитесь на главную и попробуйте еще раз</span>
            </p>
            <Button onClick={handleClick}>Главная</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.page__body}>
          <div className={styles.page__header_small}>
            <h2 className={styles.page__title_small}>Что-то пошло не так</h2>
          </div>
          <p className={styles.page__description}>Попробуйте перезагрузить страницу</p>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
