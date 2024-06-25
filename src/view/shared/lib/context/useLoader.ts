import { useContext } from 'react';

import { LoadingContext } from './LoadingContext';

const useLoading = () => {
  return useContext(LoadingContext);
};

export { useLoading };
