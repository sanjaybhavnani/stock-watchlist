import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { StocksService } from '../../services/stocks.service';
import { Subscription } from 'rxjs';
import { AppBaseStore } from '../../store/base.store';

@Injectable()
export class StockSearchStore extends AppBaseStore<Stock[], string> {
  private stockService = inject(StocksService);
  constructor() {
    super([], '');
    this.searchTextEffect();
  }

  private searchSubscription!: Subscription;

  updateSearchText(searchText: string) {
    this._stateSignal.update((state) => ({
      ...state,
      params: searchText,
    }));
  }

  override resetState() {
    super.resetState();
  }

  private searchTextEffect() {
    effect(() => {
      const searchText = this.params();
      if (searchText.length < 3) {
        return;
      }
      this.getTracker.start();
      if (this.searchSubscription && !this.searchSubscription.closed) {
        this.searchSubscription.unsubscribe();
      }
      this.searchSubscription = this.stockService
        .searchStocks(searchText)
        .subscribe({
          next: (data) => {
            this._stateSignal.update((state) => ({
              ...state,
              data,
            }));
          },
          error: (err) => {
            this.getTracker.error(err?.error?.message || 'Search Failed');
          },
          complete: () => {
            this.getTracker.success();
          },
        });
    });
  }
}
