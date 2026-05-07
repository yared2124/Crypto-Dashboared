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

  const fetchAlerts = async () => {
    const res = await getAlerts();
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
    getCoinsList().then((res) => setCoins(res.data));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: AlertPayload = {
        cryptoId,
        targetPrice: parseFloat(targetPrice),
        direction,
      };
      await createAlert(payload);
      toast.success("Alert created");
      fetchAlerts();
      setTargetPrice("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteAlert(id);
    fetchAlerts();
    toast.success("Alert deleted");
  };

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <h3 className="text-lg font-bold mb-3">🔔 Price Alerts</h3>
      <form
        onSubmit={handleCreate}
        className="flex flex-wrap gap-3 items-end mb-4"
      >
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
          placeholder="Target price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="bg-gray-800 border rounded px-3 py-1 text-sm"
          required
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "above" | "below")}
          className="bg-gray-800 border rounded px-3 py-1 text-sm"
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <button
          type="submit"
          className="bg-cyan-600 px-4 py-1 rounded-full text-sm"
        >
          Create
        </button>
      </form>
      {alerts.length === 0 && (
        <p className="text-center text-gray-500">No alerts yet.</p>
      )}
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.alert_id}
            className="flex justify-between items-center bg-gray-800/50 p-2 rounded"
          >
            <span>
              {alert.symbol} {alert.direction} $
              {parseFloat(alert.target_price).toLocaleString()}
              {alert.is_triggered && (
                <span className="ml-2 text-xs text-yellow-500">
                  {" "}
                  (triggered)
                </span>
              )}
            </span>
            <button
              onClick={() => handleDelete(alert.alert_id)}
              className="text-rose-400 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
