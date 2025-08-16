import { computed, signal, WritableSignal } from '@angular/core';
import { LoadingStatus, StoreState } from './store.model';
import { APICallTracker } from './api-call';

export abstract class AppBaseStore<T, K> {
  protected _stateSignal: WritableSignal<StoreState<T, K>>;
  private readonly _initialState: StoreState<T, K>;
  constructor(data: T, params: K) {
    this._initialState = {
      data,
      params,
    };
    this._stateSignal = signal(this._initialState);
  }

  params = computed(() => this._stateSignal().params);
  data = computed(() => this._stateSignal().data);

  getTracker = new APICallTracker();
  saveTracker = new APICallTracker();

  noResults = computed(() => {
    const isRunning = this.getTracker.isRunning();
    const data = this._stateSignal().data;
    if (Array.isArray(data)) {
      return !isRunning && data.length == 0;
    } else {
      return !isRunning && data === null;
    }
  });

  protected resetState() {
    this._stateSignal.update((state) => ({
      ...this._initialState,
    }));
  }
}
