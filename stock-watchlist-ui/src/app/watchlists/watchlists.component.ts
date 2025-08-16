import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WatchlistsStore } from './watchlists.store';
import { MatDivider, MatListModule } from '@angular/material/list';
import { Watchlist } from './watchlist.model';

@Component({
  selector: 'app-watchlists',
  imports: [MatButtonModule, MatIconModule, RouterLink, MatListModule, MatDivider],
  providers: [WatchlistsStore],
  templateUrl: './watchlists.component.html',
  styleUrl: './watchlists.component.scss',
})
export class WatchlistsComponent implements OnInit {
  watchlistsStore = inject(WatchlistsStore);
  private router = inject(Router);
  private route =  inject(ActivatedRoute);
  ngOnInit(): void {
    this.watchlistsStore.loadAll();
  }

  createWatchlist() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  gotoWatchlist(wl: Watchlist) {
    
  }
}
