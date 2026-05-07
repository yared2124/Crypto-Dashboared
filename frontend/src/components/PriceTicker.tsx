import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import { PriceData } from "../types";

const PriceTicker: React.FC = () => {
  const [tickerCoins, setTickerCoins] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMarketOverview();
      setTickerCoins(res.data.topCoins.slice(0, 10));
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-3 mb-6 overflow-x-auto">
      <div className="flex gap-6 whitespace-nowrap">
        {tickerCoins.map((coin) => (
          <div
            key={coin.crypto_id}
            className="inline-flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full"
          >
            <img
              src={coin.image_url}
              className="w-5 h-5 rounded-full"
              alt={coin.symbol}
            />
            <span className="font-bold text-sm">
              {coin.symbol.toUpperCase()}
            </span>
            <span className="mono text-sm">
              ${coin.price_usd.toLocaleString()}
            </span>
            <span
              className={`text-xs ${coin.change_24h_percent >= 0 ? "text-emerald-400" : "text-rose-400"}`}
            >
              {coin.change_24h_percent >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(coin.change_24h_percent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
