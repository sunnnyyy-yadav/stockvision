import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Star, 
  Radio, 
  Key, 
  Layers, 
  BarChart2, 
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  onOpenSearch, 
  watchlistCount, 
  onOpenWatchlist, 
  onOpenApiKey,
  activeTab,
  setActiveTab,
  isLive,
  onToggleLive,
  theme,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Market Status */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('screener')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  StockVision
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Institutional Screener & Analytics
              </p>
            </div>
          </div>

          {/* Market Status Pill */}
          <div className="hidden xl:flex items-center gap-2 text-xs py-1 px-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-emerald-400">Market Open</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono text-[11px]">NYSE / NASDAQ</span>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-xl border border-slate-800/80 text-sm">
          <button
            onClick={() => setActiveTab('screener')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'screener'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Screener</span>
          </button>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Market Pulse</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'compare'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Compare Studio</span>
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all text-xs"
            title="Search Stocks (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Search Ticker...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 rounded text-slate-400 font-mono border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Live Tick Simulation Toggle */}
          <button
            onClick={onToggleLive}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isLive 
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40' 
                : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Live Ticks Simulation"
          >
            <Radio className={`w-3.5 h-3.5 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span>{isLive ? 'Live Ticks' : 'Paused'}</span>
          </button>

          {/* Watchlist Counter Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-300 hover:border-amber-500/60 hover:bg-amber-500/20 transition-all text-xs font-medium"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Watchlist</span>
            <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center justify-center">
              {watchlistCount}
            </span>
          </button>

          {/* Theme Mode Toggle (Light/Dark) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-slate-700 transition-all text-xs font-medium cursor-pointer shadow-sm"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                <span className="hidden sm:inline font-semibold text-slate-700">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                <span className="hidden sm:inline font-semibold text-slate-300">Dark</span>
              </>
            )}
          </button>

          {/* API Setup Modal Trigger */}
          <button
            onClick={onOpenApiKey}
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-all"
            title="Finnhub / Real API Settings"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Nav row */}
      <div className="flex md:hidden items-center justify-around gap-1 pt-2.5 mt-2 border-t border-slate-800/60 text-xs">
        <button
          onClick={() => setActiveTab('screener')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
            activeTab === 'screener' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Screener</span>
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
            activeTab === 'overview' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Pulse</span>
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
            activeTab === 'compare' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Compare</span>
        </button>
      </div>
    </header>
  );
}
