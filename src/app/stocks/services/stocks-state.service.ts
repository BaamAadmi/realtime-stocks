import { StockQuote, StockSymbol } from '../models/stock.models';
import { MAX_ENABLED_STOCKS, SUPPORTED_SYMBOLS } from './symbol-utils';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'stocks_enabled_state';

@Injectable({ providedIn: 'root' })
export class StocksStateService {
  private stocksSubject = new BehaviorSubject<StockQuote[]>(this.initializeStocks());
  stocks$ = this.stocksSubject.asObservable();

  private initializeStocks(): StockQuote[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    const enabledSymbols = saved ? JSON.parse(saved) : SUPPORTED_SYMBOLS;

    return SUPPORTED_SYMBOLS.map(symbol => ({
      symbol,
      name: this.getStockName(symbol),
      currentPrice: 0,
      dayHigh: 0,
      dayLow: 0,
      week52High: 0,
      week52Low: 0,
      lastUpdated: new Date().toISOString(),
      enabled: enabledSymbols.includes(symbol)
    }));
  }

  private getStockName(symbol: StockSymbol): string {
    const names: Record<StockSymbol, string> = {
      AAPL: 'Apple Inc.',
      GOOGL: 'Alphabet Inc.',
      MSFT: 'Microsoft Corporation',
      TSLA: 'Tesla, Inc.'
    };
    return names[symbol];
  }

  updateQuote(quote: Omit<StockQuote, 'enabled'>): void {
    const stocks = this.stocksSubject.value;
    const index = stocks.findIndex(s => s.symbol === quote.symbol);
    if (index !== -1 && stocks[index].enabled) {
      stocks[index] = { ...stocks[index], ...quote };
      this.stocksSubject.next([...stocks]);
    }
  }

  toggleStock(symbol: StockSymbol): boolean {
    const stocks = this.stocksSubject.value;
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return false;

    const enabledCount = stocks.filter(s => s.enabled).length;
    if (!stock.enabled && enabledCount >= MAX_ENABLED_STOCKS) {
      return false;
    }

    stock.enabled = !stock.enabled;
    this.stocksSubject.next([...stocks]);
    this.saveEnabledState();
    return true;
  }

  getEnabledSymbols(): StockSymbol[] {
    return this.stocksSubject.value.filter(s => s.enabled).map(s => s.symbol);
  }

  private saveEnabledState(): void {
    const enabled = this.getEnabledSymbols();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enabled));
  }
}
