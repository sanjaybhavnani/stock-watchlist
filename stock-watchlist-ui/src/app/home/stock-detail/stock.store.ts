import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { StocksService } from '../../shared/services/stocks.service';
import { Stock } from '../../shared/models/stock.model';
import { AppBaseStore } from '../../shared/store/base.store';

@Injectable()
export class StockStore extends AppBaseStore<Stock | null, string> {
  private stocksService = inject(StocksService);
  stock: Signal<Stock | null>;
  constructor() {
    super(null, '');
    this.stock = this.data;
    this.symbolEffect();
  }

  updateSymbol(symbol: string) {
    this._stateSignal.update((state) => ({
      ...state,
      params: symbol,
    }));
  }

  private symbolEffect() {
    effect(() => {
      const symbol = this.params();
      if (symbol) {
        this.startLoading();
        this.stocksService.getStock(symbol).subscribe({
          next: (data) => {
            this._stateSignal.update((state) => ({ ...state, data }));
          },
          error: (err) => {
            this.updateError(err?.message || 'Could not get stock');
            this.completeLoading();
          },
          complete: () => {
            this.completeLoading();
          }
        });
      }
    });
  }
}
