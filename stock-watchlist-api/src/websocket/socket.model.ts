export enum SocketChannels {
  StockPrices = 'stockPrices',
  Alerts = 'alerts',
}

export interface SocketMessage {
  channel: SocketChannels;
  action: 'sub' | 'unsub';
}

export interface StocksPricesMessage extends SocketMessage {
  symbols: string[];
}
