// StockVision Express API Server
// Production-ready REST endpoints for Stock Screener, Charts, & Watchlists

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory Database / Initial Dataset
const STOCKS = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.25,
    change: 5.42,
    changePercent: 4.08,
    marketCap: 3390000000000,
    marketCapFormatted: '$3.39T',
    capCategory: 'Mega',
    peRatio: 52.4,
    volume: 68420000,
    avgVolume: 52000000,
    sector: 'Technology',
    industry: 'Semiconductors',
    high52: 140.76,
    low52: 39.23,
    dayHigh: 139.10,
    dayLow: 134.80,
    openPrice: 135.20,
    prevClose: 132.83,
    rsi: 68.4,
    sma50: 124.60,
    sma200: 98.40,
    beta: 1.68,
    dividendYield: 0.03,
    eps: 2.64,
    recommendation: 'Strong Buy'
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 232.50,
    change: 1.85,
    changePercent: 0.80,
    marketCap: 3540000000000,
    marketCapFormatted: '$3.54T',
    capCategory: 'Mega',
    peRatio: 34.2,
    volume: 48920000,
    avgVolume: 51200000,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    high52: 237.23,
    low52: 164.08,
    dayHigh: 233.90,
    dayLow: 231.10,
    openPrice: 231.50,
    prevClose: 230.65,
    rsi: 58.2,
    sma50: 226.40,
    sma200: 198.30,
    beta: 1.12,
    dividendYield: 0.43,
    eps: 6.80,
    recommendation: 'Buy'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 428.15,
    change: -2.35,
    changePercent: -0.55,
    marketCap: 318000000000,
    marketCapFormatted: '$3.18T',
    capCategory: 'Mega',
    peRatio: 36.8,
    volume: 21450000,
    avgVolume: 22800000,
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    high52: 468.35,
    low52: 327.00,
    dayHigh: 432.00,
    dayLow: 426.50,
    openPrice: 431.00,
    prevClose: 430.50,
    rsi: 49.1,
    sma50: 422.30,
    sma200: 415.80,
    beta: 0.89,
    dividendYield: 0.70,
    eps: 11.63,
    recommendation: 'Buy'
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 165.80,
    change: 3.12,
    changePercent: 1.92,
    marketCap: 2060000000000,
    marketCapFormatted: '$2.06T',
    capCategory: 'Mega',
    peRatio: 24.1,
    volume: 28300000,
    avgVolume: 27500000,
    sector: 'Communication',
    industry: 'Internet Content & Information',
    high52: 191.75,
    low52: 120.21,
    dayHigh: 166.50,
    dayLow: 163.40,
    openPrice: 163.80,
    prevClose: 162.68,
    rsi: 54.7,
    sma50: 163.10,
    sma200: 156.40,
    beta: 1.05,
    dividendYield: 0.48,
    eps: 6.88,
    recommendation: 'Strong Buy'
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 187.90,
    change: 2.45,
    changePercent: 1.32,
    marketCap: 1960000000000,
    marketCapFormatted: '$1.96T',
    capCategory: 'Mega',
    peRatio: 44.2,
    volume: 38700000,
    avgVolume: 42000000,
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    high52: 201.20,
    low52: 118.35,
    dayHigh: 189.20,
    dayLow: 185.90,
    openPrice: 186.20,
    prevClose: 185.45,
    rsi: 56.3,
    sma50: 182.40,
    sma200: 174.10,
    beta: 1.15,
    dividendYield: 0.00,
    eps: 4.25,
    recommendation: 'Strong Buy'
  },
  {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    price: 588.60,
    change: 8.90,
    changePercent: 1.54,
    marketCap: 1490000000000,
    marketCapFormatted: '$1.49T',
    capCategory: 'Mega',
    peRatio: 28.6,
    volume: 16200000,
    avgVolume: 14800000,
    sector: 'Communication',
    industry: 'Internet Content & Information',
    high52: 602.95,
    low52: 279.40,
    dayHigh: 592.40,
    dayLow: 583.10,
    openPrice: 584.00,
    prevClose: 579.70,
    rsi: 64.9,
    sma50: 540.20,
    sma200: 485.60,
    beta: 1.21,
    dividendYield: 0.34,
    eps: 20.58,
    recommendation: 'Strong Buy'
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    price: 218.40,
    change: -6.70,
    changePercent: -2.98,
    marketCap: 698000000000,
    marketCapFormatted: '$698B',
    capCategory: 'Large',
    peRatio: 64.5,
    volume: 72100000,
    avgVolume: 65400000,
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    high52: 271.00,
    low52: 138.80,
    dayHigh: 226.50,
    dayLow: 216.80,
    openPrice: 225.00,
    prevClose: 225.10,
    rsi: 42.1,
    sma50: 228.40,
    sma200: 205.10,
    beta: 2.34,
    dividendYield: 0.00,
    eps: 3.38,
    recommendation: 'Hold'
  },
  {
    ticker: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 43.85,
    change: 2.15,
    changePercent: 5.16,
    marketCap: 98000000000,
    marketCapFormatted: '$98.0B',
    capCategory: 'Large',
    peRatio: 112.5,
    volume: 84300000,
    avgVolume: 58000000,
    sector: 'Technology',
    industry: 'Software - Infrastructure',
    high52: 44.60,
    low52: 14.48,
    dayHigh: 44.50,
    dayLow: 42.10,
    openPrice: 42.30,
    prevClose: 41.70,
    rsi: 74.2,
    sma50: 34.20,
    sma200: 25.80,
    beta: 2.68,
    dividendYield: 0.00,
    eps: 0.39,
    recommendation: 'Buy'
  }
];

let savedWatchlist = ['NVDA', 'AAPL', 'MSFT', 'PLTR'];

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'StockVision Backend API', timestamp: new Date().toISOString() });
});

// 2. Screener: Filter & Search stocks
app.get('/api/stocks', (req, res) => {
  const { search, sector, cap, sortBy = 'marketCap', order = 'desc' } = req.query;

  let results = [...STOCKS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(s => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }

  if (sector && sector !== 'All') {
    results = results.filter(s => s.sector === sector);
  }

  if (cap && cap !== 'All') {
    results = results.filter(s => s.capCategory === cap);
  }

  results.sort((a, b) => {
    const valA = a[sortBy] ?? 0;
    const valB = b[sortBy] ?? 0;
    return order === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  res.json({
    total: results.length,
    stocks: results
  });
});

// 3. Single Stock Details
app.get('/api/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const stock = STOCKS.find(s => s.ticker === ticker);
  if (!stock) {
    return res.status(404).json({ error: `Ticker ${ticker} not found` });
  }
  res.json(stock);
});

// 4. Stock Historical Price Time-Series for Charting
app.get('/api/stocks/:ticker/history', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const timeframe = req.query.timeframe || '1M';
  const stock = STOCKS.find(s => s.ticker === ticker) || { price: 150 };

  const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 35 : timeframe === '1M' ? 30 : 50;
  const history = [];
  let currentPrice = stock.price * 0.95;

  for (let i = 0; i < points; i++) {
    const noise = (Math.random() - 0.48) * 0.02 * currentPrice;
    currentPrice = Math.max(1, currentPrice + noise);
    history.push({
      date: `Pt ${i + 1}`,
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 500000 + 800000)
    });
  }
  history[history.length - 1].price = stock.price;

  res.json({ ticker, timeframe, data: history });
});

// 5. Watchlist CRUD
app.get('/api/watchlist', (req, res) => {
  res.json({ watchlist: savedWatchlist });
});

app.post('/api/watchlist', (req, res) => {
  const { ticker } = req.body;
  if (!ticker) return res.status(400).json({ error: 'Ticker is required' });

  const upper = ticker.toUpperCase();
  if (savedWatchlist.includes(upper)) {
    savedWatchlist = savedWatchlist.filter(t => t !== upper);
  } else {
    savedWatchlist.push(upper);
  }

  res.json({ success: true, watchlist: savedWatchlist });
});

app.listen(PORT, () => {
  console.log(`🚀 StockVision API Server running at http://localhost:${PORT}`);
});
