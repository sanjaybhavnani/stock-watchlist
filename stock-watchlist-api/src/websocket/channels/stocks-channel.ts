import { WebSocket } from 'ws';
import { IntervalDataSource } from '../../data/interval-data-source';
import { SocketChannels, SocketMessage } from '../socket.model';
import { WsChannel } from './ws-channel';

/**
 * Channel for managing stock price subscriptions over WebSocket.
 * Handles subscribing/unsubscribing clients and broadcasting stock price updates.
 */
export class StocksChannel extends WsChannel {
  /** Singleton instance */
  private static instance: StocksChannel;
  /** Whether the feed is currently subscribed */
  private feedSubscribed = false;

  /** Clients waiting to be added to the main clients map */
  private pendingClients = new Map<WebSocket, Set<string>>();
  /** Clients waiting to be removed from the main clients map */
  private clientsToDelete = new Set<WebSocket>();
  /** Whether the listener is currently running */
  private listenerRunning = false;
  /** Map of clients and their subscribed symbols */
  private clients: Map<WebSocket, Set<string>> = new Map();

  /**
   * Returns the singleton instance of StocksChannel.
   * @returns {StocksChannel}
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new StocksChannel(SocketChannels.StockPrices);
    }
    return this.instance;
  }

  /**
   * Subscribes a WebSocket client to stock price updates for the given symbols.
   * @param ws WebSocket client
   * @param message Message containing symbols to subscribe to
   */
  public subscribe(ws: WebSocket, message: StocksChannelMessage) {
    if (!this.feedSubscribed) {
      this.clients.set(ws, new Set(message.symbols));
      this.subscribeToStocksFeed();
    } else {
      this.pendingClients.set(ws, new Set(message.symbols));
    }
  }

  /**
   * Unsubscribes a WebSocket client from stock price updates.
   * @param ws WebSocket client
   */
  public unsubscribe(ws: WebSocket) {
    this.clientsToDelete.add(ws);
  }

  /**
   * Subscribes to the stock price feed and starts listening for updates.
   * Private method.
   */
  private subscribeToStocksFeed() {
    console.log('subscribing to stocks feed');
    this.feedSubscribed = true;
    IntervalDataSource.getInstance().onPrices(this.listener);
  }

  /**
   * Unsubscribes from the stock price feed.
   * Private method.
   */
  private unsubscribeFromStocksFeed() {
    this.feedSubscribed = false;
    IntervalDataSource.getInstance().offPrices(this.listener);
  }

  /**
   * Listener function for stock price updates.
   * First processes pending updates.
   * Then broadcasts updates to all subscribed clients.
   * `updatedStocks` is the latest price of all stocks in the system.
   * This method iterates through all clients and sends the prices of only those stocks subscribed by the client.
   * 
   * @param updatedStocks Map of symbol to price
   */
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

  /**
   * Applies pending client subscriptions and unsubscriptions.
   * Pending updates are used so that clients array is not modified when listener is running.
   * In order to avoid any concurrency issues.
   * Private method.
   */
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

/**
 * Message format for subscribing to stock symbols.
 */
export interface StocksChannelMessage extends SocketMessage {
  /** Array of stock symbols to subscribe to */
  symbols: string[];
}
