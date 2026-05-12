import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Optionally fetch profile to get user info
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthRedirect;
