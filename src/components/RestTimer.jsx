import React, { useEffect, useRef, useState, useCallback } from "react";
import { Clock, X } from "lucide-react";
import BottomSheet from "./BottomSheet.jsx";
import { S, RED_HI, GREEN, LINE } from "../styles.js";
import { playBeep, vibrate } from "../lib/feedback.js";

const PRESETS = [120, 180, 240, 300];

export function useRestTimer() {
  const [endsAt, setEndsAt] = useState(null);
  const [duration, setDuration] = useState(180);
  const [now, setNow] = useState(Date.now());
  const [sheetOpen, setSheetOpen] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [endsAt]);

  const remaining = endsAt ? Math.max(0, Math.round((endsAt - now) / 1000)) : 0;
  const running = !!endsAt;
  const done = running && remaining === 0;

  useEffect(() => {
    if (done && !firedRef.current) {
      firedRef.current = true;
      playBeep();
      vibrate([160, 70, 160]);
    }
    if (!done) firedRef.current = false;
  }, [done]);

  const start = useCallback((seconds) => {
    setDuration(seconds);
    setEndsAt(Date.now() + seconds * 1000);
    setSheetOpen(true);
  }, []);

  const stop = useCallback(() => {
    setEndsAt(null);
    setSheetOpen(false);
  }, []);

  return {
    remaining, duration, running, done,
    sheetOpen, openSheet: () => setSheetOpen(true), closeSheet: () => setSheetOpen(false),
    start, stop,
  };
}

function fmtClock(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function RestTimerSheet({ timer }) {
  if (!timer.sheetOpen) return null;
  const { remaining, duration, running, done, start, stop, closeSheet } = timer;
  const pct = running ? 1 - remaining / duration : 0;
  const R = 72;
  const C = 2 * Math.PI * R;
  const dash = C * pct;

  return (
    <BottomSheet onClose={closeSheet}>
      <h3 style={S.sheetTitle}>Minuteur de repos</h3>
      <div style={S.sheetSub}>{running ? (done ? "Repos terminé" : "En cours") : "Choisis une durée"}</div>

      <div style={S.timerRingWrap}>
        <svg width={168} height={168} viewBox="0 0 168 168">
          <circle cx={84} cy={84} r={R} fill="none" stroke={LINE} strokeWidth={10} />
          <circle
            cx={84} cy={84} r={R} fill="none"
            stroke={done ? GREEN : RED_HI} strokeWidth={10} strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90 84 84)"
            style={{ transition: "stroke-dasharray .25s linear, stroke .3s" }}
          />
        </svg>
        <div style={S.timerRingLabel}>
          <div style={S.timerRingValue}>{fmtClock(running ? remaining : duration)}</div>
          <div style={S.timerRingSub}>{done ? "Terminé" : running ? "restant" : "durée"}</div>
        </div>
      </div>

      <div style={S.presetRow}>
        {PRESETS.map((sec) => (
          <button
            key={sec}
            style={{ ...S.presetBtn, ...(running && duration === sec ? S.presetBtnActive : {}) }}
            onClick={() => start(sec)}
          >
            {sec / 60} min
          </button>
        ))}
      </div>

      <div style={S.sheetActions}>
        <button style={S.sheetActionGhost} onClick={closeSheet}>Fermer</button>
        {running && <button style={S.sheetActionPrimary} onClick={stop}>Arrêter</button>}
      </div>
    </BottomSheet>
  );
}

export function MiniTimerPill({ timer }) {
  if (!timer.running || timer.sheetOpen) return null;
  return (
    <button style={S.miniTimerPill} onClick={timer.openSheet}>
      <Clock size={15} strokeWidth={2.6} color={timer.done ? GREEN : RED_HI} />
      {fmtClock(timer.remaining)}
      <X
        size={13}
        strokeWidth={2.6}
        style={{ marginLeft: 4, opacity: 0.6 }}
        onClick={(e) => { e.stopPropagation(); timer.stop(); }}
      />
    </button>
  );
}
