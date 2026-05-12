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
  <div className="max-w-7xl mx-auto p-4">
    <Navbar />
    <PriceTicker />
    <PortfolioCards />
    <CryptoChart />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PortfolioPanel />
      <AlertsPanel />
    </div>
    <MarketTable />
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
