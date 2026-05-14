import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PriceTicker from "./components/PriceTicker";
import PortfolioCards from "./components/PortfolioCards";
import CryptoChart from "./components/CryptoChart";
import MarketTable from "./components/MarketTable";
import PortfolioPanel from "./components/PortfolioPanel";
import AlertsPanel from "./components/AlertsPanel";
import OAuthRedirect from "./components/OAuthRedirect";

const Dashboard: React.FC = () => (
  <div className="min-h-screen bg-slate-950">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Section */}
      <div className="mb-8">
        <PriceTicker />
      </div>

      {/* Top Coins Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Top Cryptocurrencies
        </h2>
        <PortfolioCards />
      </div>

      {/* Chart Section */}
      <div className="mb-8">
        <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur p-6 min-h-96">
          <CryptoChart />
        </div>
      </div>

      {/* Portfolio & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PortfolioPanel />
        <AlertsPanel />
      </div>

      {/* Market Table */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Market Overview</h2>
        <MarketTable />
      </div>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/oauth-redirect" element={<OAuthRedirect />} />;
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
