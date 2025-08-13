import { Routes } from '@angular/router';
import { StockDetailComponent } from './home/stock-detail/stock-detail.component';

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
];
