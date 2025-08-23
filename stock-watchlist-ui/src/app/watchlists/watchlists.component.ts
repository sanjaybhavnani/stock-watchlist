import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../shared/components/confirmation/confirmation.component';
import { Watchlist } from './watchlist.model';
import { WatchlistsStore } from './watchlists.store';

@Component({
  selector: 'app-watchlists',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatListModule,
    MatDivider,
  ],
  providers: [WatchlistsStore],
  templateUrl: './watchlists.component.html',
  styleUrl: './watchlists.component.scss',
})
export class WatchlistsComponent implements OnInit {
  watchlistsStore = inject(WatchlistsStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  ngOnInit(): void {
    this.watchlistsStore.loadAll();
  }

  createWatchlist() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  deleteWatchlist(wl: Watchlist) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete watchlist',
        message: `Are you sure you want to delete the watchlist "${wl.name}?"`,
      }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
      if(result) {
        this.watchlistsStore.deleteOne(wl);
      }
    })
  }
}
