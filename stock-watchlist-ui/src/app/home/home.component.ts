import { Component, inject } from '@angular/core';
import { StockSearchComponent } from '../shared/components/stock-search/stock-search.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [StockSearchComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onStockSelected(symbol: string) {
    this.router.navigate(['stock', symbol], { relativeTo: this.route });
  }
  
}
