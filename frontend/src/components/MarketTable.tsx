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
    <div className="glass-card rounded-2xl p-4 overflow-x-auto">
      <div className="flex justify-between mb-4 gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Filter coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm w-64"
        />
        <div className="text-sm text-gray-400">
          Page {page} of {Math.ceil(sorted.length / pageSize)}
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr>
            <th
              onClick={() => handleSort("market_cap_usd")}
              className="text-left p-2 cursor-pointer"
            >
              #
            </th>
            <th
              onClick={() => handleSort("name")}
              className="text-left p-2 cursor-pointer"
            >
              Coin
            </th>
            <th
              onClick={() => handleSort("price_usd")}
              className="text-left p-2 cursor-pointer"
            >
              Price
            </th>
            <th
              onClick={() => handleSort("change_24h_percent")}
              className="text-left p-2 cursor-pointer"
            >
              24h %
            </th>
            <th
              onClick={() => handleSort("volume_24h_usd")}
              className="text-left p-2 cursor-pointer"
            >
              Volume
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((coin) => (
            <tr
              key={coin.crypto_id}
              className="border-b border-gray-800 hover:bg-cyan-950/20"
            >
              <td className="p-2">${coin.market_cap_usd.toLocaleString()}</td>
              <td className="p-2 flex items-center gap-2">
                <img
                  src={coin.image_url}
                  className="w-5 h-5"
                  alt={coin.symbol}
                />
                <span>{coin.name}</span>
                <span className="text-gray-500 text-xs uppercase">
                  {coin.symbol}
                </span>
              </td>
              <td className="mono p-2">${coin.price_usd.toLocaleString()}</td>
              <td
                className={
                  coin.change_24h_percent >= 0
                    ? "text-emerald-400"
                    : "text-rose-400"
                }
              >
                {coin.change_24h_percent >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(coin.change_24h_percent).toFixed(2)}%
              </td>
              <td className="mono p-2">
                ${coin.volume_24h_usd.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="glass-card px-3 py-1 rounded-full text-sm"
        >
          Prev
        </button>
        <button
          disabled={page * pageSize >= sorted.length}
          onClick={() => setPage((p) => p + 1)}
          className="glass-card px-3 py-1 rounded-full text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MarketTable;
