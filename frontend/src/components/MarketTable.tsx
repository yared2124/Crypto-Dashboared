import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";
import { PriceData } from "../types";

const MarketTable: React.FC = () => {
  const [coins, setCoins] = useState<PriceData[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof PriceData>("market_cap_usd");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    getMarketOverview().then((res) => setCoins(res.data.topCoins));
  }, []);

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()),
  );
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === "string") valA = parseFloat(valA as any);
    if (typeof valB === "string") valB = parseFloat(valB as any);
    if (sortDir === "asc") return (valA as number) - (valB as number);
    return (valB as number) - (valA as number);
  });
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: keyof PriceData) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search coins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              />
            </div>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Page <span className="text-cyan-400">{page}</span> of{" "}
            <span className="text-cyan-400">
              {Math.ceil(sorted.length / pageSize)}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300 border-b border-slate-700/50 bg-slate-800/30">
            <tr>
              <th
                onClick={() => handleSort("market_cap_usd")}
                className="text-left px-6 py-4 cursor-pointer font-semibold hover:text-cyan-400 transition"
              >
                Rank
              </th>
              <th
                onClick={() => handleSort("name")}
                className="text-left px-6 py-4 cursor-pointer font-semibold hover:text-cyan-400 transition"
              >
                Asset
              </th>
              <th
                onClick={() => handleSort("price_usd")}
                className="text-left px-6 py-4 cursor-pointer font-semibold hover:text-cyan-400 transition"
              >
                Price
              </th>
              <th
                onClick={() => handleSort("change_24h_percent")}
                className="text-left px-6 py-4 cursor-pointer font-semibold hover:text-cyan-400 transition"
              >
                24h Change
              </th>
              <th
                onClick={() => handleSort("volume_24h_usd")}
                className="text-left px-6 py-4 cursor-pointer font-semibold hover:text-cyan-400 transition"
              >
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((coin, idx) => (
              <tr
                key={coin.crypto_id}
                className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
              >
                <td className="px-6 py-4 text-slate-300 font-medium">
                  {(page - 1) * pageSize + idx + 1}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 p-1 flex items-center justify-center">
                    <img
                      src={coin.image_url}
                      className="w-full h-full object-contain"
                      alt={coin.symbol}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{coin.name}</div>
                    <div className="text-xs text-slate-400 uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-semibold text-white">
                  $
                  {coin.price_usd.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg font-semibold ${
                      coin.change_24h_percent >= 0
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {coin.change_24h_percent >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(coin.change_24h_percent).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-300">
                  ${(coin.volume_24h_usd / 1e9).toFixed(2)}B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-t border-slate-700/50 bg-slate-800/20">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>
        <button
          disabled={page * pageSize >= sorted.length}
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          Next
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MarketTable;
