import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Watchlist } from "../../watchlists/watchlist.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WatchlistsService {
    private http = inject(HttpClient);
    private endpoint = environment.api + '/watchlists/';

    getAll(): Observable<Watchlist[]> {
        return this.http.get<Watchlist[]>(this.endpoint);
    }

    getOne(id: string): Observable<Watchlist> {
        return this.http.get<Watchlist>(`${this.endpoint}${id}`);
    }

    createOne(watchlist: Watchlist): Observable<Watchlist> {
        return this.http.post<Watchlist>(this.endpoint, watchlist);
    }

    updateOne(id: string, watchlist: Watchlist): Observable<Watchlist> {
        return this.http.put<Watchlist>(`${this.endpoint}${id}`, watchlist);
    }

    deleteOne(id: string): Observable<void> {
        return this.http.delete<void>(`${this.endpoint}${id}`);
    }
}