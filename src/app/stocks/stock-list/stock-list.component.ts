import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { StockQuote, StockSymbol } from '../models/stock.models';

import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { StocksService } from '../services/stocks.service';
import { StockCardComponent } from '../stock-card/stock-card.component';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, StockCardComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockListComponent implements OnInit {
  private readonly stocksService = inject(StocksService);
  stocks$ = this.stocksService.getStocks();

  ngOnInit(): void {
    this.stocksService.initialise(environment.wsUrl);
  }

  onToggle(symbol: StockSymbol): void {
    this.stocksService.toggleStock(symbol);
  }

  trackBySymbol(_: number, quote: StockQuote): StockSymbol {
    return quote.symbol;
  }
}
