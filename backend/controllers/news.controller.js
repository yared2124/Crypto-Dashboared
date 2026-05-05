import { News } from "../models/News.model.js";

export const getLatestNews = async (req, res, next) => {
  try {
    const limit = req.query.limit || 20;
    const news = await News.getLatest(limit);
    res.json(news);
  } catch (err) {
    next(err);
  }
};
