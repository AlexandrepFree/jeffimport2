import { BAR_WEIGHT, WARMUP_STEPS } from "../data/program.js";

export function roundToStep(value, step = 2.5) {
  return Math.round(value / step) * step;
}

export function computeLoad(max, pct) {
  if (!max || !pct) return null;
  return roundToStep((max * pct) / 100, 2.5);
}

export function fmt(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return Number.isInteger(n) ? `${n}` : n.toFixed(1).replace(/\.0$/, "");
}

export function computeWarmupRows(max) {
  return WARMUP_STEPS.map((step) => {
    if (!step.pct) return { ...step, display: `${BAR_WEIGHT} kg` };
    const [a, b] = step.pct;
    if (!max) {
      return { ...step, display: a === b ? `${a}%` : `${a}–${b}%` };
    }
    const lo = computeLoad(max, a);
    const hi = computeLoad(max, b);
    return { ...step, display: a === b ? `${fmt(lo)} kg` : `${fmt(lo)}–${fmt(hi)} kg` };
  });
}

// "3×5" -> {sets:3, reps:5} ; "2×8-10" -> {sets:2, reps:8} (borne basse)
export function parseSets(setsStr) {
  if (!setsStr) return null;
  const m = String(setsStr).match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!m) return null;
  return { sets: parseInt(m[1], 10), reps: parseInt(m[2], 10) };
}

export function dayStats(day, maxes) {
  let tonnage = 0;
  let workingSets = 0;
  let topSet = null;
  const mainLifts = [];

  day.exos.forEach((exo) => {
    const parsed = parseSets(exo.sets);
    if (parsed) workingSets += parsed.sets;
    if (!exo.lift || !exo.pct) return;
    const max = maxes[exo.lift];
    if (!max) return;
    const load = computeLoad(max, exo.pct[1]);
    if (parsed && load) {
      tonnage += parsed.sets * parsed.reps * load;
      if (!topSet || load > topSet.load) topSet = { load, sets: parsed.sets, reps: parsed.reps };
    }
    mainLifts.push({ name: exo.name, lift: exo.lift, sets: exo.sets, load });
  });

  return { tonnage: Math.round(tonnage), workingSets, topSet, mainLifts };
}

// Intensité moyenne du jour (sur les mouvements principaux)
export function dayIntensity(day) {
  const pcts = day.exos.filter((e) => e.pct && e.lift).map((e) => e.pct[1]);
  if (!pcts.length) return null;
  return Math.round(Math.max(...pcts));
}

// Mouvement dominant du jour, pour le sous-titre "SQUAT EMPHASIS"
export function dayEmphasis(day, LIFTS) {
  if (day.testLift) return LIFTS[day.testLift].short;
  const counts = {};
  day.exos.forEach((e) => {
    if (e.lift) counts[e.lift] = (counts[e.lift] || 0) + 1;
  });
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return best ? `${LIFTS[best[0]].short} EMPHASIS` : "ACCESSOIRES";
}

// ---------------------------------------------------------------------------
// Estimation du 1RM (moyenne Epley / Brzycki), fiable pour 1-10 reps
// ---------------------------------------------------------------------------

export function estimate1RM(weight, reps) {
  const w = parseFloat(weight);
  const r = parseInt(reps, 10);
  if (!w || !r || r < 1 || r > 10) return null;
  const epley = w * (1 + r / 30);
  const brzycki = w * (36 / (37 - r));
  return roundToStep((epley + brzycki) / 2, 0.5);
}

// setLog: { "wIdx-dIdx-exoIdx-setIdx": { weight, reps, rpe } }
// Retourne, par mouvement (S/B/D), la meilleure estimation 1RM par semaine
// (triée par semaine), le PR (meilleure estim. toutes semaines confondues)
// et la dernière estimation connue.
export function buildLiftHistory(setLog, weeks) {
  const perWeekBest = { S: {}, B: {}, D: {} };

  Object.entries(setLog).forEach(([key, entry]) => {
    const [wIdx, dIdx, exoIdx] = key.split("-").map(Number);
    const week = weeks[wIdx];
    const day = week && week.days[dIdx];
    const exo = day && day.exos[exoIdx];
    if (!exo || !exo.lift) return;
    const est = estimate1RM(entry.weight, entry.reps);
    if (!est) return;
    const bucket = perWeekBest[exo.lift];
    if (!bucket[wIdx] || est > bucket[wIdx]) bucket[wIdx] = est;
  });

  const history = {};
  ["S", "B", "D"].forEach((lift) => {
    const points = Object.entries(perWeekBest[lift])
      .map(([wIdx, value]) => ({ weekIdx: Number(wIdx), weekN: weeks[Number(wIdx)].n, value }))
      .sort((a, b) => a.weekIdx - b.weekIdx);
    const pr = points.length ? Math.max(...points.map((p) => p.value)) : null;
    const latest = points.length ? points[points.length - 1].value : null;
    history[lift] = { points, pr, latest };
  });
  return history;
}
