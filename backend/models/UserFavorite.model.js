import pool from "../config/database.js";

export const UserFavorite = {
  async add(userId, cryptoId) {
    await pool.query(
      "INSERT IGNORE INTO UserFavorites (user_id, crypto_id) VALUES (?, ?)",
      [userId, cryptoId],
    );
  },
  async remove(userId, cryptoId) {
    await pool.query(
      "DELETE FROM UserFavorites WHERE user_id = ? AND crypto_id = ?",
      [userId, cryptoId],
    );
  },
  async findByUser(userId) {
    const [rows] = await pool.query(
      `SELECT c.* FROM Cryptocurrencies c
       JOIN UserFavorites uf ON c.crypto_id = uf.crypto_id
       WHERE uf.user_id = ?`,
      [userId],
    );
    return rows;
  },
};
