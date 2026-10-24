import React, { useState, useMemo } from 'react';
import { 
  X, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Maximize2,
  Share2,
  Info,
  Calendar,
  Layers,
  Activity,
  DollarSign,
  Percent,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar,
  Line,
  CartesianGrid 
} from 'recharts';
import { generateHistoryForStock } from '../data/stocksData';

export default function StockDetailModal({ 
  stock, 
  onClose, 
  isWatchlisted, 
  onToggleWatchlist,
  onCompare 
}) {
  const [timeframe, setTimeframe] = useState('1M');
  const [chartType, setChartType] = useState('area'); // 'area', 'candlestick', 'line'
  const [showSma, setShowSma] = useState(true);

  // Generate historical data based on timeframe & current price
  const chartData = useMemo(() => {
    if (!stock) return [];
    return generateHistoryForStock(stock.price, timeframe);
  }, [stock?.price, timeframe]);

  if (!stock) return null;

  const isPositive = stock.change >= 0;
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  // Calculate 52w position percentage
  const range52Percent = Math.min(
    100, 
    Math.max(0, ((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#0E121A] border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              {stock.ticker.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{stock.ticker}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  {stock.sector}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 font-medium border border-cyan-800/40 hidden sm:inline-block">
                  {stock.industry}
                </span>
              </div>
              <p className="text-sm text-slate-400 font-medium">{stock.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Watchlist Toggle */}
            <button
              onClick={() => onToggleWatchlist(stock.ticker)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isWatchlisted
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>{isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}</span>
            </button>

            {/* Compare trigger */}
            <button
              onClick={() => {
                onCompare(stock.ticker);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
              title="Compare in Studio"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Compare</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price & Summary Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#0B0E14] border-b border-slate-800/60">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Real-time Price</div>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold font-mono mt-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
              <span className="text-slate-500 font-normal">Today</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-0.5">Market Cap</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-200">
              {stock.marketCapFormatted}
            </div>
            <div className="text-xs text-cyan-400 font-medium mt-1">
              {stock.capCategory} Cap Enterprise
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-0.5">Volume (Day)</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-200">
              {(stock.volume / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Avg: {(stock.avgVolume / 1000000).toFixed(2)}M
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-0.5">Analyst Consensus</div>
            <div className="flex items-center gap-2">
              <span className={`text-base sm:text-lg font-black ${
                stock.recommendation.includes('Buy') ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {stock.recommendation}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              RSI (14): <span className="font-bold text-slate-200">{stock.rsi}</span>
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="p-4 sm:p-6">
          {/* Chart Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Timeframe Buttons */}
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

            {/* Overlays & Chart Type */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSma(!showSma)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  showSma
                    ? 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                SMA 20 Overlay
              </button>

              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    chartType === 'area' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    chartType === 'line' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Recharts Canvas */}
          <div className="h-72 sm:h-80 w-full bg-[#090C12] rounded-xl border border-slate-800/80 p-2 relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="stockGlowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={isPositive ? '#10B981' : '#F43F5E'} 
                      stopOpacity={0.35} 
                    />
                    <stop 
                      offset="95%" 
                      stopColor={isPositive ? '#10B981' : '#F43F5E'} 
                      stopOpacity={0.0} 
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false}
                  dy={6}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']} 
                  stroke="#475569" 
                  fontSize={11} 
                  tickLine={false}
                  tickFormatter={(val) => `$${val.toFixed(0)}`}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs backdrop-blur-md">
                          <div className="text-slate-400 font-medium">{data.date}</div>
                          <div className="text-base font-black font-mono text-white mt-0.5">
                            ${data.price.toFixed(2)}
                          </div>
                          {showSma && data.sma20 && (
                            <div className="text-[11px] text-indigo-400 font-mono mt-0.5">
                              SMA(20): ${data.sma20.toFixed(2)}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Vol: {(data.volume / 1000).toFixed(0)}k
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={isPositive ? '#10B981' : '#F43F5E'} 
                  strokeWidth={2.5}
                  fillOpacity={chartType === 'area' ? 1 : 0} 
                  fill="url(#stockGlowGradient)" 
                />
                {showSma && (
                  <Line 
                    type="monotone" 
                    dataKey="sma20" 
                    stroke="#818CF8" 
                    strokeWidth={1.5} 
                    dot={false}
                    strokeDasharray="4 2"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 52-Week Range Bar */}
          <div className="mt-5 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400 font-medium">52-Week Price Range</span>
              <span className="text-slate-300 font-mono text-xs font-semibold">
                ${stock.low52.toFixed(2)} — ${stock.high52.toFixed(2)}
              </span>
            </div>
            <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${range52Percent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-mono">
              <span>Low: ${stock.low52.toFixed(2)}</span>
              <span className="text-cyan-400 font-semibold">Current: ${stock.price.toFixed(2)}</span>
              <span>High: ${stock.high52.toFixed(2)}</span>
            </div>
          </div>

          {/* Key Fundamentals Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">P/E Ratio (TTM)</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                {stock.peRatio ? stock.peRatio.toFixed(1) : 'N/A'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Earnings Per Share (EPS)</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                ${stock.eps ? stock.eps.toFixed(2) : 'N/A'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Dividend Yield</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                {(stock.dividendYield * 100).toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Beta (Volatility)</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                {stock.beta}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">50-Day Moving Avg</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                ${stock.sma50.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">200-Day Moving Avg</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5">
                ${stock.sma200.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">Day's Range</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-0.5 text-xs sm:text-sm">
                ${stock.dayLow.toFixed(2)} - ${stock.dayHigh.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] text-slate-400">RSI Technical Status</div>
              <div className={`text-base font-bold font-mono mt-0.5 ${
                stock.rsi > 70 ? 'text-rose-400' : stock.rsi < 35 ? 'text-emerald-400' : 'text-slate-200'
              }`}>
                {stock.rsi} {stock.rsi > 70 ? '(Overbought)' : stock.rsi < 35 ? '(Oversold)' : '(Neutral)'}
              </div>
            </div>
          </div>

          {/* Profile & Description */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-200 block mb-1">Company Profile:</span>
            {stock.description}
          </div>

        </div>

      </div>
    </div>
  );
}
