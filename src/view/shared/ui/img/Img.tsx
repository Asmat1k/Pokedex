import type { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import { useState } from 'react';

import { SmallLoader } from '@/view/shared/ui/smallLoader/SmallLoader';
import styles from './Img.module.scss';

interface CustomImgProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  isBig?: boolean;
}

const Img: FC<CustomImgProps> = ({ src, alt, isBig = false }): ReactElement => {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImgLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`${isBig ? styles.img__big : styles.img__small}`}>
      {!isImageLoaded && <SmallLoader />}
      <img alt={alt} className={styles.img} src={src} onLoad={handleImgLoad} />
    </div>
  );
};

export { Img };
