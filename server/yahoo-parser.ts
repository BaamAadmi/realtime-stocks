import { StockQuote, StockSymbol } from './types';

export async function fetchYahooQuote(symbol: StockSymbol): Promise<StockQuote | null> {
  try {
    const response = await fetch(`https://finance.yahoo.com/quote/${symbol}/`);
    console.log(response);
    const html = await response.text();
    
    const jsonMatch = html.match(/root\.App\.main\s*=\s*({.*?});/);
    if (!jsonMatch) return null;

    const data = JSON.parse(jsonMatch[1]);
    const quote = data?.context?.dispatcher?.stores?.QuoteSummaryStore?.price;
    
    if (!quote) return null;

    return {
      symbol,
      name: quote.shortName || quote.longName || symbol,
      currentPrice: quote.regularMarketPrice?.raw || 0,
      dayHigh: quote.regularMarketDayHigh?.raw || 0,
      dayLow: quote.regularMarketDayLow?.raw || 0,
      week52High: quote.fiftyTwoWeekHigh?.raw || 0,
      week52Low: quote.fiftyTwoWeekLow?.raw || 0,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);
    return null;
  }
}
