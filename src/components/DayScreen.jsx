import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronDown } from "lucide-react";
import ScreenLayout from "./ScreenLayout.jsx";
import SetRow from "./SetRow.jsx";
import LogSetModal from "./LogSetModal.jsx";
import { RestTimerSheet, MiniTimerPill, useRestTimer } from "./RestTimer.jsx";
import { S } from "../styles.js";
import { LIFTS, GENERAL_WARMUP } from "../data/program.js";
import { computeLoad, computeWarmupRows, fmt, parseSets, dayEmphasis } from "../lib/calc.js";

export default function DayScreen({ weekIdx, week, day, dayIdx, setDayIdx, maxes, stats, setScreen, setLog, onLogSet, onUnlogSet, onEnterDay, onFinish }) {
  const [warmOpen, setWarmOpen] = useState(false);
  const [genOpen, setGenOpen] = useState(false);
  const [activeSet, setActiveSet] = useState(null); // { exoIdx, setIdx, exo, targetWeight, targetReps }
  const timer = useRestTimer();

  const dayKey = `w${week.n}-d${dayIdx}`;
  useEffect(() => { onEnterDay(dayKey); }, [dayKey]);

  const mainLift = day.testLift || (day.exos.find((e) => e.lift) || {}).lift;
  const warmRows = mainLift ? computeWarmupRows(maxes[mainLift]) : null;

  const prefix = `${weekIdx}-${dayIdx}-`;
  const totalSets = day.exos.reduce((a, e) => a + (parseSets(e.sets)?.sets || 0), 0);
  const loggedSets = Object.keys(setLog).filter((k) => k.startsWith(prefix)).length;
  const allDone = totalSets > 0 && loggedSets >= totalSets;

  return (
    <ScreenLayout
      footer={
        <button style={S.primaryBtn} onClick={onFinish}>
          <Check size={15} strokeWidth={3} />
          {allDone ? "Valider la séance" : `Valider · ${loggedSets}/${totalSets} séries`}
        </button>
      }
    >
      <div style={S.navBar}>
        <button style={S.backBtn} onClick={() => setScreen("home")}>
          <ChevronLeft size={22} />
        </button>
        <div style={S.liveBadge}>EN COURS</div>
      </div>

      <h2 style={S.h2}>Semaine {String(week.n).padStart(2, "0")} · {day.title}</h2>
      <div style={S.kickerSm}>{dayEmphasis(day, LIFTS)}</div>

      <div style={S.dayTabs}>
        {week.days.map((d, i) => (
          <button
            key={i}
            onClick={() => setDayIdx(i)}
            style={{ ...S.dayTab, ...(i === dayIdx ? S.dayTabActive : {}) }}
          >
            J{i + 1}
          </button>
        ))}
      </div>

      <div style={S.panel}>
        <div style={S.tableHead}>
          <span style={{ ...S.thCell, flex: 1 }}>Exercice</span>
          <span style={{ ...S.thCell, width: 46, textAlign: "right" }}>Séries</span>
          <span style={{ ...S.thCell, width: 58, textAlign: "right" }}>Charge</span>
          <span style={{ ...S.thCell, width: 30, textAlign: "right" }}>RPE</span>
        </div>

        {day.exos.map((exo, exoIdx) => {
          const info = exo.lift ? LIFTS[exo.lift] : null;
          const max = exo.lift ? maxes[exo.lift] : null;
          let load = "—";
          let hiLoad = null;
          if (exo.pct) {
            const lo = max ? computeLoad(max, exo.pct[0]) : null;
            const hi = max ? computeLoad(max, exo.pct[1]) : null;
            hiLoad = hi;
            if (max) {
              load = exo.pct[0] === exo.pct[1] ? `${fmt(lo)}` : `${fmt(lo)}–${fmt(hi)}`;
            } else {
              load = exo.pct[0] === exo.pct[1] ? `${exo.pct[0]}%` : `${exo.pct[0]}–${exo.pct[1]}%`;
            }
          }

          const parsed = parseSets(exo.sets);
          const exoPrefix = `${weekIdx}-${dayIdx}-${exoIdx}-`;
          const exoLogged = Object.keys(setLog).filter((k) => k.startsWith(exoPrefix)).length;
          const exoTotal = parsed?.sets || 0;

          return (
            <div key={exoIdx} style={S.exoRow}>
              <div style={S.exoRowTop}>
                <span style={{ ...S.exoName, flex: 1 }}>
                  <span style={{
                    ...S.dotSm,
                    background: info ? info.color : "#4B4B52",
                    boxShadow: info ? `0 0 8px ${info.color}` : "none",
                  }} />
                  {exo.name}
                </span>
                <span style={{ ...S.tdCell, width: 46, textAlign: "right" }}>{exo.sets}</span>
                <span style={{ ...S.tdCellStrong, width: 58, textAlign: "right" }}>{load}</span>
                <span style={{ ...S.tdCellRpe, width: 30, textAlign: "right" }}>{exo.rpe || "—"}</span>
              </div>

              {parsed && (
                <div style={S.setList}>
                  {Array.from({ length: parsed.sets }).map((_, setIdx) => {
                    const key = `${weekIdx}-${dayIdx}-${exoIdx}-${setIdx}`;
                    return (
                      <SetRow
                        key={key}
                        idx={setIdx}
                        targetReps={parsed.reps}
                        targetWeight={hiLoad}
                        entry={setLog[key]}
                        onOpen={() => setActiveSet({ exoIdx, setIdx, exo, targetWeight: hiLoad, targetReps: parsed.reps, key })}
                        onUnlog={() => onUnlogSet(key)}
                        onOpenTimer={() => timer.openSheet()}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {stats.tonnage > 0 && (
          <div style={S.tonnageRow}>
            <span style={S.tonnageLabel}>Tonnage prescrit</span>
            <span style={S.tonnageValue}>{stats.tonnage.toLocaleString("fr-FR")} KG</span>
          </div>
        )}
      </div>

      {warmRows && (
        <div style={S.panelTight}>
          <button style={S.accordionBtn} onClick={() => setWarmOpen(!warmOpen)}>
            <span style={S.accordionTitle}>Échauffement barre</span>
            <span style={S.accordionMeta}>
              {LIFTS[mainLift].short} · jusqu'à 75%
              <ChevronDown size={14} style={{ marginLeft: 6, transform: warmOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </span>
          </button>
          {warmOpen && (
            <div style={S.accordionBody}>
              {warmRows.map((r, i) => (
                <div key={i} style={S.warmRow}>
                  <span style={S.warmLabel}>{r.label} × {r.reps}</span>
                  <span style={S.warmLoad}>{r.display}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={S.panelTight}>
        <button style={S.accordionBtn} onClick={() => setGenOpen(!genOpen)}>
          <span style={S.accordionTitle}>Échauffement général</span>
          <span style={S.accordionMeta}>
            {GENERAL_WARMUP.length} exercices
            <ChevronDown size={14} style={{ marginLeft: 6, transform: genOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </span>
        </button>
        {genOpen && (
          <div style={S.accordionBody}>
            {GENERAL_WARMUP.map((g, i) => (
              <div key={i} style={S.genRow}>
                <div style={S.genTop}>
                  <span style={S.genName}>{g.name}</span>
                  <span style={S.genReps}>{g.reps}</span>
                </div>
                <div style={S.genNote}>{g.notes}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeSet && (
        <LogSetModal
          exoName={activeSet.exo.name}
          setLabel={`Série ${activeSet.setIdx + 1} / ${parseSets(activeSet.exo.sets)?.sets || 1}`}
          targetWeight={activeSet.targetWeight}
          targetReps={activeSet.targetReps}
          initial={setLog[activeSet.key]}
          onClose={() => setActiveSet(null)}
          onValidate={(entry) => {
            onLogSet(activeSet.key, entry);
            setActiveSet(null);
            timer.start(activeSet.exo.lift ? 180 : 90);
          }}
        />
      )}

      <RestTimerSheet timer={timer} />
      <MiniTimerPill timer={timer} />
    </ScreenLayout>
  );
}
