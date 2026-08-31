import React from "react";
import { ChevronLeft } from "lucide-react";
import ScreenLayout from "./ScreenLayout.jsx";
import MiniChart from "./MiniChart.jsx";
import { S } from "../styles.js";
import { LIFTS } from "../data/program.js";
import { fmt } from "../lib/calc.js";

export default function LiftDetail({ lift, maxes, history, setScreen }) {
  const info = LIFTS[lift];
  const h = history[lift];
  const manual = parseFloat(maxes[lift]) || null;
  const hero = h.latest || manual;
  const chartPoints = h.points.map((p) => ({ label: `S${p.weekN}`, value: p.value }));

  return (
    <ScreenLayout>
      <div style={S.navBar}>
        <button style={S.backBtn} onClick={() => setScreen("lifts")}>
          <ChevronLeft size={22} />
        </button>
      </div>

      <div style={S.kickerSm}>{info.short}</div>
      <div style={S.liftDetailHeroRow}>
        <span style={S.liftDetailHeroValue}>{hero ? fmt(hero) : "—"}</span>
        <span style={S.liftDetailHeroUnit}>kg {h.latest ? "· e1RM estimé" : "· max manuel"}</span>
      </div>

      <div style={S.panel}>
        {chartPoints.length >= 2 ? (
          <div style={S.liftDetailChartWrap}>
            <MiniChart points={chartPoints} width={380} height={140} color={info.color} showDots showLabels strokeWidth={2.5} />
          </div>
        ) : (
          <div style={S.liftDetailEmpty}>Logue au moins 2 semaines de séries sur ce mouvement pour voir la courbe de progression.</div>
        )}

        <div style={S.liftHistRow}>
          <span style={S.liftHistLeft}>Max manuel (1RM déclaré)</span>
          <span style={S.liftHistRight}>{manual ? `${fmt(manual)} kg` : "—"}</span>
        </div>
        <div style={S.liftHistRow}>
          <span style={S.liftHistLeft}>Record (e1RM le plus haut)</span>
          <span style={S.liftHistRight}>{h.pr ? `${fmt(h.pr)} kg` : "—"}</span>
        </div>
      </div>

      {h.points.length > 0 && (
        <div style={S.panelTight}>
          <div style={{ ...S.accordionTitle, padding: "14px 16px 4px" }}>Détail par semaine</div>
          {[...h.points].reverse().map((p) => (
            <div key={p.weekIdx} style={S.liftHistRow}>
              <span style={S.liftHistLeft}>Semaine {p.weekN}</span>
              <span style={S.liftHistRight}>{fmt(p.value)} kg</span>
            </div>
          ))}
        </div>
      )}
    </ScreenLayout>
  );
}
