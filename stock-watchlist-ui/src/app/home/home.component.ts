import { Component } from '@angular/core';
import { StockSearchComponent } from '../shared/components/stock-search/stock-search.component';

@Component({
  selector: 'app-home',
  imports: [StockSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
