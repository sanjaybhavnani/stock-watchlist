import { Low } from 'lowdb/lib';
import { getDb, StockWatchListDb } from '../data/db';
import { Watchlist } from '../models/watchlist';
import { CustomError } from '../models/custom-error';
import { v4 as uuid} from 'uuid';
export class WatchlistsService {
  private static instance: WatchlistsService;
  private db: Low<StockWatchListDb>;

  private constructor() {
    this.db = getDb();
  }

  public static getInstance(): WatchlistsService {
    if (!WatchlistsService.instance) {
      WatchlistsService.instance = new WatchlistsService();
    }
    return WatchlistsService.instance;
  }

  public async getWatchlists() {
    await this.db.read();
    return this.db.data.watchlists;
  }

  public async createWatchList(watchlist: Watchlist): Promise<Watchlist | null> {
    let result: Watchlist | null = null;
    await this.db.update((data) => {
      if (data.watchlists.some((wl) => wl.name === watchlist.name)) {
        throw new CustomError(400, 'Watchlist already exists');
      } else {
        result = {
          ...watchlist,
          id: uuid()
        };
        data.watchlists.push(result);
      }
    });
    return result;
  }

  public async updateWatchlist(watchlist: Watchlist): Promise<Watchlist | null> {
    let updated: Watchlist | null = null;
    await this.db.update((data) => {
      const index = data.watchlists.findIndex((wl) => watchlist.id === wl.id);
      if (index === -1) {
        throw new CustomError(404, 'Watchlist not found');
      } else {
        data.watchlists[index] = { ...watchlist };
        updated = data.watchlists[index];
      }
    });
    return updated;
  }

  public async deleteWatchlist(id: string) {
    await this.db.update((data) => {
      const index = data.watchlists.findIndex((wl) => wl.id === id);
      if (index === -1) {
        throw new CustomError(404, 'Watchlist not found');
      } else {
        data.watchlists.splice(index, 1);
      }
    });
  }

  public async getWatchlistById(id: string): Promise<Watchlist> {
    await this.db.read();
    const watchlist = this.db.data.watchlists.find(
      (wl) => wl.id === id
    );
    if (!watchlist) {
      throw new CustomError(404, 'Watchlist not found');
    }
    return watchlist;
  }
}
