import "dotenv/config";
import app from "./app.js";
import cron from "node-cron";
import { fetchAndStoreLatestPrices } from "./services/coingecko.service.js";
import { checkAllAlerts } from "./services/alert.service.js";

cron.schedule("*/30 * * * * *", fetchAndStoreLatestPrices);
cron.schedule("*/15 * * * * *", checkAllAlerts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
