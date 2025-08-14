import { Low } from 'lowdb/lib';
import { getDb, StockWatchListDb } from '../data/db';
import { Watchlist } from '../models/watchlist';
import { CustomError } from '../models/custom-error';

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

  public async createWatchList(watchlist: Watchlist) {
    await this.db.update((data) => {
      if (data.watchlists.some((wl) => wl.name === watchlist.name)) {
        throw new CustomError(400, 'Watchlist already exists');
      } else {
        data.watchlists.push({
          ...watchlist,
          id: data.watchlists.length,
        });
      }
    });
  }

  public async updateWatchlist(watchlist: Watchlist) {
    await this.db.update((data) => {
      const index = data.watchlists.findIndex((wl) => wl.id === wl.id);
      if (index === -1) {
        throw new CustomError(404, 'Watchlist not found');
      } else {
        data.watchlists[index] = { ...watchlist };
      }
    });
  }

  public async deleteWatchlist(id: string) {
    const watchlistId = Number(id);
    if (isNaN(watchlistId)) {
      throw new CustomError(400, 'Invalid watchlist id');
    }
    await this.db.update((data) => {
      const index = data.watchlists.findIndex((wl) => wl.id === watchlistId);
      if (index === -1) {
        throw new CustomError(404, 'Watchlist not found');
      } else {
        data.watchlists.splice(index, 1);
      }
    });
  }

  public async getWatchlistById(id: string): Promise<Watchlist> {
    const watchlistId = Number(id);
    if (isNaN(watchlistId)) {
      throw new CustomError(400, 'Invalid watchlist id');
    }
    await this.db.read();
    const watchlist = this.db.data.watchlists.find(
      (wl) => wl.id === watchlistId
    );
    if (!watchlist) {
      throw new CustomError(404, 'Watchlist not found');
    }
    return watchlist;
  }
}
