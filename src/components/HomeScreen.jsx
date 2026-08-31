import React from "react";
import { Play } from "lucide-react";
import ScreenLayout from "./ScreenLayout.jsx";
import { S } from "../styles.js";
import { fmt, dayIntensity } from "../lib/calc.js";
import { LIFTS } from "../data/program.js";

export default function HomeScreen({ maxes, saveMaxes, weeks, weekIdx, setWeekIdx, week, setDayIdx, setScreen, doneCount, totalDays }) {
  const total = ["S", "B", "D"].reduce((a, k) => a + (parseFloat(maxes[k]) || 0), 0);
  const intensity = dayIntensity(week.days[0]);

  return (
    <ScreenLayout
      footer={
        <button style={S.primaryBtn} onClick={() => { setDayIdx(0); setScreen("day"); }}>
          <Play size={15} strokeWidth={2.6} fill="currentColor" />
          Démarrer jour 1
        </button>
      }
    >
      <div style={S.titleRow}>
        <div>
          <h1 style={S.h1}>Powerbuilding</h1>
          <div style={S.kicker}>
            Bloc 10 semaines · Peaking{total > 0 ? ` · Total ${fmt(total)} kg` : ""}
          </div>
        </div>
        <div style={S.avatar}>{doneCount}<span style={S.avatarSub}>/{totalDays}</span></div>
      </div>

      <div style={S.sectionLabel}>Maxes actuels (1RM)</div>
      <div style={S.maxList}>
        {Object.entries(LIFTS).map(([code, info]) => (
          <div key={code} style={{ ...S.maxCard, borderLeftColor: info.color }}>
            <div style={S.maxCardLeft}>
              <span style={{ ...S.dot, background: info.color, boxShadow: `0 0 10px ${info.color}` }} />
              <span style={S.maxCardLabel}>{info.short}</span>
            </div>
            <div style={S.maxCardRight}>
              <input
                type="number" inputMode="decimal" placeholder="—"
                value={maxes[code]}
                onChange={(e) => saveMaxes({ ...maxes, [code]: e.target.value })}
                style={S.maxInput}
              />
              <span style={S.maxUnit}>KG</span>
            </div>
          </div>
        ))}
      </div>

      <div style={S.labelRow}>
        <span style={S.sectionLabel}>Semaine d'entraînement</span>
        <span style={S.sectionLabelMuted}>Cycle 10 semaines</span>
      </div>

      <div style={S.weekDots}>
        {weeks.map((w, i) => (
          <button
            key={w.n}
            onClick={() => { setWeekIdx(i); setDayIdx(0); }}
            style={{ ...S.weekDot, ...(i === weekIdx ? S.weekDotActive : {}) }}
          >
            {w.n}
          </button>
        ))}
      </div>

      <div style={S.weekCard}>
        <div style={S.weekCardTop}>
          <div>
            <div style={S.weekCardKicker}>Semaine</div>
            <div style={S.weekBigRow}>
              <span style={S.weekBig}>{String(week.n).padStart(2, "0")}</span>
              <span style={S.weekBigSlash}>/10</span>
            </div>
          </div>
          <div style={S.weekPhase}>{week.title}</div>
        </div>
        <div style={S.weekCardMeta}>
          {intensity ? `${intensity}% 1RM` : "Intensité variable"} · {week.days.length} séances
        </div>
      </div>
    </ScreenLayout>
  );
}
