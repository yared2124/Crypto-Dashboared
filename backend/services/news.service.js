import axios from "axios";
import { News } from "../models/News.model.js";

// Example using CryptoPanic free RSS (no API key needed for basic)
export const fetchCryptoNews = async () => {
  try {
    // Using a free crypto news RSS proxy (replace with your own if needed)
    const response = await axios.get("https://cryptopanic.com/api/v1/posts/", {
      params: { public: true, kind: "news" },
    });
    const articles = response.data.results || [];
    for (const art of articles.slice(0, 30)) {
      await News.insertIfNotExists(
        art.title,
        art.metadata?.description || "",
        art.source?.domain || "CryptoPanic",
        art.url,
        art.slug ? `https://cryptopanic.com/static/images/logo.png` : null,
        new Date(art.published_at),
      );
    }
    console.log("News fetched");
  } catch (err) {
    console.error("News fetch error:", err.message);
  }
};
