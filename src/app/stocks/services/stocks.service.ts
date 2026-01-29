import { Injectable, inject } from '@angular/core';
import { StockQuote, StockSymbol, WSMessage } from '../models/stock.models';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StocksStateService } from './stocks-state.service';
import { WebsocketService } from './websocket.service';

@Injectable({ providedIn: 'root' })
export class StocksService {
  private ws = inject(WebsocketService);
  private state = inject(StocksStateService);

  getStocks(): Observable<StockQuote[]> {
    return this.state.stocks$;
  }

  initialise(wsUrl: string): void {
    this.ws.connect(wsUrl);
    
    this.ws.messages$.pipe(
      filter((msg): msg is WSMessage & { type: 'quote' } => msg.type === 'quote' && !!msg.payload)
    ).subscribe(msg => {
      if (msg.payload) {
        this.state.updateQuote(msg.payload);
      }
    });

    this.subscribe();
  }

  toggleStock(symbol: StockSymbol): boolean {
    const success = this.state.toggleStock(symbol);
    if (success) {
      this.subscribe();
    }
    return success;
  }

  private subscribe(): void {
    const symbols = this.state.getEnabledSymbols();
    this.ws.send({ type: 'subscribe', symbols });
  }
}
