import pool from "../config/database.js";

export const Portfolio = {
  async addTransaction(
    userId,
    cryptoId,
    amount,
    pricePerUnit,
    type,
    notes = null,
  ) {
    const [result] = await pool.query(
      `INSERT INTO Portfolio (user_id, crypto_id, amount, price_per_unit_usd, transaction_type, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, cryptoId, amount, pricePerUnit, type, notes],
    );
    return result.insertId;
  },
  async getUserHoldings(userId) {
    const [rows] = await pool.query(
      `SELECT c.crypto_id, c.symbol, c.name, c.coin_gecko_id, c.image_url,
              SUM(p.amount) as total_amount,
              AVG(p.price_per_unit_usd) as avg_buy_price
       FROM Portfolio p
       JOIN Cryptocurrencies c ON p.crypto_id = c.crypto_id
       WHERE p.user_id = ?
       GROUP BY p.crypto_id
       HAVING total_amount > 0`,
      [userId],
    );
    return rows;
  },
};
