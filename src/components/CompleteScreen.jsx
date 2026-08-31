import React from "react";
import { Check } from "lucide-react";
import ScreenLayout from "./ScreenLayout.jsx";
import { S } from "../styles.js";
import { LIFTS } from "../data/program.js";
import { fmt } from "../lib/calc.js";

function buildLiveStats(weekIdx, dayIdx, day, setLog, startedAt, completedAt) {
  const prefix = `${weekIdx}-${dayIdx}-`;
  let tonnage = 0;
  let rpeSum = 0;
  let rpeCount = 0;
  let setsDone = 0;
  let topSet = null;
  const byExo = {};

  Object.entries(setLog).forEach(([key, entry]) => {
    if (!key.startsWith(prefix)) return;
    const rest = key.slice(prefix.length).split("-");
    const exoIdx = Number(rest[0]);
    const exo = day.exos[exoIdx];
    if (!exo) return;
    setsDone += 1;
    tonnage += (entry.weight || 0) * (entry.reps || 0);
    if (entry.rpe != null) { rpeSum += entry.rpe; rpeCount += 1; }
    if (exo.lift && entry.weight && (!topSet || entry.weight > topSet.weight)) {
      topSet = { weight: entry.weight, reps: entry.reps, lift: exo.lift, name: exo.name };
    }
    if (!byExo[exoIdx]) byExo[exoIdx] = { name: exo.name, lift: exo.lift, count: 0, maxWeight: 0 };
    byExo[exoIdx].count += 1;
    byExo[exoIdx].maxWeight = Math.max(byExo[exoIdx].maxWeight, entry.weight || 0);
  });

  const duration = startedAt && completedAt ? Math.max(1, Math.round((completedAt - startedAt) / 60000)) : null;

  return {
    tonnage: Math.round(tonnage),
    setsDone,
    avgRpe: rpeCount ? Math.round((rpeSum / rpeCount) * 2) / 2 : null,
    topSet,
    duration,
    exoRecap: Object.values(byExo),
  };
}

export default function CompleteScreen({ week, day, dayIdx, weekIdx, weeks, setLog, sessionMeta, onNext, onHome }) {
  const dayKey = `w${week.n}-d${dayIdx}`;
  const meta = sessionMeta[dayKey] || {};
  const live = buildLiveStats(weekIdx, dayIdx, day, setLog, meta.startedAt, meta.completedAt);

  const nextLabel =
    dayIdx < week.days.length - 1
      ? `Jour ${dayIdx + 2} · ${week.days[dayIdx + 1].title}`
      : weekIdx < weeks.length - 1
        ? `Semaine ${weeks[weekIdx + 1].n} · Jour 1`
        : "Fin du bloc";

  return (
    <ScreenLayout
      footer={
        <>
          <button style={S.primaryBtn} onClick={onNext}>
            <Check size={15} strokeWidth={3} />
            Séance suivante
          </button>
          <button style={S.ghostBtn} onClick={onHome}>Retour à l'accueil</button>
        </>
      }
    >
      <div style={S.kickerSm}>Semaine {String(week.n).padStart(2, "0")} · {day.title}</div>
      <h2 style={S.h2Big}>
        Séance<br /><span style={S.h2Accent}>terminée</span>
      </h2>
      <div style={S.completeSub}>
        <span style={S.completeBar} />
        {live.setsDone} série{live.setsDone > 1 ? "s" : ""} de travail enregistrée{live.setsDone > 1 ? "s" : ""}
      </div>

      <div style={S.statPanel}>
        <div style={S.statGrid}>
          <div>
            <div style={S.statLabel}>Tonnage</div>
            <div style={S.statValue}>
              {live.tonnage > 0 ? live.tonnage.toLocaleString("fr-FR") : "—"}
              <span style={S.statUnit}>kg</span>
            </div>
          </div>
          <div>
            <div style={S.statLabel}>Durée</div>
            <div style={S.statValue}>
              {live.duration ? live.duration : "—"}
              {live.duration && <span style={S.statUnit}>min</span>}
            </div>
          </div>
          <div>
            <div style={S.statLabel}>Top set</div>
            <div style={S.statValue}>
              {live.topSet ? fmt(live.topSet.weight) : "—"}
              {live.topSet && <span style={S.statUnit}>×{live.topSet.reps}</span>}
            </div>
          </div>
          <div>
            <div style={S.statLabel}>RPE moyen</div>
            <div style={S.statValue}>{live.avgRpe ? fmt(live.avgRpe) : "—"}</div>
          </div>
        </div>

        {live.exoRecap.length > 0 && (
          <div style={S.recapList}>
            {live.exoRecap.map((m, i) => (
              <div key={i} style={S.recapRow}>
                <span style={S.recapName}>
                  {m.lift && <span style={{ ...S.dotSm, background: LIFTS[m.lift].color, boxShadow: `0 0 8px ${LIFTS[m.lift].color}` }} />}
                  {m.name}
                </span>
                <span style={S.recapLoad}>{m.count} série{m.count > 1 ? "s" : ""} · {fmt(m.maxWeight)} kg</span>
              </div>
            ))}
          </div>
        )}

        <div style={S.nextRow}>
          <span style={S.nextLabel}>Suivant</span>
          <span style={S.nextValue}>{nextLabel}</span>
        </div>
      </div>
    </ScreenLayout>
  );
}
