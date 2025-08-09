import { Low } from "lowdb";
import { getDb, StockWatchListDb } from "../data/db";

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

  public async getStocks(searchString: string) {
    searchString = searchString.toLowerCase().trim();
    await this.db.read();
    const stocks = this.db.data?.stocks || [];

    return stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchString) ||
        stock.symbol.toLowerCase().includes(searchString)
    );
  }
}
