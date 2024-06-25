import type { FC, MouseEvent, ReactNode, ButtonHTMLAttributes, ReactElement } from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/view/shared/ui/button/Button';
import { storeService } from '@/service/storeService';

interface CatchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  pokemonId?: number;
  onCatchCallback?: (arg: string) => void;
}

const CatchButton: FC<CatchButtonProps> = ({
  isDisabled,
  onClick,
  children,
  pokemonId,
  onCatchCallback,
  ...props
}): ReactElement => {
  const [isCaught, setIsCaught] = useState<boolean>(false);

  useEffect(() => {
    if (pokemonId !== undefined) {
      setIsCaught(storeService.checkPokemon(pokemonId));
    }
  }, [pokemonId]);

  const handleBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else {
      storeService.catchPokemon(pokemonId);
      setIsCaught(true);
      if (onCatchCallback && pokemonId !== undefined) {
        onCatchCallback(storeService.getPokemonCatchDate(pokemonId));
      }
    }
  };

  return (
    <Button disabled={isDisabled ?? isCaught} onClick={handleBtnClick} {...props}>
      {!children ? (isCaught ? 'Пойман' : 'Поймать!') : children}
    </Button>
  );
};

export { CatchButton };
