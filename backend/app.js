import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cryptoRoutes from "./routes/crypto.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import newsRoutes from "./routes/news.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/news", newsRoutes);

app.get("/health", (req, res) => res.send("OK"));
app.use(errorMiddleware);

export default app;
