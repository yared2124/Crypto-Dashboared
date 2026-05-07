import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass-card p-4 flex justify-between items-center mb-6 rounded-2xl">
      <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        ◈ NovaFi
      </h1>
      <div className="flex gap-4 items-center">
        <span className="text-sm">👋 {user?.username}</span>
        <button
          onClick={logout}
          className="bg-red-600/20 px-3 py-1 rounded-full text-sm hover:bg-red-600/40"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
