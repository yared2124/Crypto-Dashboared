import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import { PriceData } from "../types";

const CARD_IDS = ["bitcoin", "ethereum", "binancecoin", "solana", "ripple"];

const PortfolioCards: React.FC = () => {
  const [cards, setCards] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMarketOverview();
        const matched = res.data.topCoins.filter((coin) =>
          CARD_IDS.includes(coin.coin_gecko_id),
        );
        setCards(matched);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-800/50 p-4 h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards.map((coin) => (
        <div
          key={coin.crypto_id}
          className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-4 backdrop-blur transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:scale-[1.02] cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/80 p-1.5 flex items-center justify-center">
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
                <p className="text-slate-400 text-xs">{coin.name}</p>
              </div>
            </div>
            <div
              className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg backdrop-blur ${
                coin.change_24h_percent >= 0
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              {coin.change_24h_percent >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(coin.change_24h_percent).toFixed(2)}%
            </div>
          </div>

          <div className="relative z-10 mt-4">
            <p className="text-xs text-slate-400 mb-1">Price</p>
            <div className="font-mono text-2xl font-bold text-white">
              $
              {coin.price_usd.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          <div className="relative z-10 mt-4 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
            <p className="text-xs text-slate-500">📊 Chart data loading...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioCards;
