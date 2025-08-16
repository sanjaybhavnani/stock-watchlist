import { inject, Injectable, signal, Signal } from '@angular/core';
import { AppBaseStore } from '../shared/store/base.store';
import { Watchlist } from './watchlist.model';
import { WatchlistsService } from '../shared/services/watchlists.service';

export enum WatchlistsStoreEvents {
  WatchlistsLoaded = 'Watchlists Loaded',
}
@Injectable()
export class WatchlistsStore extends AppBaseStore<Watchlist[], string> {

  private watchlistService = inject(WatchlistsService);
  constructor() {
    super([], '');
  }

  loadAll() {
    this.getTracker.start();
    this.watchlistService.getAll().subscribe({
      next: (data) => {
        this._stateSignal.update((state) => ({
          ...state,
          data,
        }));
      },
      error: (err) => {
        this._stateSignal.update((state) => ({
          ...state,
          data: [],
          errorMessage: err?.error?.message || 'Error loading watchlists.',
        }));
        this.getTracker.success();
      },
      complete: () => {
        this.getTracker.success();
      },
    });
  }
}
