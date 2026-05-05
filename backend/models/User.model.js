import pool from "../config/database.js";

export const User = {
  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT user_id, username, email, created_at FROM Users WHERE user_id = ?",
      [id],
    );
    return rows[0];
  },
  async create({ username, email, password_hash }) {
    const [result] = await pool.query(
      "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, password_hash],
    );
    return result.insertId;
  },
  async updateProfile(userId, { username, email }) {
    await pool.query(
      "UPDATE Users SET username = ?, email = ? WHERE user_id = ?",
      [username, email, userId],
    );
  },
  async updatePassword(userId, newHash) {
    await pool.query("UPDATE Users SET password_hash = ? WHERE user_id = ?", [
      newHash,
      userId,
    ]);
  },
};
