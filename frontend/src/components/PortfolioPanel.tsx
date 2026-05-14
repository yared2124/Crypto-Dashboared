import React, { useState, useEffect } from "react";
import { getPortfolio, addTransaction, getCoinsList } from "../services/api";
import { Coin, PortfolioHolding, TransactionPayload } from "../types";
import toast from "react-hot-toast";

const PortfolioPanel: React.FC = () => {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [cryptoId, setCryptoId] = useState<number>(0);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [loading, setLoading] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const res = await getPortfolio();
      setHoldings(res.data);
    } catch (err) {
      // Silent error for empty portfolio
    }
  };

  useEffect(() => {
    fetchPortfolio();
    getCoinsList().then((res) => setCoins(res.data));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: TransactionPayload = {
        cryptoId,
        amount: parseFloat(amount),
        pricePerUnit: parseFloat(price),
        type,
      };
      await addTransaction(payload);
      toast.success("Transaction added successfully!");
      fetchPortfolio();
      setAmount("");
      setPrice("");
      setCryptoId(0);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  if (holdings.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur p-8 text-center">
        <svg
          className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-white mb-2">
          No Holdings Yet
        </h3>
        <p className="text-slate-400 mb-4">
          Start by adding your first transaction below
        </p>
      </div>
    );
  }

  const totalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalPL = holdings.reduce((sum, h) => sum + h.profitLoss, 0);

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Portfolio
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Total Value</p>
            <p className="text-2xl font-bold text-cyan-400">
              $
              {totalValue.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Total P&L</p>
            <p
              className={`text-2xl font-bold ${totalPL >= 0 ? "text-emerald-400" : "text-rose-400"}`}
            >
              $
              {Math.abs(totalPL).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300 border-b border-slate-700/50 bg-slate-800/30">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Asset</th>
              <th className="text-left px-4 py-3 font-semibold">Amount</th>
              <th className="text-right px-4 py-3 font-semibold">Avg Price</th>
              <th className="text-right px-4 py-3 font-semibold">Current</th>
              <th className="text-right px-4 py-3 font-semibold">Value</th>
              <th className="text-right px-4 py-3 font-semibold">P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.crypto_id}
                className="border-b border-slate-700/30 hover:bg-slate-700/10 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-white">
                  {h.symbol}
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {h.total_amount.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  $
                  {h.avg_buy_price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">
                  $
                  {h.currentPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-white">
                  $
                  {h.totalValue.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  <span
                    className={
                      h.profitLoss >= 0 ? "text-emerald-400" : "text-rose-400"
                    }
                  >
                    {h.profitLoss >= 0 ? "+" : ""}
                    {h.profitLossPercent.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Form */}
      <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/20">
        <form onSubmit={handleAdd} className="space-y-4">
          <p className="text-sm font-medium text-slate-300">Add Transaction</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={cryptoId}
              onChange={(e) => setCryptoId(Number(e.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="">Select coin...</option>
              {coins.map((c) => (
                <option key={c.crypto_id} value={c.crypto_id}>
                  {c.symbol}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "buy" | "sell")}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <input
              type="number"
              step="any"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="number"
              step="any"
              placeholder="Price USD"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white font-semibold transition-all"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioPanel;
