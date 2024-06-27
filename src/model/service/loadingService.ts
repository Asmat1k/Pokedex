interface LoadingServiceInterface {
  startLoading: () => void;
  stopLoading: () => void;
  isLoadingNow: () => void;
}

export { LoadingServiceInterface };
