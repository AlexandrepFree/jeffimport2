import React, { useState } from "react";
import BottomSheet from "./BottomSheet.jsx";
import { S } from "../styles.js";
import { fmt } from "../lib/calc.js";

const RPE_OPTIONS = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export default function LogSetModal({ exoName, setLabel, targetWeight, targetReps, initial, onValidate, onClose }) {
  const [weight, setWeight] = useState(initial?.weight ?? targetWeight ?? 0);
  const [reps, setReps] = useState(initial?.reps ?? targetReps ?? 0);
  const [rpe, setRpe] = useState(initial?.rpe ?? null);

  const bump = (delta) => setWeight((w) => Math.max(0, Math.round((parseFloat(w || 0) + delta) * 2) / 2));

  return (
    <BottomSheet onClose={onClose}>
      <h3 style={S.sheetTitle}>{exoName}</h3>
      <div style={S.sheetSub}>{setLabel}</div>

      <div style={S.fieldLabel}>Charge</div>
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

      <div style={S.fieldLabel}>Répétitions</div>
      <div style={S.repsInputRow}>
        <input
          type="number" inputMode="numeric" value={reps}
          onChange={(e) => setReps(e.target.value)}
          style={S.repsInput}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div style={S.fieldLabel}>RPE</div>
      <div style={S.rpeGrid}>
        {RPE_OPTIONS.map((v) => (
          <button
            key={v}
            style={{ ...S.rpeBtn, ...(rpe === v ? S.rpeBtnActive : {}) }}
            onClick={() => setRpe(v)}
          >
            {fmt(v)}
          </button>
        ))}
      </div>

      <div style={S.sheetActions}>
        <button style={S.sheetActionGhost} onClick={onClose}>Passer</button>
        <button
          style={S.sheetActionPrimary}
          onClick={() => onValidate({ weight: parseFloat(weight) || 0, reps: parseInt(reps, 10) || 0, rpe })}
        >
          Valider
        </button>
      </div>
    </BottomSheet>
  );
}
