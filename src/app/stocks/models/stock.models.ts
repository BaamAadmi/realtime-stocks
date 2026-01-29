export type StockSymbol = 'AAPL' | 'GOOGL' | 'MSFT' | 'TSLA';

export interface StockQuote {
  symbol: StockSymbol;
  name: string;
  currentPrice: number;
  dayHigh: number;
  dayLow: number;
  week52High: number;
  week52Low: number;
  lastUpdated: string;
  enabled: boolean;
}

export interface WSMessage {
  type: 'subscribe' | 'quote' | 'heartbeat' | 'info' | 'error';
  symbols?: StockSymbol[];
  payload?: Omit<StockQuote, 'enabled'>;
  message?: string;
}