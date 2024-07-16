import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useEffect, useState, useCallback, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CatchButton } from '@/view/features/catchButton';
import { Button } from '@/view/shared/ui/button';
import { Error } from '@/view/shared/ui/error';
import { Img } from '@/view/shared/ui/img';
import { PokeballLoader } from '@/view/shared/ui/pokeballLoader';
import styles from './detailed.module.scss';
import type { PokemonInterface } from '@/model/transport/api';
import { pokemonService } from '@/service/pokemonService';
import { storeService } from '@/service/storeService';

const DetailedPage: FC = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<PokemonInterface | null>(null);
  const [error, setError] = useState<string>('');

  const fetchPokemonData = useCallback(async () => {
    const data = await pokemonService.getPokemonByParam(id);
    if (!data) {
      setError(`Информация по покемону ${id} не найдена`);
      return;
    }
    setPokemonData(data);
  }, [id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const imgSource = () =>
    pokemonData?.sprites.other.dream_world.front_default ||
    pokemonData?.sprites.other.home.front_default ||
    'https://cdn-icons-png.flaticon.com/512/17/17047.png';

  if (error) {
    return (
      <>
        <section className={styles.detailed}>
          <Error message={error} />
        </section>
        <span className={styles.back}>
          <Button isDisabled={false} onClick={() => navigate('/', { replace: true })}>
            Искать покемона
          </Button>
        </span>
      </>
    );
  }

  if (!pokemonData) {
    return <PokeballLoader />;
  }

  const catchDate = storeService.getPokemonCatchDate(pokemonData.id);

  return (
    <>
      <section className={styles.detailed}>
        <div className={styles.detailed__container}>
          <div className={styles.detailed__body}>
            <Img alt={pokemonData.name} isBig={true} src={imgSource()} />
            <div className={styles.info}>
              <div className={styles.info__header}>
                <h2 className={styles.header__name}>{pokemonData.name}</h2>
                <h3 className={styles.header__id}>ID: {pokemonData.id}</h3>
              </div>
              <div className={styles.info__abilities}>
                <span className={styles.abilities__title}>Способности:</span>
                <ul className={styles.abilities__list}>
                  {pokemonData.abilities.map(
                    (item, index) =>
                      !item.is_hidden && (
                        <li key={index} className={styles.abilities__item}>
                          {item.ability.name}
                        </li>
                      )
                  )}
                </ul>
              </div>
              <div className={styles.info__catched}>
                <div className={styles.catched__date}>
                  <div className={styles.catched__title}>Дата поимки: {catchDate || '-'}</div>
                </div>
              </div>
              <CatchButton pokemonId={pokemonData.id} />
            </div>
          </div>
        </div>
      </section>
      <span className={styles.back}>
        <Button isDisabled={false} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </span>
    </>
  );
};

export default observer(DetailedPage);
