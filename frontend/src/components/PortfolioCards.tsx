import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import { PriceData } from "../types";

const CARD_IDS = ["bitcoin", "ethereum", "binancecoin", "solana", "ripple"];

const PortfolioCards: React.FC = () => {
  const [cards, setCards] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMarketOverview();
      const matched = res.data.topCoins.filter((coin) =>
        CARD_IDS.includes(coin.coin_gecko_id),
      );
      setCards(matched);
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((coin) => (
        <div
          key={coin.crypto_id}
          className="glass-card rounded-2xl p-4 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              <img src={coin.image_url} className="w-6 h-6" alt={coin.symbol} />
              <div>
                <h3 className="font-semibold">{coin.symbol.toUpperCase()}</h3>
                <p className="text-gray-400 text-xs">{coin.name}</p>
              </div>
            </div>
            <div
              className={`text-xs px-2 py-0.5 rounded-full ${
                coin.change_24h_percent >= 0
                  ? "bg-emerald-900/30 text-emerald-300"
                  : "bg-rose-900/30 text-rose-300"
              }`}
            >
              {coin.change_24h_percent >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(coin.change_24h_percent).toFixed(2)}%
            </div>
          </div>
          <div className="mono text-lg font-semibold mt-1">
            ${coin.price_usd.toLocaleString()}
          </div>
          <div className="mt-2 h-10 w-full text-center text-xs text-gray-500">
            (sparkline placeholder)
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioCards;
