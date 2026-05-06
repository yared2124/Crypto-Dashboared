import { News } from "../models/News.model.js";

export const getLatestNews = async (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit < 1) limit = 20;
    const news = await News.getLatest(limit);
    res.json(news);
  } catch (err) {
    next(err);
  }
};
