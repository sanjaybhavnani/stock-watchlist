import { JSONFilePreset } from "lowdb/node";
import { Stock } from "../models/stock";
import { Watchlist } from "../models/watchlist";
import { defaultData, stocksSeedData } from "./default-data";
import { Low } from "lowdb";

export interface StockWatchListDb {
  stocks: Stock[];
  watchlists: Watchlist[];
  alive: boolean;
}


let db: Low<StockWatchListDb>;

// Initialize the database with defaults if empty
export async function initDb() {
  db = await JSONFilePreset<StockWatchListDb>(
    "./stock-watchlist.json",
    defaultData
  );
  await db.read();
  if (!db.data?.stocks.length) {
    console.log('Seeding data...');
    await seedStocks();
  }
  await db.write();
}

async function seedStocks() {
  db.data.stocks = stocksSeedData;
  await db.write();
}

export function getDb() {
    if(!db) {
        throw new Error("Database not initialized. Call initDb() first.");
    }
    return db;
}