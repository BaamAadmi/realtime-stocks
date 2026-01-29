import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StockQuote, StockSymbol } from '../models/stock.models';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockCardComponent {
  @Input({ required: true }) quote!: StockQuote;
  @Output() toggle = new EventEmitter<StockSymbol>();

  onToggle(): void {
    this.toggle.emit(this.quote.symbol);
  }
}
