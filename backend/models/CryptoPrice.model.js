import pool from "../config/database.js";

export const CryptoPrice = {
  async insert(
    cryptoId,
    priceUsd,
    marketCapUsd,
    volume24hUsd,
    change24hPercent,
  ) {
    await pool.query(
      `INSERT INTO CryptoPrices (crypto_id, price_usd, market_cap_usd, volume_24h_usd, change_24h_percent)
       VALUES (?, ?, ?, ?, ?)`,
      [cryptoId, priceUsd, marketCapUsd, volume24hUsd, change24hPercent],
    );
  },
  async getLatest(cryptoId) {
    const [rows] = await pool.query(
      `SELECT price_usd, market_cap_usd, volume_24h_usd, change_24h_percent, last_updated
       FROM CryptoPrices WHERE crypto_id = ? ORDER BY last_updated DESC LIMIT 1`,
      [cryptoId],
    );
    return rows[0];
  },
  async getLatestForAll() {
    const [rows] = await pool.query(`
      SELECT cp.*, c.symbol, c.name, c.coin_gecko_id, c.image_url
      FROM CryptoPrices cp
      JOIN Cryptocurrencies c ON cp.crypto_id = c.crypto_id
      WHERE (cp.crypto_id, cp.last_updated) IN (
        SELECT crypto_id, MAX(last_updated) FROM CryptoPrices GROUP BY crypto_id
      )
    `);
    return rows;
  },
};
