import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import { LoadingContext } from './LoadingContext';

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider };
