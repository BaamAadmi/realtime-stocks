# Real-Time Stock Tracker

Production-ready Angular 17+ application with WebSocket-based real-time stock price updates using standalone components.

## Features

- Real-time stock price updates via WebSocket
- Support for AAPL, GOOGL, MSFT, TSLA
- Toggle stocks on/off (max 4 enabled)
- Responsive design (mobile/desktop)
- OnPush change detection
- LocalStorage persistence
- Two server modes: Mock & Yahoo Finance

## Tech Stack

- Angular 17+ (Standalone Components)
- TypeScript (strict mode)
- SCSS with responsive breakpoints
- RxJS 7+ with WebSocket
- Jest for testing
- ESLint + Prettier
- Node.js WebSocket server (ws package)

## Installation

### Install Angular App
```bash
npm install
```

### Install Server
```bash
cd server
npm install
cd ..
```

## Running the Application

### 1. Start WebSocket Server

**Mock Mode** (recommended for development):
```bash
cd server
npm run mock
```

**Yahoo Mode** (fetches real data):
```bash
cd server
npm run yahoo
```

### 2. Start Angular App
```bash
npm start
```

Navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── stock.models.ts
│   │   ├── services/
│   │   │   └── websocket.service.ts
│   │   └── utils/
│   │       └── symbol-utils.ts
│   ├── stocks/
│   │   ├── components/
│   │   │   ├── stock-list/
│   │   │   └── stock-card/
│   │   └── services/
│   │       ├── stocks.service.ts
│   │       └── stocks-state.service.ts
│   └── app.component.ts
├── assets/
│   └── styles/
│       ├── _variables.scss
│       ├── _mixins.scss
│       └── _breakpoints.scss
└── environments/

server/
├── ws-server-mock.ts
├── ws-server-yahoo.ts
├── yahoo-parser.ts
├── symbols.ts
└── types.ts
```

## Features

### Stock Management
- View up to 4 stocks simultaneously
- Toggle stocks on/off with visual feedback
- Disabled stocks are grayed out and stop receiving updates
- State persists across page reloads

### Responsive Design
- **Mobile (≤768px)**: Single column, shows current price, day high/low
- **Desktop (>768px)**: Two columns, includes 52-week high/low

### WebSocket Protocol

**Client → Server:**
```json
{
  "type": "subscribe",
  "symbols": ["AAPL", "GOOGL", "MSFT", "TSLA"]
}
```

**Server → Client:**
```json
{
  "type": "quote",
  "payload": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "currentPrice": 193.12,
    "dayHigh": 194.88,
    "dayLow": 191.45,
    "week52High": 220.00,
    "week52Low": 164.21,
    "lastUpdated": "2025-01-09T12:00:00.000Z"
  }
}
```

## Testing

```bash
npm test
```

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Server Modes

### Mock Server
- Generates synthetic price updates every 1.5s
- Random walk within 52-week ranges
- No external dependencies
- Perfect for development

### Yahoo Server
- Fetches real data from Yahoo Finance every 7s
- Parses embedded JSON from page
- Graceful fallback on errors
- **Note**: For demo purposes only. Use licensed API for production.

## Disclaimer

Fetching data from third-party sites may violate their Terms of Service. This implementation is for educational purposes. For production use, subscribe to a licensed market data API.

## Troubleshooting

**WebSocket connection fails:**
- Ensure server is running on port 8080
- Check `environment.wsUrl` matches server port

**No price updates:**
- Verify stocks are enabled (toggle switch is blue)
- Check browser console for errors
- Ensure WebSocket connection is established

**Yahoo mode not working:**
- Yahoo Finance may have changed their page structure
- Falls back to mock data with small jitter
- Consider using mock mode for reliable testing
