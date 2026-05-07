export interface User {
  user_id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Coin {
  crypto_id: number;
  symbol: string;
  name: string;
  coin_gecko_id: string;
  image_url: string;
  is_active: number;
  created_at: string;
}

export interface PriceData {
  price_id: number;
  crypto_id: number;
  price_usd: number;
  market_cap_usd: number;
  volume_24h_usd: number;
  change_24h_percent: number;
  last_updated: string;
  symbol: string;
  name: string;
  coin_gecko_id: string;
  image_url: string;
}

export interface MarketOverview {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  topCoins: PriceData[];
}

export interface HistoricalCandle {
  date: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
}

export interface PortfolioHolding {
  crypto_id: number;
  symbol: string;
  name: string;
  total_amount: number;
  avg_buy_price: number;
  currentPrice: number;
  totalValue: number;
  invested: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Alert {
  alert_id: number;
  user_id: number;
  crypto_id: number;
  target_price: string;
  direction: "above" | "below";
  is_triggered: boolean;
  triggered_at: string | null;
  created_at: string;
  symbol: string;
  name: string;
}

export interface TransactionPayload {
  cryptoId: number;
  amount: number;
  pricePerUnit: number;
  type: "buy" | "sell";
  notes?: string;
}

export interface AlertPayload {
  cryptoId: number;
  targetPrice: number;
  direction: "above" | "below";
}
