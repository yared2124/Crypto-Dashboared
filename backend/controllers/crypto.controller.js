import { CryptoPrice } from "../models/CryptoPrice.model.js";
import { CryptoHistory } from "../models/CryptoHistory.model.js";
import { Coin } from "../models/Coin.model.js";

export const getMarketOverview = async (req, res, next) => {
  try {
    const prices = await CryptoPrice.getLatestForAll();

    let totalMarketCap = 0;
    let totalVolume = 0;

    // Convert string values to numbers and enrich the array
    const enrichedPrices = prices.map((price) => ({
      ...price,
      price_usd: parseFloat(price.price_usd) || 0,
      market_cap_usd: parseFloat(price.market_cap_usd) || 0,
      volume_24h_usd: parseFloat(price.volume_24h_usd) || 0,
      change_24h_percent: parseFloat(price.change_24h_percent) || 0,
    }));

    // Sum totals
    for (const coin of enrichedPrices) {
      totalMarketCap += coin.market_cap_usd;
      totalVolume += coin.volume_24h_usd;
    }

    // Calculate BTC dominance
    const btc = enrichedPrices.find((coin) => coin.symbol === "BTC");
    const btcDominance =
      btc && totalMarketCap > 0
        ? (btc.market_cap_usd / totalMarketCap) * 100
        : 0;

    res.json({
      totalMarketCap,
      totalVolume,
      btcDominance,
      topCoins: enrichedPrices.slice(0, 10),
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
    // Convert string prices to numbers
    const formattedHistory = history.map((entry) => ({
      ...entry,
      open_price: parseFloat(entry.open_price),
      high_price: parseFloat(entry.high_price),
      low_price: parseFloat(entry.low_price),
      close_price: parseFloat(entry.close_price),
      volume: parseFloat(entry.volume),
    }));
    res.json(formattedHistory);
  } catch (err) {
    next(err);
  }
};

export const getCoinsList = async (req, res, next) => {
  try {
    const coins = await Coin.findAll();
    // Ensure IDs are numbers
    const formattedCoins = coins.map((coin) => ({
      ...coin,
      crypto_id: parseInt(coin.crypto_id),
    }));
    res.json(formattedCoins);
  } catch (err) {
    next(err);
  }
};
