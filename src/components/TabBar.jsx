import React from "react";
import { Home, TrendingUp } from "lucide-react";
import { S } from "../styles.js";

export default function TabBar({ screen, setScreen }) {
  const isHome = screen === "home";
  const isLifts = screen === "lifts" || screen === "liftDetail";
  return (
    <div style={S.tabBar}>
      <button style={{ ...S.tabBtn, ...(isHome ? S.tabBtnActive : {}) }} onClick={() => setScreen("home")}>
        <Home size={17} strokeWidth={2.4} />
        <span style={S.tabBtnLabel}>Accueil</span>
      </button>
      <button style={{ ...S.tabBtn, ...(isLifts ? S.tabBtnActive : {}) }} onClick={() => setScreen("lifts")}>
        <TrendingUp size={17} strokeWidth={2.4} />
        <span style={S.tabBtnLabel}>Progression</span>
      </button>
    </div>
  );
}
