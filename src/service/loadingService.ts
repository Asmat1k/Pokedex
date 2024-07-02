import { makeAutoObservable } from 'mobx';
import type { LoadingServiceInterface } from '@/model/service/loadingService';

class LoadingService implements LoadingServiceInterface {
  isLoading = false;
  private static instance: LoadingService = null;

  constructor() {
    if (LoadingService.instance) {
      return LoadingService.instance;
    }
    LoadingService.instance = this;
    makeAutoObservable(this);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}

const loadingService = new LoadingService();

export default loadingService;
