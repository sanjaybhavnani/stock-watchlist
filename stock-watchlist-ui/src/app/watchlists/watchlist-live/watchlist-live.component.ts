import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { WatchlistStore } from '../watchlist-detail/watchlist.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StocksService } from '../../shared/services/stocks.service';
import { Stock } from '../../shared/models/stock.model';
import { StockCardComponent } from '../../shared/components/stock-card/stock-card.component';
import { AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-watchlist-live',
  imports: [RouterLink, MatButtonModule, StockCardComponent, AsyncPipe],
  providers: [WatchlistStore],
  templateUrl: './watchlist-live.component.html',
  styleUrl: './watchlist-live.component.scss',
})
export class WatchlistLiveComponent implements OnInit {
  watchlistStore = inject(WatchlistStore);
  destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private stocksService = inject(StocksService);
  stockPrices$ = this.stocksService.stocksPrices$;

  constructor() {
    effect(() => {
      const stocks = this.watchlistStore.data()?.stocks;
      if (stocks?.length) {
        this.subscribeToFeed(stocks);
      }
    });

    this.destroyRef.onDestroy(() => {
      this.stocksService.unsubscribeStockPrices();
    });
  }
  ngOnInit() {
    const id = this.route.snapshot?.paramMap.get('id');
    if (id) {
      this.watchlistStore.loadOne(id);
    }
  }

  private subscribeToFeed(stocks: Stock[]) {
    this.stocksService.subscribeStockPrices(
      stocks.map((stock) => stock.symbol)
    );
  }
}
