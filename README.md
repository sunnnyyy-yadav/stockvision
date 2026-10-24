# 📈 StockVision — Advanced Institutional Stock Screener & Market Terminal

> A modern, real-time financial market analytics platform built with **React + Vite**, **Tailwind CSS**, **Recharts**, and an optional **Node.js/Express API** with **PostgreSQL schema** integration. Crafted for portfolio demonstration, algorithmic tracking, and high-performance financial data exploration.

---

## 🌟 Key Highlights

- **Smart Stock Search (`⌘K` / Spotlight Modal)**: Instant ticker and company lookup with keyboard shortcuts, trending suggestions, and quick actions.
- **Advanced Multi-Parameter Screener**: Filter across Market Cap, Sectors, P/E ratios, Daily % Change, Trading Volume, and technical indicators (RSI, 50-day SMA).
- **Interactive TradingView-Grade Charts**: Timeframes from `1D`, `1W`, `1M`, `3M`, `1Y`, to `5Y`, with customizable `SMA 20` technical overlays, Area gradients, and Candlestick/Line modes.
- **Multi-Asset Compare Studio**: Benchmark multiple stocks side-by-side with normalized comparative return curves and direct fundamental metrics.
- **Real-Time Market Pulse**: Global indices tape, CNN Fear & Greed sentiment gauge, sector performance heatmap, top momentum gainers, and financial newsfeed.
- **Watchlist & Paper Portfolio Simulator**: LocalStorage-synced watchlist with position sizing and live paper P&L calculator.
- **CSV Data Export**: Export filtered stock datasets with one click for external financial modeling.
- **Hybrid Data Feed**: High-fidelity live price tick engine with optional free Finnhub / Alpha Vantage API key support.

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React, Recharts |
| **Backend API** | Node.js, Express, CORS |
| **Database Design** | PostgreSQL (DDL schema with indexing for watchlists & price alerts) |
| **Market Feeds** | WebSocket/Tick Simulator + Finnhub API integration |

---

## 🚀 Quick Start Guide

### 1. Run the Frontend (Vite + React)
```bash
cd stockvision
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Run the Express Backend (Optional)
```bash
cd stockvision/server
npm install
npm run dev
```
Backend API will be active at **`http://localhost:5001`**.

---

## 📡 Backend API Endpoints

- `GET /api/health`: Health status and timestamp.
- `GET /api/stocks`: Search, filter by sector/cap, sort by volume, price, P/E, or market cap.
- `GET /api/stocks/:ticker`: Detailed fundamentals for a given symbol.
- `GET /api/stocks/:ticker/history?timeframe=1M`: Historical price points for charting.
- `GET /api/watchlist`: Retrieve saved watchlist items.
- `POST /api/watchlist`: Toggle ticker in saved watchlist.

---

## 🗄️ PostgreSQL Database Schema

The database schema is provided in `server/schema.sql` and includes:
- `users`: User authentication and preferences.
- `watchlists`: Multiple custom watchlists per user.
- `watchlist_items`: Symbols, target buy/sell prices, and quantities.
- `price_alerts`: Conditional notifications (Above / Below threshold).
- B-Tree indexes for fast ticker lookups and join queries.

---

## 💼 LinkedIn Showcase Recommendations

When posting this project on LinkedIn or your portfolio:
1. **Highlight the Architecture**: Mention building a full-stack financial tool with React, Tailwind CSS, Recharts, and Express.
2. **Feature Highlights**: Showcase the normalized comparison studio, live tick simulations, and paper portfolio P&L tracker.
3. **Include a Demo Video**: You can record a short 30-second screen capture or demo walkthrough.
