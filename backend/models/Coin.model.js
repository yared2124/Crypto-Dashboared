import pool from "../config/database.js";

export const Coin = {
  async findAll(activeOnly = true) {
    let query = "SELECT * FROM Cryptocurrencies";
    if (activeOnly) query += " WHERE is_active = 1";
    const [rows] = await pool.query(query);
    return rows;
  },
  async findBySymbol(symbol) {
    const [rows] = await pool.query(
      "SELECT * FROM Cryptocurrencies WHERE symbol = ?",
      [symbol],
    );
    return rows[0];
  },
  async findByCoinGeckoId(geckoId) {
    const [rows] = await pool.query(
      "SELECT * FROM Cryptocurrencies WHERE coin_gecko_id = ?",
      [geckoId],
    );
    return rows[0];
  },
  async create({ symbol, name, coin_gecko_id, image_url }) {
    const [result] = await pool.query(
      "INSERT INTO Cryptocurrencies (symbol, name, coin_gecko_id, image_url) VALUES (?, ?, ?, ?)",
      [symbol, name, coin_gecko_id, image_url],
    );
    return result.insertId;
  },
};
