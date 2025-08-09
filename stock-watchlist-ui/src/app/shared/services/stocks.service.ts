import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private http = inject(HttpClient);
  private stockApiUrl = environment.api + '/stocks';
  constructor() {}

  searchStocks(searchText: string): Observable<Stock[]> {
    const url = `${this.stockApiUrl}?search=${encodeURIComponent(searchText)}`;
    return this.http.get<Stock[]>(url);
  }
}
