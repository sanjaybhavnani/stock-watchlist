import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { bufferTime, filter, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Stock } from '../models/stock.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private http = inject(HttpClient);
  private stockApiUrl = environment.api + '/stocks';
  private webSocketService = inject(WebSocketService);

  stocksPrices$ = this.webSocketService.socket$.pipe(
      filter((message) => message.channel === 'stockPrices'),
      bufferTime(1500),
      map((messages) => messages[messages.length - 1]?.data),
      filter((msg) => !!msg)
    );
  constructor() {}

  searchStocks(searchText: string): Observable<Stock[]> {
    const url = `${this.stockApiUrl}?search=${encodeURIComponent(searchText)}`;
    return this.http.get<Stock[]>(url);
  }

  getStock(symbol: string): Observable<Stock> {
    const url = `${this.stockApiUrl}/${symbol}`;
    return this.http.get<Stock>(url);
  }

  subscribeStockPrices(
    symbols: string[]
  ) {
    this.webSocketService.sendMessage({
      action: 'sub',
      channel: 'stockPrices',
      symbols,
    });

    return 
  }

  unsubscribeStockPrices() {
    this.webSocketService.sendMessage({
      action: 'unsub',
      channel: 'stockPrices',
    });
  }
}
