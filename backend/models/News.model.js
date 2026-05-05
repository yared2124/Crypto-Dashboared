import pool from "../config/database.js";

export const News = {
  async insertIfNotExists(title, summary, source, url, imageUrl, publishedAt) {
    await pool.query(
      `INSERT IGNORE INTO News (title, summary, source, url, image_url, published_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, summary, source, url, imageUrl, publishedAt],
    );
  },
  async getLatest(limit = 20) {
    const [rows] = await pool.query(
      "SELECT * FROM News ORDER BY published_at DESC LIMIT ?",
      [limit],
    );
    return rows;
  },
};
