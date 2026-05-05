import axios from "axios";
import { Coin } from "../models/Coin.model.js";
import { CryptoPrice } from "../models/CryptoPrice.model.js";
import { CryptoHistory } from "../models/CryptoHistory.model.js";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchAndStoreLatestPrices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: { vs_currency: "usd", order: "market_cap_desc", per_page: 100 },
    });
    const coinsData = response.data;
    for (const coin of coinsData) {
      let dbCoin = await Coin.findByCoinGeckoId(coin.id);
      if (!dbCoin) {
        const newId = await Coin.create({
          symbol: coin.symbol,
          name: coin.name,
          coin_gecko_id: coin.id,
          image_url: coin.image,
        });
        dbCoin = { crypto_id: newId };
      }
      await CryptoPrice.insert(
        dbCoin.crypto_id,
        coin.current_price,
        coin.market_cap,
        coin.total_volume,
        coin.price_change_percentage_24h,
      );
    }
    console.log("Live prices updated at", new Date().toISOString());
  } catch (err) {
    console.error("CoinGecko price fetch error:", err.message);
  }
};

export const fetchAndStoreHistoricalData = async (
  cryptoId,
  coinGeckoId,
  days = 30,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinGeckoId}/ohlc`, {
      params: { vs_currency: "usd", days },
    });
    const ohlc = response.data;
    for (const candle of ohlc) {
      const date = new Date(candle[0]).toISOString().split("T")[0];
      await CryptoHistory.insertOHLCV(
        cryptoId,
        candle[1],
        candle[2],
        candle[3],
        candle[4],
        0,
        date,
        "1d",
      );
    }
    console.log(`Historical data stored for ${coinGeckoId}`);
  } catch (err) {
    console.error("OHLCV fetch error:", err.message);
  }
};
