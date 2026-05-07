import React, { useState, useEffect } from "react";
import { getCoinsList, getCoinHistory } from "../services/api";
import { Coin, HistoricalCandle } from "../types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CryptoChart: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<string>("1d");
  const [chartData, setChartData] = useState<{ date: string; price: number }[]>(
    [],
  );

  useEffect(() => {
    getCoinsList().then((res) => setCoins(res.data));
  }, []);

  useEffect(() => {
    if (!selectedCoinId) return;
    getCoinHistory(selectedCoinId, timeframe, 30).then((res) => {
      const formatted = res.data.map((item: HistoricalCandle) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: item.close_price,
      }));
      setChartData(formatted);
    });
  }, [selectedCoinId, timeframe]);

  return (
    <div className="glass-card rounded-2xl p-5 mb-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <select
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded-full p-2 text-sm"
          >
            {coins.map((c) => (
              <option key={c.crypto_id} value={c.crypto_id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            {["1d", "7d", "30d", "90d", "1y"].map((tf) => (
              <button
                key={tf}
                onClick={() =>
                  setTimeframe(tf === "1y" ? "365" : tf.replace("d", ""))
                }
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  timeframe === (tf === "1y" ? "365" : tf.replace("d", ""))
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3a5e" />
          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <YAxis
            tickFormatter={(v) => `$${v.toLocaleString()}`}
            tick={{ fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "#00d4ff",
              borderRadius: "12px",
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Price",
            ]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#00d4ff"
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
