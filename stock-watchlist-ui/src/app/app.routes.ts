import { Routes } from '@angular/router';
import { StockDetailComponent } from './home/stock-detail/stock-detail.component';
import { WatchlistDetailComponent } from './watchlists/watchlist-detail/watchlist-detail.component';
import { WatchlistLiveComponent } from './watchlists/watchlist-live/watchlist-live.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'stock/:symbol',
        component: StockDetailComponent,
      },
    ],
  },
  {
    path: 'watchlists',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./watchlists/watchlists.component').then(
            (m) => m.WatchlistsComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './watchlists/watchlist-detail/watchlist-detail.component'
          ).then((m) => m.WatchlistDetailComponent),
      },
      {
        path: ':id/live',
        loadComponent: () =>
          import('./watchlists/watchlist-live/watchlist-live.component').then(
            (m) => m.WatchlistLiveComponent
          ),
      },
    ],
  },
];
