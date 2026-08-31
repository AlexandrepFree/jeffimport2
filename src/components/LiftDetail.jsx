import React from "react";
import { ChevronLeft, Check } from "lucide-react";
import ScreenLayout from "./ScreenLayout.jsx";
import MiniChart from "./MiniChart.jsx";
import { S } from "../styles.js";
import { LIFTS } from "../data/program.js";
import { fmt, bestValidatedAttempt } from "../lib/calc.js";

export default function LiftDetail({ lift, maxes, history, testResults, setScreen }) {
  const info = LIFTS[lift];
  const h = history[lift];
  const manual = parseFloat(maxes[lift]) || null;
  const validated = bestValidatedAttempt(testResults[lift]);
  const hero = validated ?? h.latest ?? manual;
  const heroLabel = validated ? "1RM validé · semaine 10" : h.latest ? "e1RM estimé (séries quasi-max)" : "max manuel";
  const chartPoints = h.points.map((p) => ({ label: `S${p.weekN}`, value: p.value }));
  const attempts = testResults[lift] || [];

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
        <span style={S.liftDetailHeroUnit}>kg · {heroLabel}</span>
        {validated && (
          <span style={S.liftDetailValidatedTag}><Check size={10} strokeWidth={3} />Validé</span>
        )}
      </div>

      {attempts.length > 0 && (
        <div style={S.panelTight}>
          <div style={{ ...S.accordionTitle, padding: "14px 16px 4px" }}>Tentatives · semaine 10</div>
          {attempts.map((a, i) => (
            <div key={i} style={S.liftHistRow}>
              <span style={S.liftHistLeft}>
                Essai {i + 1} {a.validated ? "· validé" : "· raté"}
              </span>
              <span style={{ ...S.liftHistRight, color: a.validated ? "#22C55E" : "#FF3B30" }}>{fmt(a.weight)} kg</span>
            </div>
          ))}
        </div>
      )}

      <div style={S.panel}>
        {chartPoints.length >= 2 ? (
          <div style={S.liftDetailChartWrap}>
            <MiniChart points={chartPoints} width={380} height={140} color={info.color} showDots showLabels strokeWidth={2.5} />
          </div>
        ) : (
          <div style={S.liftDetailEmpty}>
            Logue au moins 2 semaines de séries quasi-maximales (≥80% du max, ≤5 reps) sur ce mouvement pour voir la courbe de progression. Les séries de volume/back-off ne comptent pas — seule la séance de test (semaine 10) donne un 1RM validé.
          </div>
        )}

        <div style={S.liftHistRow}>
          <span style={S.liftHistLeft}>Max manuel (1RM déclaré)</span>
          <span style={S.liftHistRight}>{manual ? `${fmt(manual)} kg` : "—"}</span>
        </div>
        <div style={S.liftHistRow}>
          <span style={S.liftHistLeft}>Record estimé (séries quasi-max)</span>
          <span style={S.liftHistRight}>{h.pr ? `${fmt(h.pr)} kg` : "—"}</span>
        </div>
      </div>

      {h.points.length > 0 && (
        <div style={S.panelTight}>
          <div style={{ ...S.accordionTitle, padding: "14px 16px 4px" }}>Détail par semaine (estimé)</div>
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
