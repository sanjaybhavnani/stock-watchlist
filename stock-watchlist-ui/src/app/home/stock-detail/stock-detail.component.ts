import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { StockStore } from './stock.store';
import { StocksService } from '../../shared/services/stocks.service';
import { AsyncPipe } from '@angular/common';
import { StockCardComponent } from '../../shared/components/stock-card/stock-card.component';
import { WatchlistsStore } from '../../watchlists/watchlists.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WatchlistStore } from '../../watchlists/watchlist-detail/watchlist.store';
import { Watchlist } from '../../watchlists/watchlist.model';
import { Stock } from '../../shared/models/stock.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from '../../shared/components/error-notification/error-notification.component';

@Component({
  selector: 'app-stock-detail',
  imports: [
    AsyncPipe,
    StockCardComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
  providers: [StockStore, WatchlistsStore, WatchlistStore],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss',
})
export class StockDetailComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  public watchlistsStore = inject(WatchlistsStore);
  public watchlistStore = inject(WatchlistStore);

  public stockStore = inject(StockStore);
  public stockPrice$: Observable<number>;
  private stocksService = inject(StocksService);
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.stockPrice$ = this.stocksService.stocksPrices$.pipe(
      filter((price) => price !== null),
      map((price) =>
        price[this.stockStore.params()] ? price[this.stockStore.params()] : 0
      )
    );
    this.subscribeToStockPrice();
    this.loadWatchlists();
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

  private loadWatchlists() {
    this.watchlistsStore.loadAll();
  }

  public onStockAdded(evt: { watchlist: Watchlist; stock: Stock }) {
    const { watchlist, stock } = evt;
    if (!watchlist.stocks.some((s) => s.symbol === stock.symbol)) {
      this.watchlistStore.save(
        {
          ...watchlist,
          stocks: [...watchlist.stocks, stock],
        },
        watchlist.id as string
      );
    } else {
      this._snackBar.openFromComponent(ErrorNotificationComponent, {
        data: {
          errorMessage: `${stock.name} already present in the watchlist.`,
        },
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }

    this.watchlistStore.saveTracker.callComplete$
      .pipe(take(1))
      .subscribe((result) => {
        if (result.type === 'failed') {
          this._snackBar.openFromComponent(ErrorNotificationComponent, {
            data: {
              errorMessage: result.errorMessage || 'Could not add to watchlist',
            },
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        } else {
          this._snackBar.open('Success', 'Dismiss', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          if (result.data) {
            this.watchlistsStore.updateWatchlist(result.data);
          }
        }
      });
  }
}
