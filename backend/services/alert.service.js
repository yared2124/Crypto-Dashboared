import { Alert } from "../models/Alert.model.js";
import { CryptoPrice } from "../models/CryptoPrice.model.js";

export const checkAllAlerts = async () => {
  try {
    const alerts = await Alert.getUntriggeredAlerts();
    if (alerts.length === 0) return;
    for (const alert of alerts) {
      const latest = await CryptoPrice.getLatest(alert.crypto_id);
      if (!latest) continue;
      const currentPrice = latest.price_usd;
      let triggered = false;
      if (alert.direction === "above" && currentPrice >= alert.target_price)
        triggered = true;
      if (alert.direction === "below" && currentPrice <= alert.target_price)
        triggered = true;
      if (triggered) {
        await Alert.markTriggered(alert.alert_id);
        console.log(
          `📢 Alert triggered for user ${alert.user_id}: ${alert.symbol} ${alert.direction} $${alert.target_price} → now $${currentPrice}`,
        );
      }
    }
  } catch (err) {
    console.error("Alert check error:", err);
  }
};
