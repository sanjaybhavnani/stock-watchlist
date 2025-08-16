import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Watchlist } from '../../../watchlists/watchlist.model';
import { Stock } from '../../models/stock.model';
import { MatIconModule } from '@angular/material/icon';

type ChangeDir = 'up' | 'down' | 'same';

@Component({
  selector: 'app-stock-card',
  imports: [NgClass, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss',
})
export class StockCardComponent implements OnInit, OnChanges {
  @Input()
  stock!: Stock;

  @Input()
  latestPrice!: number;

  @Input()
  watchlists: Watchlist[] | null = null;

  @Output()
  stockAdded = new EventEmitter<{watchlist: Watchlist, stock: Stock}>()

  lastChange!: ChangeDir;
  lastCloseChange!: ChangeDir;
  change!: { percent: number; absolute: number };
  showCardRight = false;  
  ngOnInit(): void {
    if (this.stock && this.latestPrice) {
      this.showCardRight = true;
      this.onLatestPrice(this.latestPrice, this.stock.lastClose);
    }
  }

  onLatestPrice(current: number, prev?: number) {
    if (this.stock) {
      this.lastCloseChange = this.getChangeDir(current, this.stock.lastClose!);
      this.change = {
        absolute: +(current - this.stock.lastClose!).toFixed(2),
        percent: +(
          ((current - this.stock.lastClose!) / this.stock.lastClose!) *
          100
        ).toFixed(2),
      };
    }

    if (prev) {
      this.lastChange = this.getChangeDir(current, prev);
    }
  }

  getChangeDir(current: number, prev: number): ChangeDir {
    if (current > prev) {
      return 'up';
    }
    if (current < prev) {
      return 'down';
    }
    return 'same';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latestPrice'] && !changes['latestPrice'].firstChange) {
      this.showCardRight = true;
      this.onLatestPrice(
        this.latestPrice as number,
        changes['latestPrice'].previousValue
      );
    }
    if (changes['stock'] && !changes['stock'].firstChange) {
      this.showCardRight = false;
      this.onLatestPrice(this.stock?.lastClose as number);
    }
  }
}
