import React from "react";
import ScreenLayout from "./ScreenLayout.jsx";
import MiniChart from "./MiniChart.jsx";
import { S } from "../styles.js";
import { LIFTS } from "../data/program.js";
import { fmt, bestValidatedAttempt } from "../lib/calc.js";

function DeltaTag({ delta, label = "vs manuel" }) {
  if (delta === null || delta === undefined) return <span style={{ ...S.liftDelta, ...S.liftDeltaFlat }}>—</span>;
  if (Math.abs(delta) < 0.25) return <span style={{ ...S.liftDelta, ...S.liftDeltaFlat }}>= manuel</span>;
  const pos = delta > 0;
  return (
    <span style={{ ...S.liftDelta, ...(pos ? S.liftDeltaPos : S.liftDeltaNeg) }}>
      {pos ? "+" : ""}{fmt(delta)} kg {label}
    </span>
  );
}

export default function LiftsView({ maxes, history, testResults, setScreen, setActiveLift }) {
  const ref = (code) => bestValidatedAttempt(testResults[code]) ?? history[code].latest ?? (parseFloat(maxes[code]) || null);

  const total = ["S", "B", "D"].reduce((a, k) => a + (parseFloat(maxes[k]) || 0), 0);
  const totalRef = ["S", "B", "D"].reduce((a, k) => a + (ref(k) || 0), 0);
  const totalDelta = total > 0 ? totalRef - total : null;
  const anyValidated = ["S", "B", "D"].some((k) => bestValidatedAttempt(testResults[k]) != null);

  return (
    <ScreenLayout>
      <div style={S.titleRow}>
        <div>
          <h1 style={S.h1}>Progression</h1>
          <div style={S.kicker}>{anyValidated ? "Tests validés · semaine 10" : "Estimation 1RM sur séries quasi-maximales"}</div>
        </div>
      </div>

      {total > 0 && (
        <div style={S.totalCard}>
          <div style={S.weekCardKicker}>Total SBD {anyValidated ? "validé/estimé" : "estimé"}</div>
          <div style={S.weekBigRow}>
            <span style={S.weekBig}>{fmt(totalRef)}</span>
            <span style={S.weekBigSlash}>kg</span>
          </div>
          <div style={{ marginTop: 6 }}><DeltaTag delta={totalDelta} /></div>
        </div>
      )}

      <div style={S.sectionLabel}>Mouvements</div>
      {Object.entries(LIFTS).map(([code, info]) => {
        const h = history[code];
        const manual = parseFloat(maxes[code]) || null;
        const validated = bestValidatedAttempt(testResults[code]);
        const displayed = validated ?? h.latest;
        const delta = manual && displayed ? displayed - manual : null;
        const isPr = !validated && h.pr && manual && h.pr > manual;
        const chartPoints = h.points.map((p) => ({ label: `S${p.weekN}`, value: p.value }));

        return (
          <div
            key={code}
            style={{ ...S.liftCard, borderLeft: `3px solid ${info.color}` }}
            onClick={() => { setActiveLift(code); setScreen("liftDetail"); }}
          >
            <div style={S.liftCardTop}>
              <span style={S.liftCardName}>
                <span style={{ ...S.dotSm, background: info.color, boxShadow: `0 0 8px ${info.color}` }} />
                {info.short}
                {validated && <span style={S.liftCardPr}>VALIDÉ S10</span>}
                {isPr && <span style={S.liftCardPr}>PR</span>}
              </span>
            </div>
            <div style={S.liftCardMid}>
              <div style={S.liftCardStats}>
                <div>
                  <div style={S.liftStatLabel}>Manuel</div>
                  <div style={S.liftStatValue}>{manual ? fmt(manual) : "—"}</div>
                </div>
                <div>
                  <div style={S.liftStatLabel}>{validated ? "Testé" : "e1RM"}</div>
                  <div style={S.liftStatValue}>{displayed ? fmt(displayed) : "—"}</div>
                </div>
              </div>
              <MiniChart points={chartPoints} width={90} height={34} color={info.color} />
            </div>
            <div style={{ marginTop: 8 }}><DeltaTag delta={delta} /></div>
          </div>
        );
      })}
    </ScreenLayout>
  );
}
