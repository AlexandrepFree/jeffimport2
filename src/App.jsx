import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { CSS, S } from "./styles.js";
import { weeks } from "./data/program.js";
import { dayStats, buildLiftHistory } from "./lib/calc.js";
import { loadLocal, saveLocal, STORAGE_KEYS } from "./lib/storage.js";

import HomeScreen from "./components/HomeScreen.jsx";
import DayScreen from "./components/DayScreen.jsx";
import CompleteScreen from "./components/CompleteScreen.jsx";
import LiftsView from "./components/LiftsView.jsx";
import LiftDetail from "./components/LiftDetail.jsx";
import TabBar from "./components/TabBar.jsx";

export default function App() {
  const [maxes, setMaxes] = useState({ S: "", B: "", D: "" });
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [setLog, setSetLog] = useState({});
  const [sessionMeta, setSessionMeta] = useState({});
  const [testResults, setTestResults] = useState({ S: [], B: [], D: [] });
  const [screen, setScreen] = useState("home"); // home | day | complete | lifts | liftDetail
  const [activeLift, setActiveLift] = useState("S");
  const saveTimer = useRef(null);

  useEffect(() => {
    const m = loadLocal("pb-maxes");
    if (m) setMaxes(m);
    const sl = loadLocal("pb-setlog");
    if (sl) setSetLog(sl);
    const sm = loadLocal("pb-sessions");
    if (sm) setSessionMeta(sm);
    const tr = loadLocal("pb-test1rm");
    if (tr) setTestResults((prev) => ({ ...prev, ...tr }));
  }, []);

  const saveMaxes = useCallback((next) => {
    setMaxes(next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveLocal("pb-maxes", next), 400);
  }, []);

  const logSet = useCallback((key, entry) => {
    setSetLog((prev) => {
      const next = { ...prev, [key]: entry };
      saveLocal("pb-setlog", next);
      return next;
    });
  }, []);

  const unlogSet = useCallback((key) => {
    setSetLog((prev) => {
      const next = { ...prev };
      delete next[key];
      saveLocal("pb-setlog", next);
      return next;
    });
  }, []);

  const onEnterDay = useCallback((dayKey) => {
    setSessionMeta((prev) => {
      if (prev[dayKey]?.startedAt) return prev;
      const next = { ...prev, [dayKey]: { ...prev[dayKey], startedAt: Date.now() } };
      saveLocal("pb-sessions", next);
      return next;
    });
  }, []);

  const completeDay = useCallback((dayKey) => {
    setSessionMeta((prev) => {
      const next = { ...prev, [dayKey]: { ...prev[dayKey], completedAt: Date.now() } };
      saveLocal("pb-sessions", next);
      return next;
    });
  }, []);

  const addTestAttempt = useCallback((lift, weight, validated) => {
    setTestResults((prev) => {
      const next = { ...prev, [lift]: [...(prev[lift] || []), { weight, validated, at: Date.now() }] };
      saveLocal("pb-test1rm", next);
      return next;
    });
  }, []);

  const removeTestAttempt = useCallback((lift, index) => {
    setTestResults((prev) => {
      const next = { ...prev, [lift]: (prev[lift] || []).filter((_, i) => i !== index) };
      saveLocal("pb-test1rm", next);
      return next;
    });
  }, []);

  const resetApp = useCallback(() => {
    STORAGE_KEYS.forEach((k) => {
      try { localStorage.removeItem(k); } catch (e) {}
    });
    window.location.reload();
  }, []);

  const week = weeks[weekIdx];
  const day = week.days[Math.min(dayIdx, week.days.length - 1)];
  const dayKey = `w${week.n}-d${dayIdx}`;
  const stats = dayStats(day, maxes);
  const history = useMemo(() => buildLiftHistory(setLog, weeks), [setLog]);

  const totalDays = weeks.reduce((a, w) => a + w.days.length, 0);
  const doneCount = Object.values(sessionMeta).filter((m) => m.completedAt).length;

  const showTabBar = screen === "home" || screen === "lifts" || screen === "liftDetail";

  return (
    <div style={S.root}>
      <style>{CSS}</style>
      <div style={S.glowTop} />
      <div style={S.phone}>
        {screen === "home" && (
          <HomeScreen
            maxes={maxes} saveMaxes={saveMaxes}
            weeks={weeks} weekIdx={weekIdx} setWeekIdx={setWeekIdx}
            week={week} setDayIdx={setDayIdx} setScreen={setScreen}
            doneCount={doneCount} totalDays={totalDays}
            onReset={resetApp}
          />
        )}
        {screen === "day" && (
          <DayScreen
            weekIdx={weekIdx} week={week} day={day} dayIdx={dayIdx} setDayIdx={setDayIdx}
            maxes={maxes} stats={stats} setScreen={setScreen}
            setLog={setLog} onLogSet={logSet} onUnlogSet={unlogSet}
            onEnterDay={onEnterDay}
            onFinish={() => { completeDay(dayKey); setScreen("complete"); }}
            testResults={testResults} onAddTestAttempt={addTestAttempt} onRemoveTestAttempt={removeTestAttempt}
          />
        )}
        {screen === "complete" && (
          <CompleteScreen
            week={week} day={day} dayIdx={dayIdx} weekIdx={weekIdx}
            weeks={weeks} setLog={setLog} sessionMeta={sessionMeta}
            onNext={() => {
              if (dayIdx < week.days.length - 1) setDayIdx(dayIdx + 1);
              else if (weekIdx < weeks.length - 1) { setWeekIdx(weekIdx + 1); setDayIdx(0); }
              setScreen("day");
            }}
            onHome={() => setScreen("home")}
          />
        )}
        {screen === "lifts" && (
          <LiftsView maxes={maxes} history={history} testResults={testResults} setScreen={setScreen} setActiveLift={setActiveLift} />
        )}
        {screen === "liftDetail" && (
          <LiftDetail lift={activeLift} maxes={maxes} history={history} testResults={testResults} setScreen={setScreen} />
        )}
        {showTabBar && <TabBar screen={screen} setScreen={setScreen} />}
      </div>
    </div>
  );
}
