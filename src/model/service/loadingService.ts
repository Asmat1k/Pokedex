interface LoadingServiceInterface {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export { LoadingServiceInterface };
