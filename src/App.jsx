import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TickerTape from './components/TickerTape';
import StockScreener from './components/StockScreener';
import MarketOverview from './components/MarketOverview';
import CompareStudio from './components/CompareStudio';
import StockDetailModal from './components/StockDetailModal';
import WatchlistDrawer from './components/WatchlistDrawer';
import SearchModal from './components/SearchModal';
import ApiKeyModal from './components/ApiKeyModal';
import stockApiService from './services/apiService';
import { TrendingUp, ShieldAlert, Heart } from 'lucide-react';

export default function App() {
  const [stocks, setStocks] = useState(stockApiService.getAllStocks());
  const [indices, setIndices] = useState(stockApiService.getMarketIndices());
  const [news, setNews] = useState(stockApiService.getMarketNews());
  const [sectors, setSectors] = useState(stockApiService.getMarketSectors());
  const [watchlist, setWatchlist] = useState(stockApiService.getWatchlist());
  
  const [activeTab, setActiveTab] = useState('screener'); // 'screener', 'overview', 'compare'
  const [selectedStock, setSelectedStock] = useState(null);
  const [compareTickers, setCompareTickers] = useState(['NVDA', 'AAPL', 'MSFT']);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stockvision-theme') || 'light';
  });

  // Apply theme to html root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('stockvision-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Subscribe to live simulated price ticks
  useEffect(() => {
    const unsubscribe = stockApiService.subscribeToTicks((data) => {
      setStocks([...data.stocks]);
      // If modal is currently viewing a stock, update its live object
      setSelectedStock((prev) => {
        if (!prev) return null;
        const updated = data.stocks.find(s => s.ticker === prev.ticker);
        return updated || prev;
      });
    });

    return () => unsubscribe();
  }, []);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleWatchlist = (ticker) => {
    const updated = stockApiService.toggleWatchlist(ticker);
    setWatchlist(updated);
  };

  const handleToggleLive = () => {
    const nextState = !isLive;
    setIsLive(nextState);
    stockApiService.toggleSimulation(nextState);
  };

  const handleCompareStock = (ticker) => {
    if (!compareTickers.includes(ticker)) {
      setCompareTickers((prev) => [...prev.slice(0, 3), ticker]);
    }
    setActiveTab('compare');
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLive={isLive}
        onToggleLive={handleToggleLive}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Real-time Ticker Tape */}
      <TickerTape indices={indices} stocks={stocks} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab View Switching */}
        {activeTab === 'screener' && (
          <StockScreener 
            stocks={stocks}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
            onSelectStock={(stock) => setSelectedStock(stock)}
            onCompareStock={handleCompareStock}
          />
        )}

        {activeTab === 'overview' && (
          <MarketOverview 
            stocks={stocks}
            indices={indices}
            news={news}
            sectors={sectors}
            onSelectStock={(stock) => setSelectedStock(stock)}
          />
        )}

        {activeTab === 'compare' && (
          <CompareStudio 
            stocks={stocks}
            initialTickers={compareTickers}
            onSelectStock={(stock) => setSelectedStock(stock)}
          />
        )}

      </main>

      {/* Institutional Disclaimer & Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-[#0A0D14]/90 px-4 sm:px-8 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="font-bold text-slate-300">StockVision Terminal</span>
            <span>— Advanced Multi-Asset Screener & Analytics</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              Crafted for Sunny's Portfolio
            </span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <p className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Market data simulated for algorithmic demonstration & educational analytics. Not financial advice.
          </p>
          <p>© {new Date().getFullYear()} StockVision Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Stock Deep-Dive Modal with Chart */}
      {selectedStock && (
        <StockDetailModal 
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          isWatchlisted={watchlist.includes(selectedStock.ticker)}
          onToggleWatchlist={handleToggleWatchlist}
          onCompare={handleCompareStock}
        />
      )}

      {/* Watchlist & Portfolio Drawer */}
      <WatchlistDrawer 
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        stocks={stocks}
        onToggleWatchlist={handleToggleWatchlist}
        onSelectStock={(stock) => setSelectedStock(stock)}
      />

      {/* Spotlight Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stocks={stocks}
        watchlist={watchlist}
        onToggleWatchlist={handleToggleWatchlist}
        onSelectStock={(stock) => setSelectedStock(stock)}
      />

      {/* Finnhub API Key Settings Modal */}
      <ApiKeyModal 
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
      />

    </div>
  );
}
