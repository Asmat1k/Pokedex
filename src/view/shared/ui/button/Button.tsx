import type { FC, MouseEvent, ReactNode, ButtonHTMLAttributes, ReactElement } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ isDisabled, onClick, children, ...props }): ReactElement => {
  return (
    <button className={styles.btn} disabled={isDisabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export { Button };
