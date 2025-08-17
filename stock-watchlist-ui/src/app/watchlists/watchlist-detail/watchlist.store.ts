import { inject, Injectable, Signal } from '@angular/core';
import { AppBaseStore } from '../../shared/store/base.store';
import { Watchlist } from '../watchlist.model';
import { WatchlistsService } from '../../shared/services/watchlists.service';

@Injectable()
export class WatchlistStore extends AppBaseStore<Watchlist | null, string> {
  private watchlistsService = inject(WatchlistsService);
  constructor() {
    super(null, '');
  }

  loadOne(id: string) {
    this.getTracker.start();
    this.watchlistsService.getOne(id).subscribe({
      next: (data) => {
        this._stateSignal.update((state) => ({
          ...state,
          data,
        }));
      },
      error: (err) => {
        this._stateSignal.update((state) => ({
          ...state,
          data: null,
        }));
        this.getTracker.error(err?.error?.message || 'Error loading watchlist.');
        this.getTracker.success();
      },
      complete: () => {
        this.getTracker.success();
      },
    });
  }
  save(watchlist: Watchlist, id: string | null) {
    const save$ = id
      ? this.watchlistsService.updateOne(id.toString(), {...watchlist, id})
      : this.watchlistsService.createOne(watchlist);

    this.saveTracker.start();
    save$.subscribe({
      next: (data) => {
        this._stateSignal.update((state) => ({
          ...state,
          data,
        }));
        this.saveTracker.success(data);
      },
      error: (err) => {
        this._stateSignal.update((state) => ({
          ...state,
        }));
        this.saveTracker.error(err?.error?.message || 'Save watchlist failed.');
      },
    });
  }
}
