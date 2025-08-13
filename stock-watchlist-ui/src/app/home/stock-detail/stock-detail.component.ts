import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { StockStore } from './stock.store';
import { StocksService } from '../../shared/services/stocks.service';
import { AsyncPipe } from '@angular/common';
import { StockCardComponent } from '../../shared/components/stock-card/stock-card.component';

@Component({
  selector: 'app-stock-detail',
  imports: [AsyncPipe, StockCardComponent],
  providers: [StockStore],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss',
})
export class StockDetailComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  public stockStore = inject(StockStore);
  public stockPrice$: Observable<number>;
  private stocksService = inject(StocksService);
  private destroy$ = new Subject<void>();
  constructor() {
    this.stockPrice$ = this.stocksService.stocksPrices$.pipe(
      filter((price) => price !== null),
      map((price) =>
        price[this.stockStore.params()] ? price[this.stockStore.params()] : 0
      )
    );
    this.subscribeToStockPrice();
  }
  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.stockStore.updateSymbol(params['symbol']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stocksService.unsubscribeStockPrices();
  }

  private subscribeToStockPrice() {
    effect(() => {
      const currentSymbol = this.stockStore.params();
      if (currentSymbol) {
        this.stocksService.subscribeStockPrices([this.stockStore.params()]);
      }
    });
  }
}
