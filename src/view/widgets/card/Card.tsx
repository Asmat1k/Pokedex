import type { FC, MouseEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { CatchButton } from '@/view/features/catchButton';
import { Img } from '@/view/shared/ui/img';
import styles from './card.module.scss';
import type { PokemonInterface } from '@/model/transport/api';
import { CardsColors } from '@/model/transport/api';

interface CardProps {
  pokemon: PokemonInterface;
}

const Card: FC<CardProps> = ({ pokemon }): ReactElement => {
  const { types, sprites, id, name } = pokemon;

  const colors = CardsColors as Record<string, string>;
  const primaryColor = colors[types[0].type.name] || 'rgb(255, 255, 255)';

  const imgSrc =
    sprites.other.dream_world.front_default ||
    sprites.other.home.front_default ||
    'https://cdn-icons-png.flaticon.com/512/17/17047.png';

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if ((event.target as HTMLElement).closest('button')) {
      event.preventDefault();
    }
  };

  return (
    <li
      className={styles.card}
      style={{
        background: `radial-gradient(circle at 50% 20%, ${primaryColor} 50%, rgb(255, 255, 255) 40%)`
      }}
    >
      <Link className={styles.card__link} to={`/pokemon/${name || id}`} onClick={handleLinkClick}>
        <Img alt={name} src={imgSrc} />
        <h5 className={styles.card__name}>{name}</h5>
        <div className={styles.card__id}>{id}</div>
        <CatchButton pokemonId={id} />
      </Link>
    </li>
  );
};

export { Card };
