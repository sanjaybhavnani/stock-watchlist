import { WebsocketMessage } from '../services/web-socket.service';

export interface Stock {
  symbol: string;
  name: string;
  lastClose: number;
}

export interface StockWithPrice extends Stock {
  price: number;
}

export interface StocksChannelMessage extends WebsocketMessage {
  symbols: string;
}
