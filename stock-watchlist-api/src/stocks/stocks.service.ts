import { Low } from 'lowdb';
import { getDb, StockWatchListDb } from '../data/db';
import { Stock } from '../models/stock';

export class StocksService {
  private static instance: StocksService | null = null;
  private db: Low<StockWatchListDb>;
  private constructor() {
    this.db = getDb();
  }

  public static getInstance(): StocksService {
    if (!this.instance) {
      this.instance = new StocksService();
    }
    return this.instance;
  }

  public async getStocks(searchString: string): Promise<Stock[]> {
    searchString = searchString.toLowerCase().trim();
    const stocks = await this.readStocks();

    return stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchString) ||
        stock.symbol.toLowerCase().includes(searchString)
    );
  }

  public async getStock(symbol: string): Promise<Stock | null> {
    const stocks = await this.readStocks();
    return stocks.find((stock) => stock.symbol === symbol) || null;
  }

  private async readStocks(): Promise<Stock[]> {
    await this.db.read();
    return this.db.data?.stocks || [];
  }
}
