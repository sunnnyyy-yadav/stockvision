import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Trash2, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator,
  Eye,
  Wallet,
  Sparkles
} from 'lucide-react';

export default function WatchlistDrawer({ 
  isOpen, 
  onClose, 
  watchlist = [], 
  stocks = [], 
  onToggleWatchlist, 
  onSelectStock 
}) {
  const [sharesOwned, setSharesOwned] = useState({
    NVDA: 15,
    AAPL: 10,
    MSFT: 5,
    PLTR: 50,
  });

  if (!isOpen) return null;

  const watchlistedStocks = stocks.filter(s => watchlist.includes(s.ticker));

  const handleShareChange = (ticker, value) => {
    setSharesOwned(prev => ({
      ...prev,
      [ticker]: Math.max(0, parseInt(value, 10) || 0)
    }));
  };

  // Portfolio calculations
  let totalPortfolioValue = 0;
  let totalDailyPnL = 0;

  watchlistedStocks.forEach(s => {
    const qty = sharesOwned[s.ticker] || 0;
    const value = s.price * qty;
    const dayGain = s.change * qty;
    totalPortfolioValue += value;
    totalDailyPnL += dayGain;
  });

  const totalDailyPnLPct = totalPortfolioValue > 0 ? (totalDailyPnL / (totalPortfolioValue - totalDailyPnL)) * 100 : 0;
  const isPos = totalDailyPnL >= 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#0C0F17] border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Watchlist & Portfolio</h3>
              <p className="text-xs text-slate-400">{watchlistedStocks.length} Assets Tracked</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portfolio Simulated Summary Card */}
        <div className="p-4 border-b border-slate-800 bg-gradient-to-br from-slate-900/90 to-[#0A0D14]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Wallet className="w-3.5 h-3.5 text-cyan-400" /> Simulated Portfolio Value
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
              Live Paper P&L
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black font-mono text-white">
            ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div className={`flex items-center gap-1.5 text-xs font-bold font-mono mt-1 ${
            isPos ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {isPos ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>
              {isPos ? '+' : ''}${totalDailyPnL.toFixed(2)} ({isPos ? '+' : ''}{totalDailyPnLPct.toFixed(2)}%)
            </span>
            <span className="text-slate-500 font-sans font-normal">Today</span>
          </div>
        </div>

        {/* Stocks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {watchlistedStocks.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-sans">
              <Star className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <p className="font-semibold text-slate-400 text-sm">Your Watchlist is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[220px] mx-auto">
                Click the star icon next to any stock to add it here.
              </p>
            </div>
          ) : (
            watchlistedStocks.map((stock) => {
              const stockPos = stock.change >= 0;
              const qty = sharesOwned[stock.ticker] || 0;
              const holdingVal = stock.price * qty;

              return (
                <div 
                  key={stock.ticker}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div 
                      onClick={() => {
                        onSelectStock(stock);
                        onClose();
                      }}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                        {stock.ticker.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                          {stock.ticker}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[120px]">
                          {stock.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right font-mono">
                        <div className="font-bold text-slate-200 text-sm">${stock.price.toFixed(2)}</div>
                        <div className={`text-[11px] font-semibold flex items-center justify-end gap-0.5 ${
                          stockPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {stockPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stockPos ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleWatchlist(stock.ticker)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Simulator Shares Input */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <span>Shares:</span>
                      <input
                        type="number"
                        min="0"
                        value={qty}
                        onChange={(e) => handleShareChange(stock.ticker, e.target.value)}
                        className="w-14 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-center text-white focus:outline-none focus:border-cyan-500 text-xs"
                      />
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Value: <strong className="text-slate-200">${holdingVal.toFixed(2)}</strong>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-500 text-center">
          Watchlist automatically synchronized with your browser storage.
        </div>

      </div>
    </div>
  );
}
