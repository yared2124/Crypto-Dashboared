import React, { useState, useEffect } from "react";
import {
  getAlerts,
  createAlert,
  deleteAlert,
  getCoinsList,
} from "../services/api";
import { Alert, Coin, AlertPayload } from "../types";
import toast from "react-hot-toast";

const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [cryptoId, setCryptoId] = useState<number>(0);
  const [targetPrice, setTargetPrice] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      // Silent error for empty alerts
    }
  };

  useEffect(() => {
    fetchAlerts();
    getCoinsList().then((res) => setCoins(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: AlertPayload = {
        cryptoId,
        targetPrice: parseFloat(targetPrice),
        direction,
      };
      await createAlert(payload);
      toast.success("Alert created successfully!");
      fetchAlerts();
      setTargetPrice("");
      setCryptoId(0);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error creating alert");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id);
      fetchAlerts();
      toast.success("Alert deleted");
    } catch (err: any) {
      toast.error("Error deleting alert");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Price Alerts
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Get notified when prices reach your targets
        </p>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="px-6 py-12 text-center">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p className="text-slate-400 mb-2">No alerts yet</p>
          <p className="text-sm text-slate-500">
            Create an alert to monitor price movements
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-3 max-h-64 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.alert_id}
              className="flex justify-between items-center bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {alert.symbol}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      alert.direction === "above"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {alert.direction === "above" ? "↑ Above" : "↓ Below"}
                  </span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  Target:{" "}
                  <span className="font-mono text-cyan-400">
                    $
                    {parseFloat(alert.target_price).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  {alert.is_triggered && (
                    <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                      Triggered ✓
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(alert.alert_id)}
                className="ml-2 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete alert"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Alert Form */}
      <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/20">
        <form onSubmit={handleCreate} className="space-y-4">
          <p className="text-sm font-medium text-slate-300">Create New Alert</p>
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
              value={direction}
              onChange={(e) =>
                setDirection(e.target.value as "above" | "below")
              }
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="above">Price goes above</option>
              <option value="below">Price goes below</option>
            </select>
            <input
              type="number"
              step="any"
              placeholder="Target price ($)"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white font-semibold transition-all"
          >
            {loading ? "Creating..." : "Create Alert"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlertsPanel;
