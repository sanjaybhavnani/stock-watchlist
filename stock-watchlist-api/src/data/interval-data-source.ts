import EventEmitter from 'events';
import { StockWithPrice } from '../models/stock';
import { getDb } from './db';

export class IntervalDataSource {
  private static instance: IntervalDataSource;
  private db = getDb();
  private updatedStocks!: Map<string, number>;
  private emitter = new EventEmitter();
  public static getInstance(): IntervalDataSource {
    if (!this.instance) {
      this.instance = new IntervalDataSource();
    }
    return this.instance;
  }

  public async startInterval() {
    this.updatedStocks = new Map();
    await this.db.read();
    this.db.data.stocks.forEach((stock) => {
      const lastPrice = stock.lastClose;
      const changePercent = (Math.random() * 0.02) - 0.01; // -1% to +1%
      const newPrice = +(lastPrice * (1 + changePercent)).toFixed(2);
      this.updatedStocks.set(stock.symbol, newPrice);
    });
    this.emitter.emit('stockPrices', this.updatedStocks);
    setInterval(() => {
      this.updatedStocks.forEach((price, symbol) => {
        const change = Math.random() * (0.2 - 0.1) + 0.1;
        const direction = Math.random() < 0.5 ? -1 : 1;
        const newPrice = +(price + direction * change).toFixed(2);
        this.updatedStocks.set(symbol, newPrice);
        
      });
      this.emitter.emit('stockPrices', this.updatedStocks);
    }, 100);
  }

  public onPrices(listener: (prices: Map<string, number>) => void) {
    this.emitter.on('stockPrices', listener);
  }

  public offPrices(listener: (prices: Map<string, number>) => void) {
    this.emitter.off('stockPrices', listener);
  }
}
