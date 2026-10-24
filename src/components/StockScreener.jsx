import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Star, 
  Download, 
  Filter, 
  RotateCcw,
  Eye,
  TrendingUp,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

export default function StockScreener({ 
  stocks = [], 
  watchlist = [], 
  onToggleWatchlist, 
  onSelectStock,
  onCompareStock 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCap, setSelectedCap] = useState('All');
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap'); // 'marketCap', 'price', 'changePercent', 'volume', 'peRatio'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const sectors = ['All', 'Technology', 'Communication', 'Healthcare', 'Financial Services', 'Consumer Cyclical', 'Consumer Defensive', 'Energy'];
  const capCategories = ['All', 'Mega', 'Large', 'Mid'];

  // Quick preset filters
  const presets = [
    { id: 'all', label: 'All Stocks' },
    { id: 'gainers', label: '🚀 Top Gainers (>1%)' },
    { id: 'losers', label: '🔻 Pullbacks (<0%)' },
    { id: 'tech', label: '⚡ Tech Leaders' },
    { id: 'volume', label: '🔥 High Volume (>25M)' },
    { id: 'value', label: '💎 Value Plays (P/E < 30)' },
    { id: 'oversold', label: '🌊 Oversold (RSI < 50)' },
  ];

  // Filter & Sort Logic
  const filteredStocks = useMemo(() => {
    return stocks
      .filter((stock) => {
        // Search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchesTicker = stock.ticker.toLowerCase().includes(term);
          const matchesName = stock.name.toLowerCase().includes(term);
          if (!matchesTicker && !matchesName) return false;
        }

        // Sector filter
        if (selectedSector !== 'All' && stock.sector !== selectedSector) {
          return false;
        }

        // Market Cap category
        if (selectedCap !== 'All' && stock.capCategory !== selectedCap) {
          return false;
        }

        // Price range
        if (minPrice && stock.price < parseFloat(minPrice)) return false;
        if (maxPrice && stock.price > parseFloat(maxPrice)) return false;

        // Presets
        if (selectedPreset === 'gainers' && stock.changePercent < 1.0) return false;
        if (selectedPreset === 'losers' && stock.changePercent >= 0) return false;
        if (selectedPreset === 'tech' && stock.sector !== 'Technology') return false;
        if (selectedPreset === 'volume' && stock.volume < 25000000) return false;
        if (selectedPreset === 'value' && (stock.peRatio > 30 || !stock.peRatio)) return false;
        if (selectedPreset === 'oversold' && stock.rsi >= 50) return false;

        return true;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (valA === undefined || valA === null) valA = 0;
        if (valB === undefined || valB === null) valB = 0;

        if (sortOrder === 'asc') {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
  }, [stocks, searchTerm, selectedSector, selectedCap, selectedPreset, sortBy, sortOrder, minPrice, maxPrice]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSector('All');
    setSelectedCap('All');
    setSelectedPreset('all');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('marketCap');
    setSortOrder('desc');
  };

  // CSV Export for portfolio demonstration
  const handleExportCSV = () => {
    const headers = ['Ticker', 'Company Name', 'Sector', 'Price', 'Change', 'Change %', 'Market Cap', 'Volume', 'P/E', 'RSI'];
    const rows = filteredStocks.map(s => [
      s.ticker,
      `"${s.name}"`,
      `"${s.sector}"`,
      s.price,
      s.change,
      s.changePercent,
      s.marketCap,
      s.volume,
      s.peRatio || 'N/A',
      s.rsi
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stockvision_screener_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      
      {/* Top Screener Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111622] to-[#0D111A] border border-slate-800/80 shadow-xl">
        
        {/* Preset Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-slate-800/60 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Presets:
          </span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedPreset === p.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Search, Filter Inputs & Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticker (e.g. NVDA) or name..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sector Selector */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80 transition-colors"
            >
              <option disabled value="">Sector</option>
              {sectors.map((sec) => (
                <option key={sec} value={sec}>{sec === 'All' ? 'All Sectors' : sec}</option>
              ))}
            </select>
          </div>

          {/* Market Cap Selector */}
          <div>
            <select
              value={selectedCap}
              onChange={(e) => setSelectedCap(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80 transition-colors"
            >
              <option disabled value="">Market Cap</option>
              {capCategories.map((cap) => (
                <option key={cap} value={cap}>
                  {cap === 'All' ? 'All Market Caps' : `${cap} Cap`}
                </option>
              ))}
            </select>
          </div>

          {/* Actions: Reset & Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all font-medium"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={handleExportCSV}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-xs text-cyan-300 hover:bg-cyan-600/30 hover:border-cyan-500/50 transition-all font-medium"
              title="Export filtered dataset to CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>

        </div>

        {/* Filter Summary & Matching Results counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-white font-mono">{filteredStocks.length}</strong> of {stocks.length} assets</span>
            {(selectedSector !== 'All' || selectedCap !== 'All' || searchTerm || selectedPreset !== 'all') && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                Filters Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Top Gainer: <strong className="text-emerald-400 font-mono">NVDA (+4.08%)</strong></span>
            <span className="hidden sm:inline">Active Universe: <strong className="text-slate-200">NYSE / NASDAQ / NSE</strong></span>
          </div>
        </div>

      </div>

      {/* Main Stock Table */}
      <div className="overflow-hidden rounded-2xl bg-[#0E121A] border border-slate-800/80 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/60 text-slate-400 font-medium select-none text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4 w-10 text-center">★</th>
                
                <th 
                  onClick={() => handleSort('ticker')} 
                  className="py-3 px-3 sm:px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Ticker & Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('price')} 
                  className="py-3 px-3 sm:px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('changePercent')} 
                  className="py-3 px-3 sm:px-4 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>24h Change</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('marketCap')} 
                  className="py-3 px-3 sm:px-4 text-right cursor-pointer hover:text-white transition-colors hidden md:table-cell"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('volume')} 
                  className="py-3 px-3 sm:px-4 text-right cursor-pointer hover:text-white transition-colors hidden lg:table-cell"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Volume</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('peRatio')} 
                  className="py-3 px-3 sm:px-4 text-right cursor-pointer hover:text-white transition-colors hidden xl:table-cell"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>P/E</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th className="py-3 px-3 sm:px-4 text-center hidden xl:table-cell">52W Range</th>
                
                <th className="py-3 px-3 sm:px-4 text-center">Rating</th>

                <th className="py-3 px-3 sm:px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500 font-sans">
                    <Filter className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-base font-semibold text-slate-400">No stocks match your filter criteria</p>
                    <button 
                      onClick={handleResetFilters}
                      className="mt-3 text-xs text-cyan-400 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredStocks.map((stock) => {
                  const isPos = stock.change >= 0;
                  const isWatchlisted = watchlist.includes(stock.ticker);
                  const range52 = Math.min(100, Math.max(0, ((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100));

                  return (
                    <tr 
                      key={stock.ticker}
                      onClick={() => onSelectStock(stock)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      {/* Watchlist Star */}
                      <td 
                        className="py-3 px-3 text-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWatchlist(stock.ticker);
                        }}
                      >
                        <button className="p-1 rounded hover:bg-slate-700/50 transition-colors">
                          <Star className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isWatchlisted 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-600 hover:text-slate-400'
                          }`} />
                        </button>
                      </td>

                      {/* Ticker & Name */}
                      <td className="py-3 px-3 sm:px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/70 flex items-center justify-center font-bold text-xs text-slate-200">
                            {stock.ticker.slice(0, 3)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-100 tracking-tight text-sm">
                                {stock.ticker}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-sans hidden sm:inline-block">
                                {stock.sector}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 font-sans truncate max-w-[140px] sm:max-w-[200px]">
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Live Price with Flash Animation */}
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <span className={`text-sm sm:text-base font-bold transition-colors duration-300 ${
                          stock.lastTick === 'up' 
                            ? 'text-emerald-400 bg-emerald-500/10 px-1 rounded' 
                            : stock.lastTick === 'down'
                            ? 'text-rose-400 bg-rose-500/10 px-1 rounded'
                            : 'text-slate-100'
                        }`}>
                          ${stock.price.toFixed(2)}
                        </span>
                      </td>

                      {/* Change % */}
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <div className="inline-flex items-center gap-1 font-semibold text-xs sm:text-sm">
                          <span className={`px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                            isPos 
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          }`}>
                            {isPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {isPos ? '+' : ''}{stock.change.toFixed(2)}
                        </div>
                      </td>

                      {/* Market Cap */}
                      <td className="py-3 px-3 sm:px-4 text-right text-slate-300 text-xs hidden md:table-cell font-medium">
                        {stock.marketCapFormatted}
                      </td>

                      {/* Volume */}
                      <td className="py-3 px-3 sm:px-4 text-right text-slate-400 text-xs hidden lg:table-cell">
                        {(stock.volume / 1000000).toFixed(1)}M
                      </td>

                      {/* P/E Ratio */}
                      <td className="py-3 px-3 sm:px-4 text-right text-slate-300 text-xs hidden xl:table-cell">
                        {stock.peRatio ? stock.peRatio.toFixed(1) : '-'}
                      </td>

                      {/* 52W Range Progress bar */}
                      <td className="py-3 px-3 sm:px-4 hidden xl:table-cell">
                        <div className="w-24 mx-auto">
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                              style={{ width: `${range52}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
                            <span>${stock.low52.toFixed(0)}</span>
                            <span>${stock.high52.toFixed(0)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Analyst Rating */}
                      <td className="py-3 px-3 sm:px-4 text-center font-sans">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          stock.recommendation.includes('Strong Buy')
                            ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                            : stock.recommendation.includes('Buy')
                            ? 'bg-blue-950/70 border-blue-700/60 text-blue-300'
                            : 'bg-amber-950/70 border-amber-700/60 text-amber-300'
                        }`}>
                          {stock.recommendation}
                        </span>
                      </td>

                      {/* Actions */}
                      <td 
                        className="py-3 px-3 sm:px-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onSelectStock(stock)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700/70 text-slate-400 transition-colors"
                            title="Interactive Chart"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onCompareStock(stock.ticker)}
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-500/20 hover:text-indigo-300 border border-slate-700/70 text-slate-400 transition-colors"
                            title="Add to Compare Studio"
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
