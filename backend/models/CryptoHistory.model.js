import pool from "../config/database.js";

export const CryptoHistory = {
  async insertOHLCV(
    cryptoId,
    open,
    high,
    low,
    close,
    volume,
    date,
    timeframe = "1d",
  ) {
    await pool.query(
      `INSERT INTO CryptoHistory (crypto_id, open_price, high_price, low_price, close_price, volume, date, timeframe)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       open_price = VALUES(open_price), high_price = VALUES(high_price), low_price = VALUES(low_price),
       close_price = VALUES(close_price), volume = VALUES(volume)`,
      [cryptoId, open, high, low, close, volume, date, timeframe],
    );
  },
  async getHistory(cryptoId, timeframe = "1d", limit = 30) {
    const [rows] = await pool.query(
      `SELECT date, open_price, high_price, low_price, close_price, volume
       FROM CryptoHistory
       WHERE crypto_id = ? AND timeframe = ?
       ORDER BY date DESC LIMIT ?`,
      [cryptoId, timeframe, limit],
    );
    return rows.reverse();
  },
};
