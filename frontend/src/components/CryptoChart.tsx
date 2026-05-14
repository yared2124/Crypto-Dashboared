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
import { AxiosResponse } from "axios";

const CryptoChart: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoinId, setSelectedCoinId] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<string>("1d");
  const [chartData, setChartData] = useState<{ date: string; price: number }[]>(
    [],
  );

  useEffect(() => {
    getCoinsList().then((res: AxiosResponse<Coin[]>) => setCoins(res.data));
  }, []);

  useEffect(() => {
    if (!selectedCoinId) return;
    getCoinHistory(selectedCoinId, timeframe, 30).then(
      (res: AxiosResponse<HistoricalCandle[]>) => {
        const formatted = res.data.map((item: HistoricalCandle) => ({
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: item.close_price,
        }));
        setChartData(formatted);
      },
    );
  }, [selectedCoinId, timeframe]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex-1 min-w-64">
          <select
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(Number(e.target.value))}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {coins.map((c) => (
              <option key={c.crypto_id} value={c.crypto_id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["1d", "7d", "30d", "90d", "1y"].map((tf) => (
            <button
              key={tf}
              onClick={() =>
                setTimeframe(tf === "1y" ? "365" : tf.replace("d", ""))
              }
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                timeframe === (tf === "1y" ? "365" : tf.replace("d", ""))
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.2}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#475569" }}
            />
            <YAxis
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#475569" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "#06b6d4",
                borderRadius: "12px",
                boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
              }}
              labelStyle={{ color: "#e2e8f0" }}
              formatter={(value: any) => {
                if (value === undefined || value === null)
                  return ["N/A", "Price"];
                const num =
                  typeof value === "number" ? value : parseFloat(value);
                if (isNaN(num)) return ["N/A", "Price"];
                return [
                  `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
                  "Price",
                ];
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#colorPrice)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Loading chart data...
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoChart;
