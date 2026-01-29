# WebSocket Stock Server

Streams real-time stock data from Yahoo Finance to connected clients.

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

Server runs on `ws://localhost:8080` and fetches real data from Yahoo Finance every 7 seconds.

**Note**: For demo purposes only. Use licensed API for production.

## Protocol

### Subscribe
```json
{ "type": "subscribe", "symbols": ["AAPL", "GOOGL"] }
```

### Quote Update
```json
{
  "type": "quote",
  "payload": {
    "symbol": "AAPL",
    "currentPrice": 193.12,
    ...
  }
}
```
