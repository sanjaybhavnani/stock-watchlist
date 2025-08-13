import { NgClass } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Stock } from '../../models/stock.model';

type ChangeDir = 'up' | 'down' | 'same';

@Component({
  selector: 'app-stock-card',
  imports: [NgClass],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss',
})
export class StockCardComponent implements OnInit, OnChanges {
  @Input()
  stock!: Stock;

  @Input()
  latestPrice!: number;

  lastChange!: ChangeDir;
  lastCloseChange!: ChangeDir;
  change!: { percent: number; absolute: number };

  ngOnInit(): void {
    if (this.stock && this.latestPrice) {
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
      this.onLatestPrice(
        this.latestPrice as number,
        changes['latestPrice'].previousValue
      );
    }
    if (changes['stock'] && !changes['stock'].firstChange) {
      this.onLatestPrice(this.stock?.lastClose as number);
    }
  }
}
