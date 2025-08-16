import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatListModule,
  MatListOption,
  MatSelectionList,
} from '@angular/material/list';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StockSearchComponent } from '../../shared/components/stock-search/stock-search.component';
import { Stock } from '../../shared/models/stock.model';
import { WatchlistStore } from './watchlist.store';
import { ErrorNotificationComponent } from '../../shared/components/error-notification/error-notification.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-watchlist',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    StockSearchComponent,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    ErrorNotificationComponent,
    MatSnackBarModule,
  ],
  templateUrl: './watchlist-detail.component.html',
  providers: [WatchlistStore],
  styleUrl: './watchlist-detail.component.scss',
})
export class WatchlistDetailComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  watchlistStore = inject(WatchlistStore);
  isNewWatchlist = false;
  watchlistId!: string;
  form = this.fb.group({
    name: ['', Validators.required],
  });

  watchlistStocks: Stock[] = [];
  destroy$ = new Subject<void>();

  @ViewChild('watchlistStocks')
  watchlistStocks1!: MatSelectionList;

  constructor() {}
  ngOnInit() {
    this.checkIdAndLoadWatchlist();
    this.handleSaveComplete();
  }

  addStock(stock: Stock) {
    const exists = this.watchlistStocks.some((s) => s.symbol === stock.symbol);

    if (!exists) {
      this.watchlistStocks.push(stock);
    }
  }

  removeSelected(selectedOptions: MatListOption[]) {
    const selectedSymbols: string[] = selectedOptions.map(
      (item) => item.value.symbol
    );
    this.watchlistStocks = this.watchlistStocks.filter((s) =>
      !selectedSymbols.includes(s.symbol)
    );
  }

  checkIdAndLoadWatchlist() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.isNewWatchlist = true;
    } else if(id) {
      this.watchlistStore.loadOne(id);
      this.watchlistId = id;
    }
    this.watchlistStore.getTracker.callComplete$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.watchlistStocks = this.watchlistStore.data()?.stocks || [];
      this.form.controls.name.setValue(this.watchlistStore.data()?.name || '')
    })
  }

  handleSaveComplete() {
    this.watchlistStore.saveTracker.callComplete$
      .pipe(takeUntil(this.destroy$))
      .subscribe((evt) => {
        if (evt.type === 'success') {
          this.router.navigate(['/watchlists']);
        } else {
          this.snackbar.openFromComponent(ErrorNotificationComponent, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            data: {
              errorMessage: evt.errorMessage,
            },
          });
        }
      });
  }

  saveWatchlist() {
    const id = this.isNewWatchlist ? null : this.watchlistId;
    this.watchlistStore.save(
      {
        name: this.form.value.name as string,
        stocks: this.watchlistStocks,
      },
      id
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
