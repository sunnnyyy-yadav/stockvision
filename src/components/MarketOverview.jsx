import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Flame, 
  Gauge, 
  Globe2, 
  Newspaper,
  Compass,
  Zap,
  BarChart3
} from 'lucide-react';

export default function MarketOverview({ 
  stocks = [], 
  indices = [], 
  news = [], 
  sectors = [], 
  onSelectStock 
}) {
  // Sort stocks for top gainers & losers
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);
  const topLosers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 4);
  const mostActive = [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner: Indices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.slice(0, 4).map((idx) => {
          const isPos = idx.isPositive ?? idx.change.startsWith('+');
          return (
            <div 
              key={idx.symbol}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#10141F] to-[#0A0D14] border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">{idx.name}</span>
                <span className="font-mono text-slate-500">{idx.symbol}</span>
              </div>
              
              <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight my-1">
                {idx.value}
              </div>

              <div className={`flex items-center gap-1.5 text-xs font-bold font-mono ${
                isPos ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPos ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{idx.change} ({idx.changePercent})</span>
              </div>

              {/* Background ambient glow */}
              <div className={`absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-2xl pointer-events-none opacity-20 ${
                isPos ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Middle Grid: Sentiment Meter + Sector Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Fear & Greed Index Gauge */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Market Sentiment</h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                CNN Fear & Greed
              </span>
            </div>

            {/* Gauge visualization */}
            <div className="text-center my-6">
              <div className="inline-block relative">
                <div className="text-4xl sm:text-5xl font-black font-mono text-cyan-400 tracking-tight">
                  74
                </div>
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mt-1">
                  Greed
                </div>
              </div>
              
              {/* Colored multi-segment track */}
              <div className="w-full h-3 bg-slate-800 rounded-full mt-4 flex overflow-hidden">
                <div className="h-full w-1/5 bg-rose-600" title="Extreme Fear" />
                <div className="h-full w-1/5 bg-orange-500" title="Fear" />
                <div className="h-full w-1/5 bg-amber-400" title="Neutral" />
                <div className="h-full w-1/5 bg-emerald-400" title="Greed" />
                <div className="h-full w-1/5 bg-cyan-400" title="Extreme Greed" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>0 Extreme Fear</span>
                <span>50 Neutral</span>
                <span>100 Extreme Greed</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
            Investors continue momentum accumulation in Mega-Cap semiconductors and enterprise cloud solutions following favorable macro indicators.
          </div>
        </div>

        {/* Sector Performance Bars */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Sector Heatmap & Performance</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Daily %</span>
          </div>

          <div className="space-y-3">
            {sectors.map((sec) => {
              const isPos = sec.performance >= 0;
              const width = Math.min(100, Math.max(10, Math.abs(sec.performance) * 35));
              return (
                <div key={sec.name} className="flex items-center gap-3 text-xs">
                  <div className="w-36 font-medium text-slate-300 truncate">
                    {sec.name}
                  </div>
                  
                  <div className="flex-1 h-3 bg-slate-900 rounded-full overflow-hidden flex items-center">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        isPos 
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' 
                          : 'bg-gradient-to-r from-rose-600 to-rose-400'
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  <div className="w-20 text-right font-mono font-bold">
                    <span className={isPos ? 'text-emerald-400' : 'text-rose-400'}>
                      {isPos ? '+' : ''}{sec.performance.toFixed(2)}%
                    </span>
                  </div>

                  <div className="w-32 text-right text-[11px] text-slate-500 truncate hidden sm:block">
                    {sec.leader}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Gainers vs Losers Leaderboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Gainers Card */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-white text-base">Top Momentum Gainers</h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Bullish</span>
          </div>

          <div className="space-y-2.5">
            {topGainers.map((stock) => (
              <div
                key={stock.ticker}
                onClick={() => onSelectStock(stock)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/70 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                    {stock.ticker.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {stock.ticker}
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-[150px]">
                      {stock.name}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-bold text-slate-200">${stock.price.toFixed(2)}</div>
                  <div className="text-xs text-emerald-400 font-semibold flex items-center justify-end gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    +{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pullbacks / Losers Card */}
        <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="font-bold text-white text-base">Notable Pullbacks</h3>
            </div>
            <span className="text-xs text-rose-400 font-mono">Discount Radar</span>
          </div>

          <div className="space-y-2.5">
            {topLosers.map((stock) => (
              <div
                key={stock.ticker}
                onClick={() => onSelectStock(stock)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/70 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                    {stock.ticker.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {stock.ticker}
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-[150px]">
                      {stock.name}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-bold text-slate-200">${stock.price.toFixed(2)}</div>
                  <div className="text-xs text-rose-400 font-semibold flex items-center justify-end gap-0.5">
                    <ArrowDownRight className="w-3 h-3" />
                    {stock.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Financial News & Sentiment Feed */}
      <div className="p-5 rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Real-Time Market Intelligence</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Institutional Feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="text-slate-400 font-medium">{item.source}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 text-[11px] font-mono">{item.time}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      item.sentiment === 'Bullish'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                        : item.sentiment === 'Bearish'
                        ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-slate-100 text-sm leading-snug mb-2 hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500">Related:</span>
                {item.tickers.map((t) => (
                  <span 
                    key={t}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700 font-bold"
                  >
                    ${t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
