import axios, { AxiosInstance } from "axios";
import {
  MarketOverview,
  Coin,
  HistoricalCandle,
  PortfolioHolding,
  Alert,
  TransactionPayload,
  AlertPayload,
  User,
} from "../types";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => api.post<{ token: string; user: User }>("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post<{ token: string; user: User }>("/auth/login", data);

export const getProfile = () => api.get<User>("/users/profile");
export const updateProfile = (data: { username?: string; email?: string }) =>
  api.put("/users/profile", data);
export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => api.put("/users/change-password", data);

// Favorites
export const getFavorites = () => api.get<Coin[]>("/users/favorites");
export const addFavorite = (cryptoId: number) =>
  api.post(`/users/favorites/${cryptoId}`);
export const removeFavorite = (cryptoId: number) =>
  api.delete(`/users/favorites/${cryptoId}`);

// Crypto
export const getMarketOverview = () =>
  api.get<MarketOverview>("/crypto/overview");
export const getCoinsList = () => api.get<Coin[]>("/crypto/coins");
export const getCoinHistory = (
  cryptoId: number,
  timeframe = "1d",
  limit = 30,
) =>
  api.get<HistoricalCandle[]>(
    `/crypto/history/${cryptoId}?timeframe=${timeframe}&limit=${limit}`,
  );

// Portfolio
export const getPortfolio = () => api.get<PortfolioHolding[]>("/portfolio");
export const addTransaction = (data: TransactionPayload) =>
  api.post("/portfolio/transaction", data);

// Alerts
export const getAlerts = () => api.get<Alert[]>("/alerts");
export const createAlert = (data: AlertPayload) => api.post("/alerts", data);
export const deleteAlert = (alertId: number) =>
  api.delete(`/alerts/${alertId}`);

// News
export const getNews = (limit = 10) => api.get<any[]>(`/news?limit=${limit}`);

export default api;
