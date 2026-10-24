import React, { useState } from 'react';
import { X, Key, ExternalLink, Check, ShieldCheck, Zap } from 'lucide-react';
import stockApiService from '../services/apiService';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [key, setKey] = useState(stockApiService.getApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    stockApiService.setApiKey(key);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0E121A] border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <Key className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Market Data Integration</h3>
              <p className="text-xs text-slate-400">Configure Real-time or Simulated feeds</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" /> High-Fidelity Simulation Active
            </div>
            By default, StockVision runs an institutional-grade tick simulator with 35+ top assets and micro-volatility. You can optionally connect your free Finnhub token.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Finnhub API Key (Optional)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="e.g. cxxxxxxxxxx..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Don't have a key?</span>
            <a 
              href="https://finnhub.io/register" 
              target="_blank" 
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Get Free API Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Connect</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
