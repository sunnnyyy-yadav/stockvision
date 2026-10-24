import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Plus, 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Check,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { generateHistoryForStock } from '../data/stocksData';

const COLOR_PALETTE = ['#06B6D4', '#10B981', '#A855F7', '#F59E0B', '#F43F5E'];

export default function CompareStudio({ 
  stocks = [], 
  initialTickers = ['NVDA', 'AAPL', 'MSFT'],
  onSelectStock 
}) {
  const [selectedTickers, setSelectedTickers] = useState(initialTickers);
  const [timeframe, setTimeframe] = useState('1M');
  const [isAdding, setIsAdding] = useState(false);
  const [searchAdd, setSearchAdd] = useState('');

  const timeframes = ['1W', '1M', '3M', '1Y', '5Y'];

  const selectedStocks = useMemo(() => {
    return selectedTickers.map(t => stocks.find(s => s.ticker === t)).filter(Boolean);
  }, [selectedTickers, stocks]);

  // Generate normalized comparative time series (percentage returns from point 0)
  const comparativeChartData = useMemo(() => {
    if (selectedStocks.length === 0) return [];

    // Generate history for each stock
    const histories = selectedStocks.map(stock => ({
      ticker: stock.ticker,
      data: generateHistoryForStock(stock.price, timeframe)
    }));

    if (!histories[0] || histories[0].data.length === 0) return [];

    const numPoints = histories[0].data.length;
    const combined = [];

    // Base prices at point 0
    const basePrices = {};
    histories.forEach(h => {
      basePrices[h.ticker] = h.data[0]?.price || 1;
    });

    for (let i = 0; i < numPoints; i++) {
      const row = {
        date: histories[0].data[i]?.date || `Pt ${i}`
      };

      histories.forEach(h => {
        const pt = h.data[i];
        if (pt) {
          const base = basePrices[h.ticker];
          // Normalized % return
          const returnPct = Number((((pt.price - base) / base) * 100).toFixed(2));
          row[h.ticker] = returnPct;
          row[`${h.ticker}_raw`] = pt.price;
        }
      });

      combined.push(row);
    }

    return combined;
  }, [selectedStocks, timeframe]);

  const handleRemoveTicker = (ticker) => {
    if (selectedTickers.length <= 1) return;
    setSelectedTickers(selectedTickers.filter(t => t !== ticker));
  };

  const handleAddTicker = (ticker) => {
    if (!selectedTickers.includes(ticker) && selectedTickers.length < 5) {
      setSelectedTickers([...selectedTickers, ticker]);
    }
    setIsAdding(false);
    setSearchAdd('');
  };

  const availableToAdd = stocks.filter(s => 
    !selectedTickers.includes(s.ticker) &&
    (s.ticker.toLowerCase().includes(searchAdd.toLowerCase()) || 
     s.name.toLowerCase().includes(searchAdd.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Studio Header & Active Stocks */}
      <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Multi-Asset Performance Comparison</h2>
              <p className="text-xs text-slate-400">Benchmark returns across tech leaders and global conglomerates</p>
            </div>
          </div>

          {/* Timeframe Bar */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stock Chips & Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedStocks.map((stock, idx) => {
            const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
            return (
              <div
                key={stock.ticker}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs shadow-sm"
              >
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-bold text-white">{stock.ticker}</span>
                <span className="text-slate-400 font-mono">${stock.price.toFixed(2)}</span>
                <span className={`font-mono text-[11px] ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
                
                {selectedTickers.length > 1 && (
                  <button
                    onClick={() => handleRemoveTicker(stock.ticker)}
                    className="p-0.5 hover:text-rose-400 text-slate-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {selectedTickers.length < 5 && (
            <div className="relative">
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-dashed border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 text-xs font-medium transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Symbol</span>
              </button>

              {isAdding && (
                <div className="absolute top-10 left-0 z-30 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 animate-scale-in">
                  <input
                    type="text"
                    value={searchAdd}
                    onChange={(e) => setSearchAdd(e.target.value)}
                    placeholder="Search stock..."
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                  <div className="max-h-48 overflow-y-auto mt-2 divide-y divide-slate-800 text-xs">
                    {availableToAdd.slice(0, 6).map((s) => (
                      <div
                        key={s.ticker}
                        onClick={() => handleAddTicker(s.ticker)}
                        className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between items-center text-slate-300 hover:text-white"
                      >
                        <div>
                          <strong className="text-cyan-400">{s.ticker}</strong>
                          <span className="text-slate-500 text-[11px] ml-1.5 truncate">{s.name}</span>
                        </div>
                        <span className="font-mono text-slate-400 text-[11px]">${s.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Multi-Line Normalized Chart */}
        <div className="h-80 sm:h-96 w-full bg-[#080B10] rounded-xl border border-slate-800/80 p-2 sm:p-4 mt-5 relative">
          <div className="absolute top-3 left-4 text-[11px] text-slate-500 font-mono">
            Normalized Performance (%)
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparativeChartData} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#475569" 
                fontSize={11} 
                tickLine={false}
                dy={6}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={11} 
                tickLine={false}
                tickFormatter={(val) => `${val >= 0 ? '+' : ''}${val}%`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs backdrop-blur-md">
                        <div className="text-slate-400 font-medium mb-1.5 border-b border-slate-800 pb-1">{label}</div>
                        <div className="space-y-1 font-mono">
                          {payload.map((entry) => (
                            <div key={entry.name} className="flex items-center justify-between gap-4">
                              <span style={{ color: entry.color }} className="font-bold">
                                {entry.name}:
                              </span>
                              <span className="font-bold text-white">
                                {entry.value >= 0 ? '+' : ''}{entry.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {selectedStocks.map((stock, idx) => (
                <Line
                  key={stock.ticker}
                  type="monotone"
                  dataKey={stock.ticker}
                  name={stock.ticker}
                  stroke={COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Side-by-side Fundamental Comparison Table */}
      <div className="overflow-hidden rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl">
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Fundamental Metrics Comparison</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Head-to-Head</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-slate-400 font-sans text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Metric</th>
                {selectedStocks.map((s, idx) => (
                  <th key={s.ticker} className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length] }}
                      />
                      <span className="text-white font-bold">{s.ticker}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Current Price</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right font-bold text-white">
                    ${s.price.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Day Change</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className={`py-3 px-4 text-right font-bold ${
                    s.change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {s.change >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Market Capitalization</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right text-slate-200">
                    {s.marketCapFormatted}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">P/E Ratio (TTM)</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right text-slate-200">
                    {s.peRatio ? s.peRatio.toFixed(1) : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">RSI (14-Day)</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className={`py-3 px-4 text-right font-semibold ${
                    s.rsi > 70 ? 'text-rose-400' : s.rsi < 35 ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    {s.rsi}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Beta (Volatility)</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right text-slate-200">
                    {s.beta}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Dividend Yield</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right text-slate-200">
                    {(s.dividendYield * 100).toFixed(2)}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-400">Analyst Rating</td>
                {selectedStocks.map(s => (
                  <td key={s.ticker} className="py-3 px-4 text-right font-sans font-bold text-xs text-cyan-400">
                    {s.recommendation}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
