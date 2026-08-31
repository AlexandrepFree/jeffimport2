export const RED = "#E4262F";
export const RED_HI = "#FF3B30";
export const GREEN = "#22C55E";
export const BG = "#0A0A0C";
export const SURFACE = "#141417";
export const SURFACE_2 = "#1A1A1E";
export const LINE = "rgba(255,255,255,0.07)";
export const TXT = "#F4F4F5";
export const DIM = "rgba(244,244,245,0.42)";

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
* { -webkit-tap-highlight-color: transparent; }
html, body { overscroll-behavior-y: contain; }
input::placeholder { color: rgba(244,244,245,0.25); }
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
button { transition: opacity .15s, background .15s, border-color .15s; touch-action: manipulation; }
button:active { opacity: .7; }
.pb-scroll { -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain; }
@keyframes pb-sheet-in { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes pb-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes pb-pop { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
`;

export const S = {
  root: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    background: BG,
    minHeight: "100dvh",
    padding: 0,
    position: "relative",
    overflow: "hidden",
  },
  glowTop: {
    position: "absolute",
    top: -180, left: "50%", transform: "translateX(-50%)",
    width: 520, height: 380,
    background: "radial-gradient(ellipse at center, rgba(228,38,47,0.30) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  phone: {
    position: "relative",
    maxWidth: 460,
    margin: "0 auto",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
  },
  screen: {
    flex: 1,
    padding: "calc(env(safe-area-inset-top, 0px) + 20px) 20px 0",
    overflowY: "auto",
  },
  screenScroll: { flex: 1, overflowY: "auto" },
  stickyFooter: {
    padding: "12px 20px calc(env(safe-area-inset-bottom, 0px) + 14px)",
    background: `linear-gradient(180deg, transparent 0%, ${BG} 28%)`,
  },

  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  h1: { fontSize: 27, fontWeight: 800, color: TXT, margin: 0, letterSpacing: -0.6 },
  kicker: { fontSize: 10.5, color: DIM, marginTop: 5, letterSpacing: 1.1, textTransform: "uppercase", fontWeight: 600 },
  avatar: {
    width: 42, height: 42, borderRadius: "50%",
    background: SURFACE, border: `1px solid ${LINE}`,
    display: "flex", alignItems: "baseline", justifyContent: "center", gap: 1,
    fontSize: 14, fontWeight: 700, color: TXT, paddingTop: 12, boxSizing: "border-box",
  },
  avatarSub: { fontSize: 10.5, color: DIM, fontWeight: 600 },

  sectionLabel: { fontSize: 11, color: DIM, letterSpacing: 1.3, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 },
  sectionLabelMuted: { fontSize: 11, color: "rgba(244,244,245,0.28)", letterSpacing: 1.3, textTransform: "uppercase", fontWeight: 600 },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22 },

  maxList: { display: "flex", flexDirection: "column", gap: 9 },
  maxCard: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: SURFACE, borderRadius: 13, padding: "14px 16px",
    borderLeft: "3px solid", border: `1px solid ${LINE}`, borderLeftWidth: 3,
  },
  maxCardLeft: { display: "flex", alignItems: "center", gap: 9 },
  maxCardLabel: { fontSize: 11, fontWeight: 700, letterSpacing: 1, color: TXT, textTransform: "uppercase" },
  maxCardRight: { display: "flex", alignItems: "baseline", gap: 5 },
  maxInput: {
    background: "transparent", border: "none", outline: "none",
    color: TXT, fontSize: 21, fontWeight: 700, width: 78, textAlign: "right",
    fontFamily: "'Inter', sans-serif", letterSpacing: -0.5,
  },
  maxUnit: { fontSize: 11, color: DIM, fontWeight: 700, letterSpacing: 0.6 },
  dot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  dotSm: { display: "inline-block", width: 6, height: 6, borderRadius: "50%", marginRight: 8, flexShrink: 0 },

  weekDots: { display: "flex", gap: 7, marginTop: 12, marginBottom: 18, flexWrap: "wrap" },
  weekDot: {
    width: 36, height: 36, borderRadius: "50%",
    background: SURFACE, border: `1px solid ${LINE}`,
    color: DIM, fontSize: 12, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  weekDotActive: {
    background: RED, borderColor: RED, color: "#fff",
    boxShadow: `0 0 16px ${RED}80`,
  },

  weekCard: {
    background: `linear-gradient(135deg, rgba(228,38,47,0.14) 0%, ${SURFACE} 55%)`,
    border: `1px solid rgba(228,38,47,0.22)`,
    borderRadius: 16, padding: "16px 18px", marginBottom: 18,
  },
  weekCardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  weekCardKicker: { fontSize: 10.5, color: DIM, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 700 },
  weekBigRow: { display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 },
  weekBig: { fontSize: 40, fontWeight: 800, color: TXT, lineHeight: 1, letterSpacing: -1.5 },
  weekBigSlash: { fontSize: 13, color: DIM, fontWeight: 600 },
  weekPhase: {
    fontSize: 11, color: RED_HI, fontWeight: 700,
    letterSpacing: 1, textTransform: "uppercase", textAlign: "right", maxWidth: 120, lineHeight: 1.4,
  },
  weekCardMeta: { fontSize: 11, color: DIM, marginTop: 10, fontWeight: 500 },

  navBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  backBtn: {
    background: "transparent", border: "none", color: DIM,
    cursor: "pointer", padding: 10, margin: "-10px 0 -10px -10px",
    display: "flex", alignItems: "center",
  },
  liveBadge: {
    fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4, color: RED_HI,
    textTransform: "uppercase",
  },
  h2: { fontSize: 22, fontWeight: 800, color: TXT, margin: 0, letterSpacing: -0.5 },
  h2Big: { fontSize: 34, fontWeight: 800, color: TXT, margin: "6px 0 0", letterSpacing: -1.2, lineHeight: 1.12 },
  h2Accent: { color: RED_HI },
  kickerSm: { fontSize: 11, color: DIM, letterSpacing: 1.3, textTransform: "uppercase", fontWeight: 700, marginTop: 6 },

  dayTabs: { display: "flex", gap: 7, margin: "16px 0 14px", flexWrap: "wrap" },
  dayTab: {
    padding: "8px 16px", borderRadius: 20,
    background: SURFACE, border: `1px solid ${LINE}`,
    color: DIM, fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
    cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  dayTabActive: { background: RED, borderColor: RED, color: "#fff", boxShadow: `0 0 16px ${RED}66` },

  panel: {
    background: SURFACE, border: `1px solid ${LINE}`,
    borderRadius: 15, padding: "4px 0 0", marginBottom: 12, overflow: "hidden",
  },
  panelTight: {
    background: SURFACE, border: `1px solid ${LINE}`,
    borderRadius: 13, marginBottom: 12, overflow: "hidden",
  },
  tableHead: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "12px 16px 10px", borderBottom: `1px solid ${LINE}`,
    background: "rgba(255,255,255,0.02)",
  },
  thCell: { fontSize: 10.5, color: DIM, letterSpacing: 1.1, textTransform: "uppercase", fontWeight: 700 },
  exoRow: {
    padding: "12px 16px", borderBottom: `1px solid ${LINE}`, cursor: "pointer",
  },
  exoRowTop: { display: "flex", alignItems: "center", gap: 8 },
  exoName: { fontSize: 13, color: TXT, fontWeight: 500, display: "flex", alignItems: "center", minWidth: 0 },
  tdCell: { fontSize: 12, color: DIM, fontWeight: 500 },
  tdCellStrong: { fontSize: 12.5, color: TXT, fontWeight: 700 },
  tdCellRpe: { fontSize: 12, color: RED_HI, fontWeight: 700 },
  exoProgress: { fontSize: 10.5, color: DIM, fontWeight: 700, flexShrink: 0 },
  exoProgressDone: { color: GREEN },
  tonnageRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 16px", background: "rgba(255,255,255,0.02)",
  },
  tonnageLabel: { fontSize: 10.5, color: DIM, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700 },
  tonnageValue: { fontSize: 11.5, color: TXT, fontWeight: 700, letterSpacing: 0.3 },

  accordionBtn: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    width: "100%", background: "transparent", border: "none",
    padding: "14px 16px", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  accordionTitle: { fontSize: 10.5, color: TXT, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase" },
  accordionMeta: { fontSize: 11, color: DIM, fontWeight: 600, letterSpacing: 0.6, display: "flex", alignItems: "center", textTransform: "uppercase" },
  accordionBody: { padding: "0 16px 14px" },
  warmRow: {
    display: "flex", justifyContent: "space-between",
    padding: "8px 0", borderTop: `1px solid ${LINE}`,
  },
  warmLabel: { fontSize: 12.5, color: DIM, fontWeight: 500 },
  warmLoad: { fontSize: 12.5, color: TXT, fontWeight: 700 },
  genRow: { padding: "10px 0", borderTop: `1px solid ${LINE}` },
  genTop: { display: "flex", justifyContent: "space-between", gap: 10 },
  genName: { fontSize: 12.5, color: TXT, fontWeight: 500 },
  genReps: { fontSize: 12, color: RED_HI, fontWeight: 700, flexShrink: 0 },
  genNote: { fontSize: 11, color: DIM, marginTop: 3, lineHeight: 1.45 },

  completeSub: {
    display: "flex", alignItems: "center", gap: 10,
    fontSize: 11.5, color: DIM, marginTop: 14, marginBottom: 20, fontWeight: 500,
  },
  completeBar: { width: 26, height: 2, background: RED, borderRadius: 2, flexShrink: 0 },

  statPanel: {
    background: SURFACE, border: `1px solid ${LINE}`,
    borderRadius: 16, padding: "18px 18px 0", marginBottom: 20, overflow: "hidden",
  },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 12px", paddingBottom: 18 },
  statLabel: { fontSize: 10.5, color: DIM, letterSpacing: 1.3, textTransform: "uppercase", fontWeight: 700, marginBottom: 5 },
  statValue: { fontSize: 24, fontWeight: 800, color: TXT, letterSpacing: -0.8, lineHeight: 1 },
  statUnit: { fontSize: 11, color: DIM, fontWeight: 600, marginLeft: 3 },

  recapList: { borderTop: `1px solid ${LINE}`, paddingTop: 4 },
  recapRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0" },
  recapName: { fontSize: 12.5, color: TXT, fontWeight: 500, display: "flex", alignItems: "center" },
  recapLoad: { fontSize: 12, color: DIM, fontWeight: 600 },

  nextRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    margin: "0 -18px", padding: "13px 18px",
    background: "rgba(255,255,255,0.03)", borderTop: `1px solid ${LINE}`,
  },
  nextLabel: { fontSize: 10.5, color: DIM, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700 },
  nextValue: { fontSize: 11.5, color: TXT, fontWeight: 600 },

  primaryBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
    width: "100%", padding: "16px 0", borderRadius: 30,
    background: RED, border: "none", color: "#fff",
    fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase",
    cursor: "pointer", fontFamily: "'Inter', sans-serif",
    boxShadow: `0 6px 28px ${RED}59`, marginBottom: 12,
  },
  secondaryBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
    width: "100%", padding: "14px 0", borderRadius: 30,
    background: SURFACE_2, border: `1px solid ${LINE}`, color: TXT,
    fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase",
    cursor: "pointer", fontFamily: "'Inter', sans-serif", marginBottom: 12,
  },
  ghostBtn: {
    width: "100%", padding: "12px 0", background: "transparent", border: "none",
    color: DIM, fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
    textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },

  // ---- Bottom nav (tab bar) ----
  tabBar: {
    display: "flex", gap: 6, padding: "10px 20px calc(env(safe-area-inset-bottom, 0px) + 10px)",
    background: `linear-gradient(180deg, transparent 0%, ${BG} 40%)`,
    marginTop: "auto", flexShrink: 0,
  },
  tabBtn: {
    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    padding: "10px 0 8px", borderRadius: 16,
    background: SURFACE, border: `1px solid ${LINE}`,
    color: DIM, cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  tabBtnActive: { background: SURFACE_2, borderColor: "rgba(228,38,47,0.4)", color: TXT },
  tabBtnLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" },

  // ---- Set rows (logging) ----
  setList: { padding: "0 16px 12px" },
  setRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "9px 0", borderTop: `1px solid ${LINE}`,
  },
  setIdx: {
    width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 10.5, fontWeight: 700, color: DIM, background: "rgba(255,255,255,0.04)",
  },
  setIdxDone: { background: GREEN, color: "#08130a" },
  setTarget: { fontSize: 12, color: DIM, fontWeight: 500, flex: 1 },
  setActual: { fontSize: 12.5, color: TXT, fontWeight: 700 },
  setActualRpe: { fontSize: 11, color: RED_HI, fontWeight: 700, marginLeft: 6 },
  setTimerBtn: {
    background: "transparent", border: "none", color: DIM, cursor: "pointer",
    padding: 4, display: "flex", alignItems: "center",
  },
  setCheckBtn: {
    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "transparent", border: `1.5px solid ${LINE}`, color: "transparent",
    cursor: "pointer",
  },
  setCheckBtnDone: { background: GREEN, borderColor: GREEN, color: "#08130a" },

  // ---- Bottom sheet ----
  sheetOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
    display: "flex", alignItems: "flex-end", justifyContent: "center",
    zIndex: 60, animation: "pb-fade-in .18s ease",
  },
  sheetBody: {
    width: "100%", maxWidth: 460,
    background: SURFACE_2, borderTopLeftRadius: 22, borderTopRightRadius: 22,
    border: `1px solid ${LINE}`, borderBottom: "none",
    padding: "10px 20px calc(env(safe-area-inset-bottom, 0px) + 20px)",
    animation: "pb-sheet-in .22s cubic-bezier(.32,.72,.35,1)",
    maxHeight: "88vh", overflowY: "auto",
  },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, background: LINE, margin: "0 auto 16px" },
  sheetTitle: { fontSize: 16, fontWeight: 800, color: TXT, margin: "0 0 4px", letterSpacing: -0.3 },
  sheetSub: { fontSize: 11.5, color: DIM, fontWeight: 500, marginBottom: 18 },

  // ---- Log set modal ----
  stepperRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 22 },
  stepperBtn: {
    width: 44, height: 44, borderRadius: "50%",
    background: SURFACE, border: `1px solid ${LINE}`, color: TXT,
    fontSize: 20, fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  },
  stepperValue: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 110 },
  stepperInput: {
    background: "transparent", border: "none", outline: "none",
    color: TXT, fontSize: 34, fontWeight: 800, textAlign: "center", width: 110,
    fontFamily: "'Inter', sans-serif", letterSpacing: -1,
  },
  stepperUnit: { fontSize: 10.5, color: DIM, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" },
  fieldLabel: { fontSize: 10.5, color: DIM, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 },
  repsInputRow: { display: "flex", justifyContent: "center", marginBottom: 22 },
  repsInput: {
    background: SURFACE, border: `1px solid ${LINE}`, borderRadius: 14,
    color: TXT, fontSize: 22, fontWeight: 800, textAlign: "center", width: 90, padding: "10px 0",
    fontFamily: "'Inter', sans-serif", outline: "none",
  },
  rpeGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7, marginBottom: 22 },
  rpeBtn: {
    padding: "10px 0", borderRadius: 10, background: SURFACE, border: `1px solid ${LINE}`,
    color: DIM, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  rpeBtnActive: { background: RED, borderColor: RED, color: "#fff" },
  sheetActions: { display: "flex", gap: 10 },
  sheetActionGhost: {
    flex: 1, padding: "14px 0", borderRadius: 26, background: "transparent",
    border: `1px solid ${LINE}`, color: DIM, fontSize: 11.5, fontWeight: 700,
    letterSpacing: 0.8, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  sheetActionPrimary: {
    flex: 2, padding: "14px 0", borderRadius: 26, background: RED, border: "none",
    color: "#fff", fontSize: 11.5, fontWeight: 800, letterSpacing: 0.8,
    textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
    boxShadow: `0 6px 22px ${RED}55`,
  },

  // ---- Rest timer ----
  timerRingWrap: { display: "flex", justifyContent: "center", margin: "6px 0 22px", position: "relative" },
  timerRingLabel: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    textAlign: "center",
  },
  timerRingValue: { fontSize: 36, fontWeight: 800, color: TXT, letterSpacing: -1, lineHeight: 1 },
  timerRingSub: { fontSize: 10, color: DIM, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 },
  presetRow: { display: "flex", gap: 8, marginBottom: 22 },
  presetBtn: {
    flex: 1, padding: "12px 0", borderRadius: 12, background: SURFACE, border: `1px solid ${LINE}`,
    color: DIM, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  presetBtnActive: { background: RED, borderColor: RED, color: "#fff" },
  miniTimerPill: {
    position: "fixed", top: "calc(env(safe-area-inset-top, 0px) + 14px)", left: "50%",
    transform: "translateX(-50%)", zIndex: 55,
    display: "flex", alignItems: "center", gap: 8,
    background: SURFACE_2, border: `1px solid ${RED}`, borderRadius: 30,
    padding: "9px 16px", boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
    color: TXT, fontSize: 13, fontWeight: 800, cursor: "pointer",
    fontFamily: "'Inter', sans-serif", animation: "pb-pop .2s ease",
  },

  // ---- Lifts / progression ----
  liftCard: {
    background: SURFACE, border: `1px solid ${LINE}`, borderRadius: 15,
    padding: "16px 16px", marginBottom: 10, cursor: "pointer",
  },
  liftCardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  liftCardName: { display: "flex", alignItems: "center", fontSize: 13, fontWeight: 700, color: TXT, letterSpacing: 0.4, textTransform: "uppercase" },
  liftCardPr: {
    fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6, color: "#08130a",
    background: GREEN, borderRadius: 8, padding: "2px 7px", marginLeft: 8,
  },
  liftCardMid: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 },
  liftCardStats: { display: "flex", gap: 18 },
  liftStatLabel: { fontSize: 9.5, color: DIM, letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 700, marginBottom: 3 },
  liftStatValue: { fontSize: 19, fontWeight: 800, color: TXT, letterSpacing: -0.5 },
  liftDelta: { fontSize: 11, fontWeight: 700 },
  liftDeltaPos: { color: GREEN },
  liftDeltaNeg: { color: RED_HI },
  liftDeltaFlat: { color: DIM },

  liftDetailHeroValue: { fontSize: 44, fontWeight: 800, color: TXT, letterSpacing: -1.5, lineHeight: 1 },
  liftDetailHeroUnit: { fontSize: 14, color: DIM, fontWeight: 600, marginLeft: 6 },
  liftDetailHeroRow: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 },
  liftDetailChartWrap: { padding: "16px 16px 10px" },
  liftDetailEmpty: { fontSize: 12, color: DIM, padding: "20px 16px", textAlign: "center" },
  liftHistRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 16px", borderTop: `1px solid ${LINE}`,
  },
  liftHistLeft: { fontSize: 12, color: DIM, fontWeight: 600 },
  liftHistRight: { fontSize: 12.5, color: TXT, fontWeight: 700 },

  totalCard: {
    background: `linear-gradient(135deg, rgba(228,38,47,0.14) 0%, ${SURFACE} 55%)`,
    border: `1px solid rgba(228,38,47,0.22)`,
    borderRadius: 16, padding: "16px 18px", marginBottom: 18,
  },

  // ---- Test 1RM (semaine 10) ----
  testPanel: {
    borderRadius: 16, padding: "16px 16px 14px", marginBottom: 12,
    border: "1px solid", overflow: "hidden",
  },
  testPanelTitle: { fontSize: 13, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: TXT, display: "flex", alignItems: "center" },
  testPanelSub: { fontSize: 11, color: DIM, fontWeight: 500, marginTop: 3, marginBottom: 16 },
  testPanelBestRow: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 },
  testPanelBestValue: { fontSize: 30, fontWeight: 800, color: TXT, letterSpacing: -1 },
  testPanelBestUnit: { fontSize: 11.5, color: DIM, fontWeight: 700 },
  testAttemptActions: { display: "flex", gap: 10, marginTop: 4 },
  testFailBtn: {
    flex: 1, padding: "13px 0", borderRadius: 24, background: "transparent",
    border: `1.5px solid ${RED_HI}`, color: RED_HI, fontSize: 11.5, fontWeight: 800,
    letterSpacing: 0.8, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  testValidateBtn: {
    flex: 1, padding: "13px 0", borderRadius: 24, background: GREEN,
    border: `1.5px solid ${GREEN}`, color: "#08130a", fontSize: 11.5, fontWeight: 800,
    letterSpacing: 0.8, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  testAttemptList: { marginTop: 14, borderTop: `1px solid ${LINE}`, paddingTop: 4 },
  testAttemptRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0" },
  testAttemptBadge: {
    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center", color: "#08130a",
  },
  testAttemptWeight: { fontSize: 12.5, color: TXT, fontWeight: 700, flex: 1 },
  testAttemptRemove: { background: "transparent", border: "none", color: DIM, cursor: "pointer", padding: 4 },

  liftDetailValidatedTag: {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6, color: "#08130a",
    background: GREEN, borderRadius: 8, padding: "3px 8px", marginLeft: 8,
  },
};
