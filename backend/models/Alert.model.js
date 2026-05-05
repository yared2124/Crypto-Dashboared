import pool from "../config/database.js";

export const Alert = {
  async create(userId, cryptoId, targetPrice, direction) {
    const [result] = await pool.query(
      `INSERT INTO Alerts (user_id, crypto_id, target_price, direction)
       VALUES (?, ?, ?, ?)`,
      [userId, cryptoId, targetPrice, direction],
    );
    return result.insertId;
  },
  async findByUser(userId) {
    const [rows] = await pool.query(
      `SELECT a.*, c.symbol, c.name, c.coin_gecko_id
       FROM Alerts a
       JOIN Cryptocurrencies c ON a.crypto_id = c.crypto_id
       WHERE a.user_id = ?
       ORDER BY a.created_at DESC`,
      [userId],
    );
    return rows;
  },
  async deleteById(alertId, userId) {
    const [result] = await pool.query(
      "DELETE FROM Alerts WHERE alert_id = ? AND user_id = ?",
      [alertId, userId],
    );
    return result.affectedRows > 0;
  },
  async getUntriggeredAlerts() {
    const [rows] = await pool.query(
      `SELECT a.*, c.coin_gecko_id
       FROM Alerts a
       JOIN Cryptocurrencies c ON a.crypto_id = c.crypto_id
       WHERE a.is_triggered = FALSE`,
    );
    return rows;
  },
  async markTriggered(alertId) {
    await pool.query(
      "UPDATE Alerts SET is_triggered = TRUE, triggered_at = NOW() WHERE alert_id = ?",
      [alertId],
    );
  },
};
