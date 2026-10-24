// StockVision API Service
// Handles realistic live tick simulations, Finnhub API fallback, and Watchlist storage

import { INITIAL_STOCKS, MARKET_INDICES, MARKET_NEWS, MARKET_SECTORS, generateHistoryForStock } from '../data/stocksData';

const WATCHLIST_STORAGE_KEY = 'stockvision_watchlist_tickers';
const API_KEY_STORAGE_KEY = 'stockvision_finnhub_key';

class StockApiService {
  constructor() {
    this.stocks = [...INITIAL_STOCKS];
    this.subscribers = new Set();
    this.simulationInterval = null;
    this.isLiveSimulating = true;
  }

  // Watchlist helpers
  getWatchlist() {
    try {
      const saved = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // default watchlist
    return ['NVDA', 'AAPL', 'MSFT', 'PLTR', 'COIN'];
  }

  saveWatchlist(tickers) {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(tickers));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }

  toggleWatchlist(ticker) {
    const list = this.getWatchlist();
    let updated;
    if (list.includes(ticker)) {
      updated = list.filter(t => t !== ticker);
    } else {
      updated = [...list, ticker];
    }
    this.saveWatchlist(updated);
    return updated;
  }

  // API Key management
  getApiKey() {
    try {
      return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  }

  setApiKey(key) {
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    } catch (e) {
      console.error('Failed to save API key', e);
    }
  }

  // Subscribe to live simulated price ticks
  subscribeToTicks(callback) {
    this.subscribers.add(callback);
    if (!this.simulationInterval && this.isLiveSimulating) {
      this.startSimulation();
    }
    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.stopSimulation();
      }
    };
  }

  startSimulation() {
    if (this.simulationInterval) return;
    this.simulationInterval = setInterval(() => {
      this.tickRandomStocks();
    }, 2800);
  }

  stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  toggleSimulation(enable) {
    this.isLiveSimulating = enable;
    if (enable) {
      this.startSimulation();
    } else {
      this.stopSimulation();
    }
  }

  // Simulate realistic market price oscillations
  tickRandomStocks() {
    // Pick 2-4 random stocks to tick
    const countToUpdate = Math.floor(Math.random() * 3) + 2;
    const updatedStocks = [...this.stocks];
    const tickedTickers = [];

    for (let i = 0; i < countToUpdate; i++) {
      const randomIndex = Math.floor(Math.random() * updatedStocks.length);
      const stock = { ...updatedStocks[randomIndex] };

      // Micro movement between -0.4% and +0.4%
      const deltaPercent = (Math.random() - 0.49) * 0.45;
      const priceDelta = Number((stock.price * (deltaPercent / 100)).toFixed(2));
      
      const newPrice = Number((stock.price + priceDelta).toFixed(2));
      const newChange = Number((stock.change + priceDelta).toFixed(2));
      const newChangePercent = Number(((newChange / stock.prevClose) * 100).toFixed(2));
      
      stock.price = newPrice;
      stock.change = newChange;
      stock.changePercent = newChangePercent;
      stock.lastTick = priceDelta >= 0 ? 'up' : 'down';
      stock.lastTickTime = Date.now();

      // update day high/low
      if (newPrice > stock.dayHigh) stock.dayHigh = newPrice;
      if (newPrice < stock.dayLow) stock.dayLow = newPrice;

      updatedStocks[randomIndex] = stock;
      tickedTickers.push(stock.ticker);
    }

    this.stocks = updatedStocks;
    this.notifySubscribers({
      stocks: this.stocks,
      tickedTickers,
    });
  }

  notifySubscribers(data) {
    this.subscribers.forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error('Subscriber callback error', err);
      }
    });
  }

  // Get all stocks
  getAllStocks() {
    return this.stocks;
  }

  // Get specific stock
  getStockByTicker(ticker) {
    return this.stocks.find(s => s.ticker.toUpperCase() === ticker.toUpperCase()) || null;
  }

  // Get historical data for chart
  getHistoricalData(ticker, timeframe = '1M') {
    const stock = this.getStockByTicker(ticker);
    const basePrice = stock ? stock.price : 150;
    return generateHistoryForStock(basePrice, timeframe);
  }

  // Get market indices & news
  getMarketIndices() {
    return MARKET_INDICES;
  }

  getMarketNews() {
    return MARKET_NEWS;
  }

  getMarketSectors() {
    return MARKET_SECTORS;
  }
}

export const stockApiService = new StockApiService();
export default stockApiService;
