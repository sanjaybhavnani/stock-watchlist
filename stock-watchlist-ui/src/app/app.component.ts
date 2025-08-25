import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { StocksService } from './shared/services/stocks.service';
import { WebSocketService } from './shared/services/web-socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stock-watchlist-ui';
  private webSocketService = inject(WebSocketService);
  ngOnInit() {
    // Subscribe to your stocks feed here
    // this.stocksSubscription = yourStocksService.subscribe(...);

    window.addEventListener('beforeunload', this.cleanupStocksFeed);
  }
  private cleanupStocksFeed = () => {
    console.log('Closing socket connection');
    this.webSocketService.close();
  };
}
