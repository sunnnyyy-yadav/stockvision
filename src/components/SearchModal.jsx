import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  stocks = [], 
  watchlist = [], 
  onToggleWatchlist, 
  onSelectStock 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Results
  const results = stocks.filter(stock => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      stock.ticker.toLowerCase().includes(q) ||
      stock.name.toLowerCase().includes(q) ||
      stock.sector.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  // Handle keyboard up/down & enter
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelectStock(results[selectedIndex]);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#0E121A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        
        {/* Input Bar */}
        <div className="relative flex items-center p-4 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search company (Apple) or ticker (NVDA)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="px-4 py-2.5 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Trending:</span>
            {['NVDA', 'AAPL', 'MSFT', 'PLTR', 'TSLA'].map((ticker) => (
              <button
                key={ticker}
                onClick={() => setQuery(ticker)}
                className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-cyan-400 font-mono text-[11px] transition-colors"
              >
                ${ticker}
              </button>
            ))}
          </div>
        )}

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No matching assets found for "{query}"
            </div>
          ) : (
            results.map((stock, idx) => {
              const isSelected = idx === selectedIndex;
              const isWatchlisted = watchlist.includes(stock.ticker);
              const isPos = stock.change >= 0;

              return (
                <div
                  key={stock.ticker}
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-cyan-500/10' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                      {stock.ticker.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{stock.ticker}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {stock.sector}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">{stock.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="font-bold text-white text-sm">${stock.price.toFixed(2)}</div>
                      <div className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        isPos ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {isPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(stock.ticker);
                      }}
                      className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate: ↑ ↓</span>
          <span>Select: ↵ Enter</span>
          <span>Close: ESC</span>
        </div>

      </div>
    </div>
  );
}
