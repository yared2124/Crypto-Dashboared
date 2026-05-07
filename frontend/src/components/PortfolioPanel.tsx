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

  const fetchPortfolio = async () => {
    const res = await getPortfolio();
    setHoldings(res.data);
  };

  useEffect(() => {
    fetchPortfolio();
    getCoinsList().then((res) => setCoins(res.data));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: TransactionPayload = {
        cryptoId,
        amount: parseFloat(amount),
        pricePerUnit: parseFloat(price),
        type,
      };
      await addTransaction(payload);
      toast.success("Transaction added");
      fetchPortfolio();
      setAmount("");
      setPrice("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  if (holdings.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-4 text-center">
        No holdings yet. Add a transaction.
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <h3 className="text-lg font-bold mb-3">📊 Portfolio</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left p-2">Coin</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Avg Price</th>
              <th className="text-left p-2">Current</th>
              <th className="text-left p-2">Value</th>
              <th className="text-left p-2">P&L</th>
              <th className="text-left p-2">P&L%</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h.crypto_id} className="border-b border-gray-800">
                <td className="p-2">{h.symbol}</td>
                <td className="p-2">{h.total_amount}</td>
                <td className="p-2">${h.avg_buy_price.toLocaleString()}</td>
                <td className="p-2">${h.currentPrice.toLocaleString()}</td>
                <td className="p-2">${h.totalValue.toLocaleString()}</td>
                <td
                  className={
                    h.profitLoss >= 0 ? "text-emerald-400" : "text-rose-400"
                  }
                >
                  ${h.profitLoss.toLocaleString()}
                </td>
                <td
                  className={
                    h.profitLossPercent >= 0
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }
                >
                  {h.profitLossPercent.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-3">
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
          <select
            value={cryptoId}
            onChange={(e) => setCryptoId(Number(e.target.value))}
            className="bg-gray-800 border rounded px-3 py-1 text-sm"
            required
          >
            <option value="">Select coin</option>
            {coins.map((c) => (
              <option key={c.crypto_id} value={c.crypto_id}>
                {c.symbol}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="any"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border rounded px-3 py-1 text-sm"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Price USD"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800 border rounded px-3 py-1 text-sm"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "buy" | "sell")}
            className="bg-gray-800 border rounded px-3 py-1 text-sm"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <button
            type="submit"
            className="bg-cyan-600 px-4 py-1 rounded-full text-sm"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioPanel;
