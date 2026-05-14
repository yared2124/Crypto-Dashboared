import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import { PriceData } from "../types";

const PriceTicker: React.FC = () => {
  const [tickerCoins, setTickerCoins] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMarketOverview();
        setTickerCoins(res.data.topCoins.slice(0, 10));
      } finally {
        setLoading(false);
      }
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 w-48 rounded-xl bg-slate-800/50 animate-pulse flex-shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-300 mb-3">
        Market Ticker
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {tickerCoins.map((coin) => (
          <div
            key={coin.crypto_id}
            className="snap-start flex-shrink-0 w-full sm:w-80 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur p-4 hover:border-cyan-400/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 p-1.5 flex items-center justify-center">
                  <img
                    src={coin.image_url}
                    className="w-full h-full object-contain"
                    alt={coin.symbol}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    {coin.symbol.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-400">{coin.name}</p>
                </div>
              </div>
              <div
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg backdrop-blur ${
                  coin.change_24h_percent >= 0
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {coin.change_24h_percent >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(coin.change_24h_percent).toFixed(2)}%
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              $
              {coin.price_usd.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
