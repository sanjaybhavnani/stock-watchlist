import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { StocksService } from '../../services/stocks.service';
import { Subscription } from 'rxjs';

export interface StockSearchState {
  stocks: Stock[];
  searchText: string;
  status: 'idle' | 'loading' | 'complete';
  errorMessage: string;
}

@Injectable()
export class StockSearchStore {
  private stockService = inject(StocksService);
  private initialState: StockSearchState = {
    stocks: [] as Stock[],
    status: 'idle',
    searchText: '',
    errorMessage: '',
  };
  private _stateSignal = signal<StockSearchState>(this.initialState);

  searchText = computed(() => this._stateSignal().searchText);
  stocks = computed(() => this._stateSignal().stocks);
  loading = computed(() => this._stateSignal().status === 'loading');
  noResults = computed(
    () =>
      this._stateSignal().status === 'complete' && this.stocks().length === 0
  );
  errorMessage = computed(() => this._stateSignal().errorMessage);

  private searchSubscription!: Subscription;

  constructor() {
    this.searchTextEffect();
  }

  updateSearchText(searchText: string) {
    this._stateSignal.update((state) => ({
      ...state,
      searchText,
    }));
  }

  resetState() {
    this._stateSignal.update((state) => this.initialState);
  }

  private searchTextEffect() {
    effect(() => {
      const searchText = this.searchText();
      if (searchText.length < 3) {
        return;
      }
      this._stateSignal.update((state) => ({
        ...state,
        status: 'loading',
      }));

      if (this.searchSubscription && !this.searchSubscription.closed) {
        this.searchSubscription.unsubscribe();
      }
      this.searchSubscription = this.stockService
        .searchStocks(searchText)
        .subscribe({
          next: (stocks) => {
            this._stateSignal.update((state) => ({
              ...state,
              stocks,
            }));
          },
          error: (err) => {
            this._stateSignal.update((state) => {
              console.error(err);
              return {
                ...state,
                status: 'complete',
                errorMessage: 'Search failed',
              };
            });
          },
          complete: () => {
            this._stateSignal.update((state) => ({
              ...state,
              status: 'complete',
            }));
          },
        });
    });
  }
}
