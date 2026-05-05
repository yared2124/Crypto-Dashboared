import { CryptoPrice } from "../models/CryptoPrice.model.js";
import { CryptoHistory } from "../models/CryptoHistory.model.js";
import { Coin } from "../models/Coin.model.js";

export const getMarketOverview = async (req, res, next) => {
  try {
    const prices = await CryptoPrice.getLatestForAll();
    const totalMarketCap = prices.reduce(
      (sum, p) => sum + (p.market_cap_usd || 0),
      0,
    );
    const totalVolume = prices.reduce(
      (sum, p) => sum + (p.volume_24h_usd || 0),
      0,
    );
    const btc = prices.find((p) => p.symbol === "BTC");
    const btcDominance = btc ? (btc.market_cap_usd / totalMarketCap) * 100 : 0;
    res.json({
      totalMarketCap,
      totalVolume,
      btcDominance,
      topCoins: prices.slice(0, 10),
    });
  } catch (err) {
    next(err);
  }
};

export const getCoinHistory = async (req, res, next) => {
  try {
    const { coinId } = req.params;
    const { timeframe = "1d", limit = 30 } = req.query;
    const history = await CryptoHistory.getHistory(
      coinId,
      timeframe,
      parseInt(limit),
    );
    res.json(history);
  } catch (err) {
    next(err);
  }
};

export const getCoinsList = async (req, res, next) => {
  try {
    const coins = await Coin.findAll();
    res.json(coins);
  } catch (err) {
    next(err);
  }
};
