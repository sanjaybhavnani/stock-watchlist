import { WebSocket } from 'ws';
import { IntervalDataSource } from '../../data/interval-data-source';
import { SocketChannels, SocketMessage } from '../socket.model';
import { WsChannel } from './ws-channel';

export class StocksChannel extends WsChannel {
  private static instance: StocksChannel;
  private feedSubscribed = false;

  private pendingClients = new Map<WebSocket, Set<string>>();
  private clientsToDelete = new Set<WebSocket>();
  private listenerRunning = false;
  private clients: Map<WebSocket, Set<string>> = new Map();
  public static getInstance() {
    if (!this.instance) {
      this.instance = new StocksChannel(SocketChannels.StockPrices);
    }
    return this.instance;
  }

  public subscribe(ws: WebSocket, message: StocksChannelMessage) {
    if (!this.feedSubscribed) {
      this.clients.set(ws, new Set(message.symbols));
      this.subscribeToStocksFeed();
    } else {
      this.pendingClients.set(ws, new Set(message.symbols));
    }
  }

  public unsubscribe(ws: WebSocket) {
    this.clientsToDelete.add(ws);
  }

  private subscribeToStocksFeed() {
    console.log('subscribing to stocks feed');
    this.feedSubscribed = true;
    IntervalDataSource.getInstance().onPrices(this.listener);
  }

  private unsubscribeFromStocksFeed() {
    this.feedSubscribed = false;
    IntervalDataSource.getInstance().offPrices(this.listener);
  }

  private listener = (updatedStocks: Map<string, number>) => {
    if (this.listenerRunning) {
      console.log('listener running returning');
      return;
    }
    this.listenerRunning = true;
    try {
      this.applyPendingUpdates();
      if (this.clients.size === 0) {
        this.unsubscribeFromStocksFeed();
        return;
      }

      this.clients.forEach((symbols, ws) => {
        if (ws.bufferedAmount > 0) {
          console.warn('Backpressure: skipping this tick for', ws.url);
          return;
        }
        const clientMessage: { [key: string]: number } = Array.from(
          symbols
        ).reduce((agg, symbol) => {
          return {
            ...agg,
            [symbol]: updatedStocks.get(symbol),
          };
        }, {});
        console.log(clientMessage);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ channel: this.name, data: clientMessage }));
        }
      });
    } finally {
      this.listenerRunning = false;
    }
  };

  private applyPendingUpdates() {
    if (this.clientsToDelete.size > 0) {
      this.clientsToDelete.forEach((ws) => {
        this.clients.delete(ws);
      });
      this.clientsToDelete.clear();
    }

    if (this.pendingClients.size > 0) {
      this.pendingClients.forEach((symbols, ws) => {
        this.clients.set(ws, symbols);
      });
      this.pendingClients.clear();
    }
  }
}

export interface StocksChannelMessage extends SocketMessage {
  symbols: string[];
}
