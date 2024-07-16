import { observer } from 'mobx-react-lite';
import type { FC, MouseEvent, ReactNode, ButtonHTMLAttributes, ReactElement } from 'react';
import { Button } from '@/view/shared/ui/button/Button';
import { storeService } from '@/service/storeService';

interface CatchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  pokemonId?: number;
  onCatchCallback?: (arg: string) => void;
}

const CatchButton: FC<CatchButtonProps> = observer(
  ({ isDisabled, onClick, children, pokemonId, onCatchCallback, ...props }): ReactElement => {
    const handleBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      } else {
        storeService.catchPokemon(pokemonId);
        if (onCatchCallback && pokemonId !== undefined) {
          onCatchCallback(storeService.getPokemonCatchDate(pokemonId));
        }
      }
    };

    const isCaught = pokemonId !== undefined ? storeService.checkPokemon(pokemonId) : false;

    return (
      <Button disabled={isDisabled ?? isCaught} onClick={handleBtnClick} {...props}>
        {!children ? (isCaught ? 'Пойман' : 'Поймать!') : children}
      </Button>
    );
  }
);

export { CatchButton };
