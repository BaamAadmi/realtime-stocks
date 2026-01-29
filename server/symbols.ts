import { StockSymbol, StockQuote } from './types';

export const SUPPORTED_SYMBOLS: StockSymbol[] = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];

export const INITIAL_QUOTES: Record<StockSymbol, StockQuote> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 193.12,
    dayHigh: 194.88,
    dayLow: 191.45,
    week52High: 220.00,
    week52Low: 164.21,
    lastUpdated: new Date().toISOString()
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 175.34,
    dayHigh: 177.20,
    dayLow: 174.10,
    week52High: 195.50,
    week52Low: 135.80,
    lastUpdated: new Date().toISOString()
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 425.67,
    dayHigh: 428.90,
    dayLow: 423.15,
    week52High: 468.35,
    week52Low: 362.90,
    lastUpdated: new Date().toISOString()
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    currentPrice: 248.23,
    dayHigh: 252.10,
    dayLow: 245.80,
    week52High: 299.29,
    week52Low: 138.80,
    lastUpdated: new Date().toISOString()
  }
};
