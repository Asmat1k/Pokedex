import { createContext } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  startLoading: () => {},
  stopLoading: () => {}
});

export { LoadingContext };
