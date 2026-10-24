import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TickerTape({ indices = [], stocks = [] }) {
  // Combine top indices and top stocks for tape
  const tapeItems = [
    ...indices,
    ...stocks.slice(0, 10).map(s => ({
      symbol: s.ticker,
      name: s.name.split(' ')[0],
      value: `$${s.price.toFixed(2)}`,
      change: (s.change >= 0 ? '+' : '') + s.change.toFixed(2),
      changePercent: (s.changePercent >= 0 ? '+' : '') + s.changePercent.toFixed(2) + '%',
      isPositive: s.change >= 0,
      lastTick: s.lastTick
    }))
  ];

  // Duplicate for seamless infinite scroll
  const duplicatedItems = [...tapeItems, ...tapeItems];

  return (
    <div className="relative w-full bg-[#07090D] border-b border-slate-800/80 overflow-hidden py-2 text-xs select-none">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {duplicatedItems.map((item, idx) => {
          const isPos = item.isPositive ?? (item.change?.startsWith('+'));
          return (
            <div
              key={`${item.symbol}-${idx}`}
              className={`flex items-center gap-2 px-4 py-0.5 border-r border-slate-800/50 whitespace-nowrap transition-colors duration-500 ${
                item.lastTick === 'up'
                  ? 'bg-emerald-500/10'
                  : item.lastTick === 'down'
                  ? 'bg-rose-500/10'
                  : ''
              }`}
            >
              <span className="font-bold text-slate-200 tracking-wide">{item.symbol}</span>
              <span className="text-slate-400 font-mono text-[11px]">{item.value}</span>
              
              <div className={`flex items-center text-[11px] font-semibold font-mono ${
                isPos ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPos ? (
                  <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                )}
                <span>{item.changePercent}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
