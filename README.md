# Real-Time Stock Tracker

Angular 17+ application with WebSocket-based real-time stock price updates using Yahoo API.

## Features

- Real-time stock price updates via WebSocket
- Support for Hardcoded famous stocks like Apple, Google, Microsoft and Tesla.
- Toggle stocks on/off (max 4 enabled)
- Responsive design (mobile/desktop)
- OnPush change detection

## Tech Stack

- Angular 17+ (Standalone Components)
- TypeScript (strict mode)
- SCSS with responsive breakpoints
- RxJS 7+ with WebSocket
- Jest for testing
- ESLint + Prettier
- Node.js WebSocket server

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

```bash
cd server
npm start
```

### 2. Start Angular App
```bash
npm start
```

Navigate to `http://localhost:4200`

## Project Structure 
- This follows the Angular Style Guide and standards we use at SmartStream to group Features separately.

```
src/
├── app/
│   ├── stocks/
│   │   ├── models/
│   │   │   └── stock.models.ts
│   │   ├── services/
│   │   │   ├── stocks.service.ts
│   │   │   ├── stocks-state.service.ts
│   │   │   ├── websocket.service.ts
│   │   │   └── symbol-utils.ts
│   │   ├── stock-card/
│   │   │   ├── stock-card.component.ts
│   │   │   ├── stock-card.component.html
│   │   │   └── stock-card.component.scss
│   │   └── stock-list/
│   │       ├── stock-list.component.ts
│   │       ├── stock-list.component.html
│   │       └── stock-list.component.scss
│   └── app.component.ts
├── assets/
│   └── styles/
│       ├── _variables.scss
│       ├── _mixins.scss
│       └── _breakpoints.scss
└── environments/

server/
├── ws-server.ts
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

## Server

- Fetches real data from Yahoo Finance every 7s
- Parses embedded JSON from page
- Runs on `ws://localhost:8080`
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
