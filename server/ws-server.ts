import WebSocket, { WebSocketServer } from 'ws';
import { StockSymbol, StockQuote, WSMessage } from './types';
import { INITIAL_QUOTES } from './symbols';
import { fetchYahooQuote } from './yahoo-parser';

const PORT = 8080;
const FETCH_INTERVAL = 7000;
const wss = new WebSocketServer({ port: PORT });

interface Client {
  ws: WebSocket;
  subscribedSymbols: Set<StockSymbol>;
}

const clients: Client[] = [];
const quotes: Record<StockSymbol, StockQuote> = { ...INITIAL_QUOTES };
const lastFetch: Record<StockSymbol, number> = {} as any;

async function updateQuote(symbol: StockSymbol): Promise<void> {
  const now = Date.now();
  if (lastFetch[symbol] && now - lastFetch[symbol] < FETCH_INTERVAL) return;

  const quote = await fetchYahooQuote(symbol);
  if (quote) {
    quotes[symbol] = quote;
    lastFetch[symbol] = now;
  } else {
    quotes[symbol] = {
      ...quotes[symbol],
      currentPrice: quotes[symbol].currentPrice + (Math.random() - 0.5) * 0.5,
      lastUpdated: new Date().toISOString()
    };
  }

  broadcastQuote(symbol);
}

function broadcastQuote(symbol: StockSymbol): void {
  const message: WSMessage = {
    type: 'quote',
    payload: quotes[symbol]
  };

  clients.forEach(client => {
    if (client.subscribedSymbols.has(symbol) && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', (ws: WebSocket) => {
  const client: Client = { ws, subscribedSymbols: new Set() };
  clients.push(client);

  ws.on('message', (data: Buffer) => {
    try {
      const msg: WSMessage = JSON.parse(data.toString());
      
      if (msg.type === 'subscribe' && msg.symbols) {
        client.subscribedSymbols = new Set(msg.symbols);
        ws.send(JSON.stringify({ type: 'info', message: `Subscribed: ${msg.symbols.join(',')}` }));
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    const index = clients.indexOf(client);
    if (index > -1) clients.splice(index, 1);
  });
});

setInterval(() => {
  const activeSymbols = new Set<StockSymbol>();
  clients.forEach(c => c.subscribedSymbols.forEach(s => activeSymbols.add(s)));
  activeSymbols.forEach(symbol => updateQuote(symbol));
}, FETCH_INTERVAL);

console.log(`Yahoo WebSocket server running on ws://localhost:${PORT}`);
