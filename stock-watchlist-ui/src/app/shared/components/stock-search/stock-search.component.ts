import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  Subject,
  takeUntil
} from 'rxjs';
import { StockSearchStore } from './stock-search.store';
@Component({
  selector: 'app-stock-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [StockSearchStore],
  templateUrl: './stock-search.component.html',
  styleUrl: './stock-search.component.scss',
})
export class StockSearchComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  public stockSearchStore = inject(StockSearchStore);
  
  @Output()
  stockSelected = new EventEmitter<string>();

  public searchForm = this.fb.group({
    searchText: [''],
  });

  ngOnInit(): void {
    this.searchForm.controls.searchText.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((searchText) => {
        searchText = searchText?.trim() || '';
        if (!searchText) {
          this.stockSearchStore.resetState();
        } else if (searchText.length > 2) {
          this.stockSearchStore.updateSearchText(searchText || '');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
