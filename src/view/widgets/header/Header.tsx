import { useCallback, useEffect, useState, type FC, type ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './header.module.scss';

export const Header: FC = (): ReactElement => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const updateSticky = useCallback(() => {
    const shouldBeSticky = window.scrollY >= 15;
    if (isSticky !== shouldBeSticky) {
      setIsSticky(shouldBeSticky);
    }
  }, [isSticky]);

  useEffect(() => {
    window.addEventListener('scroll', updateSticky);
    return () => {
      window.removeEventListener('scroll', updateSticky);
    };
  }, [updateSticky]);

  const isActive = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : styles.link);
  return (
    <header className={`${styles.header} ${isSticky && styles.header_scrolled}`}>
      <div className={styles.header__container}>
        <div className={styles.header__body}>
          <Link className={styles.logo} to='/'>
            <h1 className={styles.logo__title}>POKEDEX</h1>
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink className={isActive} to='/'>
                  Главная
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink className={isActive} to='/catched'>
                  Пойманные покемоны
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
