import { Stock } from '../shared/models/stock.model';

export interface Watchlist {
  id?: string;
  name: string;
  stocks: Stock[];
}
