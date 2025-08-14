import { computed, signal, WritableSignal } from '@angular/core';
import { LoadingStatus, StoreState } from './store.model';

export abstract class AppBaseStore<T, K> {
  protected _stateSignal: WritableSignal<StoreState<T, K>>;
  private readonly _initialState: StoreState<T, K>;
  constructor(data: T, params: K) {
    this._initialState = {
      data,
      params,
      errorMessage: '',
      status: LoadingStatus.Idle,
    };
    this._stateSignal = signal(this._initialState);
  }

  params = computed(() => this._stateSignal().params);
  data = computed(() => this._stateSignal().data);
  errorMessage = computed(() => this._stateSignal().errorMessage);
  loading = computed(
    () => this._stateSignal().status === LoadingStatus.Loading
  );
  noResults = computed(() => {
    const isComplete = this._stateSignal().status == LoadingStatus.Complete;
    const data = this._stateSignal().data;
    if (Array.isArray(data)) {
      return isComplete && data.length == 0;
    } else {
      return isComplete && data !== null;
    }
  });

  protected updateError(errorMessage: string) {
    this._stateSignal.update((state) => ({ ...state, errorMessage }));
  }

  protected startLoading() {
    this._stateSignal.update(state => ({...state, status: LoadingStatus.Loading}));
  }

  protected completeLoading() {
    this._stateSignal.update(state => ({...state, status: LoadingStatus.Complete}));
  }

  protected resetState() {
    this._stateSignal.update(state => ({
      ...this._initialState
    }))
  }
}
