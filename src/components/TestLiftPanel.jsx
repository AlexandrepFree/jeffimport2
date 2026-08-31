import React, { useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { S } from "../styles.js";
import { LIFTS } from "../data/program.js";
import { fmt, bestValidatedAttempt } from "../lib/calc.js";

export default function TestLiftPanel({ lift, maxes, attempts, onAddAttempt, onRemoveAttempt }) {
  const info = LIFTS[lift];
  const [weight, setWeight] = useState(parseFloat(maxes[lift]) || 100);
  const best = bestValidatedAttempt(attempts);

  const bump = (delta) => setWeight((w) => Math.max(0, Math.round((parseFloat(w || 0) + delta) * 2) / 2));

  return (
    <div style={{ ...S.testPanel, borderColor: `${info.color}55`, background: `linear-gradient(135deg, ${info.color}1f 0%, #141417 55%)` }}>
      <div style={S.testPanelTitle}>
        <span style={{ ...S.dotSm, background: info.color, boxShadow: `0 0 8px ${info.color}` }} />
        Test 1RM · {info.short}
      </div>
      <div style={S.testPanelSub}>Chaque tentative compte comme un vrai essai — seules les tentatives validées comptent pour ton nouveau max.</div>

      <div style={S.testPanelBestRow}>
        <span style={S.testPanelBestValue}>{best ? fmt(best) : "—"}</span>
        <span style={S.testPanelBestUnit}>KG · MEILLEUR ESSAI VALIDÉ</span>
      </div>

      <div style={S.stepperRow}>
        <button style={S.stepperBtn} onClick={() => bump(-2.5)}>−</button>
        <div style={S.stepperValue}>
          <input
            type="number" inputMode="decimal" value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={S.stepperInput}
            onFocus={(e) => e.target.select()}
          />
          <span style={S.stepperUnit}>KG</span>
        </div>
        <button style={S.stepperBtn} onClick={() => bump(2.5)}>+</button>
      </div>

      <div style={S.testAttemptActions}>
        <button style={S.testFailBtn} onClick={() => onAddAttempt(parseFloat(weight) || 0, false)}>
          <X size={13} strokeWidth={3} style={{ marginRight: 6, verticalAlign: -2 }} />
          Raté
        </button>
        <button style={S.testValidateBtn} onClick={() => onAddAttempt(parseFloat(weight) || 0, true)}>
          <Check size={13} strokeWidth={3} style={{ marginRight: 6, verticalAlign: -2 }} />
          Validé
        </button>
      </div>

      {attempts.length > 0 && (
        <div style={S.testAttemptList}>
          {attempts.map((a, i) => (
            <div key={i} style={S.testAttemptRow}>
              <span style={{ ...S.testAttemptBadge, background: a.validated ? "#22C55E" : "#3a3a40" }}>
                {a.validated ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} color="#F4F4F5" />}
              </span>
              <span style={S.testAttemptWeight}>Essai {i + 1} · {fmt(a.weight)} kg</span>
              <button style={S.testAttemptRemove} onClick={() => onRemoveAttempt(i)}>
                <Trash2 size={13} strokeWidth={2.2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
