import { Portfolio } from "../models/Portfolio.model.js";
import { CryptoPrice } from "../models/CryptoPrice.model.js";

export const getPortfolio = async (req, res, next) => {
  try {
    const holdings = await Portfolio.getUserHoldings(req.user.id);
    const enriched = [];
    for (const h of holdings) {
      const latest = await CryptoPrice.getLatest(h.crypto_id);
      if (latest) {
        const currentPrice = latest.price_usd;
        const totalValue = currentPrice * h.total_amount;
        const invested = h.total_amount * h.avg_buy_price;
        const profitLoss = totalValue - invested;
        const profitLossPercent = invested ? (profitLoss / invested) * 100 : 0;
        enriched.push({
          ...h,
          currentPrice,
          totalValue,
          invested,
          profitLoss,
          profitLossPercent,
        });
      }
    }
    res.json(enriched);
  } catch (err) {
    next(err);
  }
};

export const addTransaction = async (req, res, next) => {
  try {
    const { cryptoId, amount, pricePerUnit, type, notes } = req.body;
    const sign = type === "buy" ? amount : -amount;
    await Portfolio.addTransaction(
      req.user.id,
      cryptoId,
      sign,
      pricePerUnit,
      type,
      notes,
    );
    res.status(201).json({ message: "Transaction added" });
  } catch (err) {
    next(err);
  }
};
