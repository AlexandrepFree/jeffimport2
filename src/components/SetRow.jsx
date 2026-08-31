import React from "react";
import { Check, Clock } from "lucide-react";
import { S, GREEN } from "../styles.js";
import { fmt } from "../lib/calc.js";

export default function SetRow({ idx, targetReps, targetWeight, entry, onOpen, onUnlog, onOpenTimer }) {
  const done = !!entry;
  return (
    <div style={S.setRow}>
      <div
        style={{ ...S.setIdx, ...(done ? S.setIdxDone : {}) }}
        onClick={() => (done ? onUnlog() : onOpen())}
      >
        {done ? <Check size={12} strokeWidth={3} /> : idx + 1}
      </div>

      <div style={S.setTarget} onClick={() => (done ? onUnlog() : onOpen())}>
        {done ? (
          <>
            <span style={S.setActual}>{fmt(entry.weight)} kg × {entry.reps}</span>
            {entry.rpe != null && <span style={S.setActualRpe}>RPE {fmt(entry.rpe)}</span>}
          </>
        ) : (
          <>Cible : {targetWeight ? `${fmt(targetWeight)} kg × ` : ""}{targetReps} reps</>
        )}
      </div>

      <button style={S.setTimerBtn} onClick={onOpenTimer} aria-label="Minuteur de repos">
        <Clock size={15} strokeWidth={2.2} />
      </button>

      <button
        style={{ ...S.setCheckBtn, ...(done ? S.setCheckBtnDone : {}) }}
        onClick={() => (done ? onUnlog() : onOpen())}
      >
        <Check size={13} strokeWidth={3} />
      </button>
    </div>
  );
}
