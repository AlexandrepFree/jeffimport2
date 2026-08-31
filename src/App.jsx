import React, { useState, useEffect, useCallback, useRef } from "react";
import { Check, ChevronLeft, ChevronDown, Play } from "lucide-react";

// ---------------------------------------------------------------------------
// Données du programme — Coach n°2, Powerbuilding 3.0, bloc 10 semaines
// lift: 'S' squat | 'B' bench | 'D' deadlift | null (pas lié à un max SBD)
// pct: [min, max] ou null | rpe: string | note: texte libre (semaine test)
// ---------------------------------------------------------------------------

const LIFTS = {
  S: { label: "Squat", short: "SQUAT", color: "#FF3B30" },   // disque 25 kg
  B: { label: "Bench", short: "BENCH", color: "#3B82F6" },   // disque 20 kg
  D: { label: "Deadlift", short: "DEADLIFT", color: "#EAB308" }, // disque 15 kg
};

const weeks = [
  {
    n: 1, title: "Introduction",
    days: [
      { title: "Squat lourd", exos: [
        { name: "Squat (Top Single)", sets: "1×1", lift: "S", pct: [85, 87.5], rpe: "6–8" },
        { name: "Squat (Volume)", sets: "3×5", lift: "S", pct: [75, 77.5], rpe: "7–8" },
        { name: "Développé Militaire barre", sets: "2×8", lift: null, pct: [70, 70], rpe: "6", note: "% du max OHP" },
        { name: "Extension lombaire 45° / Good Morning", sets: "2×8-10", rpe: "6" },
        { name: "Rowing buste penché en appui", sets: "4×8-10", rpe: "9" },
      ]},
      { title: "Bench lourd", exos: [
        { name: "Développé Couché pause (1s)", sets: "1×1", lift: "B", pct: [87.5, 90], rpe: "7–8" },
        { name: "Développé Couché (Volume)", sets: "3×3", lift: "B", pct: [82.5, 82.5], rpe: "7–8" },
        { name: "Leg Curl assis", sets: "3×10-12", rpe: "8" },
        { name: "Curl biceps barre droite", sets: "4×6-8", rpe: "10" },
        { name: "Face Pull poulie assis", sets: "3×15-20", rpe: "9" },
        { name: "Extension mollets debout", sets: "3×10-12", rpe: "10" },
        { name: "Relevé de jambes suspendu", sets: "3×6-8", rpe: "8" },
      ]},
      { title: "Variantes mécaniques", exos: [
        { name: "Squat Départ Mort (Anderson)", sets: "3×8", rpe: "6" },
        { name: "Développé Couché prise serrée", sets: "3×8", rpe: "6" },
        { name: "Tirage vertical prise neutre", sets: "4×6-8", rpe: "9" },
        { name: "Extension triceps barre au front", sets: "3×8-10", rpe: "10" },
      ]},
      { title: "Soulevé de Terre", exos: [
        { name: "Soulevé de Terre", sets: "1×4", lift: "D", pct: [85, 85], rpe: "8–9" },
        { name: "Soulevé de Terre avec pause", sets: "2×4", lift: "D", pct: [67.5, 67.5], rpe: "7" },
        { name: "Élévations latérales haltères", sets: "4×15-20", rpe: "9" },
        { name: "Écarté élastique (band pull-apart)", sets: "4×15-20", rpe: "9" },
        { name: "Pull-over poulie haute", sets: "3×15-20", rpe: "7" },
        { name: "Curl marteau haltères", sets: "4×8-10", rpe: "9" },
      ]},
      { title: "SBD volume modéré", exos: [
        { name: "Squat", sets: "4×6", lift: "S", pct: [70, 70], rpe: "7–8" },
        { name: "Développé Couché", sets: "4×6", lift: "B", pct: [72.5, 72.5], rpe: "7–8" },
        { name: "Rowing Helms", sets: "3×10-12", rpe: "8" },
        { name: "Abduction de hanche", sets: "3×12-15", rpe: "8" },
      ]},
    ],
  },
  {
    n: 2, title: "Accumulation",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [85, 87.5] },
        { name: "Squat", sets: "3×5", lift: "S", pct: [75, 77.5] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "2×8-10" },
        { name: "Rowing buste appui", sets: "4×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [87.5, 90] },
        { name: "Développé Couché", sets: "3×3", lift: "B", pct: [82.5, 85] },
        { name: "Leg Curl", sets: "3×10-12" },
        { name: "Curl barre", sets: "4×6-8" },
        { name: "Face Pull", sets: "3×15-20" },
        { name: "Extension mollets", sets: "3×10-12" },
        { name: "Relevé jambes suspendu", sets: "3×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Départ Mort", sets: "3×8" },
        { name: "Développé Couché départ pins", sets: "3×8", lift: "B", pct: [70, 75] },
        { name: "Tirage vertical prise neutre", sets: "4×6-8" },
        { name: "Extension triceps barre au front", sets: "3×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×2", lift: "D", pct: [90, 90] },
        { name: "Soulevé de Terre Touch-and-Go", sets: "2×8", lift: "D", pct: [65, 70] },
        { name: "Élévations latérales", sets: "4×15-20" },
        { name: "Écarté élastique", sets: "4×15-20" },
        { name: "Pull-over poulie", sets: "3×15-20" },
        { name: "Curl marteau", sets: "4×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "3×6", lift: "S", pct: [72.5, 72.5] },
        { name: "Développé Couché", sets: "3×6", lift: "B", pct: [75, 75] },
        { name: "Rowing Helms", sets: "3×10-12" },
        { name: "Abduction hanche", sets: "3×12-15" },
      ]},
    ],
  },
  {
    n: 3, title: "Intensification",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [87.5, 90] },
        { name: "Squat", sets: "2×4", lift: "S", pct: [77.5, 80] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "2×8-10" },
        { name: "Rowing buste appui", sets: "4×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [90, 92.5] },
        { name: "Développé Couché", sets: "3×2", lift: "B", pct: [85, 87.5] },
        { name: "Leg Curl", sets: "3×10-12" },
        { name: "Curl barre", sets: "4×6-8" },
        { name: "Face Pull", sets: "3×15-20" },
        { name: "Extension mollets", sets: "3×10-12" },
        { name: "Relevé jambes suspendu", sets: "3×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Départ Mort", sets: "3×8" },
        { name: "Développé Couché prise serrée", sets: "3×8" },
        { name: "Tirage vertical prise neutre", sets: "4×6-8" },
        { name: "Extension triceps barre au front", sets: "3×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×2-4", lift: "D", pct: [90, 90] },
        { name: "Soulevé de Terre avec pause", sets: "2×4", lift: "D", pct: [70, 70] },
        { name: "Élévations latérales", sets: "4×15-20" },
        { name: "Écarté élastique", sets: "4×15-20" },
        { name: "Pull-over poulie", sets: "3×15-20" },
        { name: "Curl marteau", sets: "4×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "2×6", lift: "S", pct: [75, 75] },
        { name: "Développé Couché", sets: "3×6", lift: "B", pct: [77.5, 77.5] },
        { name: "Rowing Helms", sets: "3×10-12" },
        { name: "Abduction hanche", sets: "3×12-15" },
      ]},
    ],
  },
  {
    n: 4, title: "Pic d'accumulation",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [87.5, 90] },
        { name: "Squat", sets: "3×4", lift: "S", pct: [77.5, 80] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "2×8-10" },
        { name: "Rowing buste appui", sets: "4×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [90, 95] },
        { name: "Développé Couché", sets: "3×2", lift: "B", pct: [85, 90] },
        { name: "Leg Curl", sets: "3×10-12" },
        { name: "Curl barre", sets: "4×6-8" },
        { name: "Face Pull", sets: "3×15-20" },
        { name: "Extension mollets", sets: "3×10-12" },
        { name: "Relevé jambes suspendu", sets: "3×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Box", sets: "3×8" },
        { name: "Développé Couché départ pins", sets: "3×8", lift: "B", pct: [70, 75] },
        { name: "Tirage vertical prise neutre", sets: "4×6-8" },
        { name: "Extension triceps barre au front", sets: "3×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×1", lift: "D", pct: [92.5, 95] },
        { name: "Soulevé de Terre Touch-and-Go", sets: "2×8", lift: "D", pct: [65, 75] },
        { name: "Élévations latérales", sets: "4×15-20" },
        { name: "Écarté élastique", sets: "4×15-20" },
        { name: "Pull-over poulie", sets: "3×15-20" },
        { name: "Curl marteau", sets: "4×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "2×6", lift: "S", pct: [77.5, 77.5] },
        { name: "Développé Couché", sets: "1×6", lift: "B", pct: [80, 80] },
        { name: "Rowing Helms", sets: "3×10-12" },
        { name: "Abduction hanche", sets: "3×12-15" },
      ]},
    ],
  },
  {
    n: 5, title: "Semi-Deload",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "2×5", lift: "S", pct: [75, 77.5] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "2×8-10" },
        { name: "Rowing buste appui", sets: "3×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché", sets: "3×3", lift: "B", pct: [85, 85] },
        { name: "Leg Curl", sets: "3×10-12" },
        { name: "Curl barre", sets: "3×6-8" },
        { name: "Face Pull", sets: "3×15-20" },
        { name: "Extension mollets", sets: "3×10-12" },
        { name: "Relevé jambes suspendu", sets: "3×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Départ Mort", sets: "2×6" },
        { name: "Développé Couché prise serrée", sets: "2×8" },
        { name: "Tirage vertical prise neutre", sets: "3×6-8" },
        { name: "Extension triceps barre au front", sets: "3×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×3", lift: "D", pct: [85, 85] },
        { name: "Soulevé de Terre avec pause", sets: "2×4", lift: "D", pct: [67.5, 67.5] },
        { name: "Élévations latérales", sets: "3×15-20" },
        { name: "Écarté élastique", sets: "3×15-20" },
        { name: "Pull-over poulie", sets: "3×15-20" },
        { name: "Curl marteau", sets: "3×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "2×6", lift: "S", pct: [70, 70] },
        { name: "Développé Couché", sets: "2×6", lift: "B", pct: [72.5, 72.5] },
        { name: "Rowing Helms", sets: "3×10-12" },
        { name: "Abduction hanche", sets: "3×12-15" },
      ]},
    ],
  },
  {
    n: 6, title: "Transmutation — phase lourde",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [87.5, 90] },
        { name: "Squat", sets: "3×3", lift: "S", pct: [80, 85] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "2×8-10" },
        { name: "Rowing buste appui", sets: "3×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [90, 95] },
        { name: "Développé Couché", sets: "3×2", lift: "B", pct: [87.5, 90] },
        { name: "Leg Curl", sets: "2×10-12" },
        { name: "Curl barre", sets: "4×6-8" },
        { name: "Face Pull", sets: "2×15-20" },
        { name: "Extension mollets", sets: "2×10-12" },
        { name: "Relevé jambes suspendu", sets: "2×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Box", sets: "2×8" },
        { name: "Développé Couché départ pins", sets: "2×8", lift: "B", pct: [70, 80] },
        { name: "Tirage vertical prise neutre", sets: "3×6-8" },
        { name: "Extension triceps barre au front", sets: "2×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×2", lift: "D", pct: [92.5, 95] },
        { name: "Soulevé de Terre Touch-and-Go", sets: "2×8", lift: "D", pct: [65, 75] },
        { name: "Élévations latérales", sets: "3×15-20" },
        { name: "Écarté élastique", sets: "3×15-20" },
        { name: "Pull-over poulie", sets: "2×15-20" },
        { name: "Curl marteau", sets: "3×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "3×4", lift: "S", pct: [77.5, 77.5] },
        { name: "Développé Couché", sets: "3×5", lift: "B", pct: [77.5, 77.5] },
        { name: "Rowing Helms", sets: "2×10-12" },
        { name: "Abduction hanche", sets: "2×12-15" },
      ]},
    ],
  },
  {
    n: 7, title: "Peaking préliminaire",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [90, 92.5] },
        { name: "Squat", sets: "2×3", lift: "S", pct: [82.5, 87.5] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "1×8-10" },
        { name: "Rowing buste appui", sets: "3×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [92.5, 97.5] },
        { name: "Développé Couché", sets: "3×1", lift: "B", pct: [90, 95] },
        { name: "Leg Curl", sets: "2×10-12" },
        { name: "Curl barre", sets: "3×6-8" },
        { name: "Face Pull", sets: "2×15-20" },
        { name: "Extension mollets", sets: "2×10-12" },
        { name: "Relevé jambes suspendu", sets: "2×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Départ Mort", sets: "2×8" },
        { name: "Développé Couché prise serrée", sets: "2×8" },
        { name: "Tirage vertical prise neutre", sets: "3×6-8" },
        { name: "Extension triceps barre au front", sets: "2×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×3", lift: "D", pct: [90, 92.5] },
        { name: "Soulevé de Terre avec pause", sets: "2×4", lift: "D", pct: [72.5, 72.5] },
        { name: "Élévations latérales", sets: "3×15-20" },
        { name: "Écarté élastique", sets: "3×15-20" },
        { name: "Pull-over poulie", sets: "2×15-20" },
        { name: "Curl marteau", sets: "3×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "2×4", lift: "S", pct: [80, 80] },
        { name: "Développé Couché", sets: "2×5", lift: "B", pct: [80, 80] },
        { name: "Rowing Helms", sets: "2×10-12" },
        { name: "Abduction hanche", sets: "2×12-15" },
      ]},
    ],
  },
  {
    n: 8, title: "Pic d'intensité",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat", sets: "1×1", lift: "S", pct: [90, 95] },
        { name: "Squat", sets: "1×3", lift: "S", pct: [85, 90] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Extension lombaire", sets: "1×8-10" },
        { name: "Rowing buste appui", sets: "3×8-10" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Développé Couché pause", sets: "1×1", lift: "B", pct: [92.5, 97.5] },
        { name: "Développé Couché", sets: "1×2", lift: "B", pct: [95, 95] },
        { name: "Leg Curl", sets: "2×10-12" },
        { name: "Curl barre", sets: "3×6-8" },
        { name: "Face Pull", sets: "2×15-20" },
        { name: "Extension mollets", sets: "2×10-12" },
        { name: "Relevé jambes suspendu", sets: "2×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Squat Box", sets: "3×8" },
        { name: "Développé Couché départ pins", sets: "3×8", lift: "B", pct: [70, 80] },
        { name: "Tirage vertical prise neutre", sets: "3×6-8" },
        { name: "Extension triceps barre au front", sets: "2×8-10" },
      ]},
      { title: "Jour 4", exos: [
        { name: "Soulevé de Terre", sets: "1×1", lift: "D", pct: [95, 97.5] },
        { name: "Soulevé de Terre Touch-and-Go", sets: "2×8", lift: "D", pct: [65, 75] },
        { name: "Élévations latérales", sets: "3×15-20" },
        { name: "Écarté élastique", sets: "3×15-20" },
        { name: "Pull-over poulie", sets: "2×15-20" },
        { name: "Curl marteau", sets: "3×8-10" },
      ]},
      { title: "Jour 5", exos: [
        { name: "Squat", sets: "2×4", lift: "S", pct: [82.5, 82.5] },
        { name: "Développé Couché", sets: "1×5", lift: "B", pct: [82.5, 82.5] },
        { name: "Rowing Helms", sets: "2×10-12" },
        { name: "Abduction hanche", sets: "2×12-15" },
      ]},
    ],
  },
  {
    n: 9, title: "Tapering / Affûtage",
    days: [
      { title: "Jour 1", exos: [
        { name: "Squat (rapide et explosif)", sets: "1×1", lift: "S", pct: [90, 90] },
        { name: "Développé Couché pause", sets: "1×4", lift: "B", pct: [75, 75] },
        { name: "Soulevé de Terre (reset complet)", sets: "2×3", lift: "D", pct: [65, 65] },
        { name: "Rowing buste appui", sets: "4×6-8" },
      ]},
      { title: "Jour 2", exos: [
        { name: "Soulevé de Terre (rapide et explosif)", sets: "1×1", lift: "D", pct: [90, 90] },
        { name: "Développé Militaire", sets: "2×8", pct: [70, 70], note: "% du max OHP" },
        { name: "Squat Départ Mort", sets: "2×5", rpe: "5" },
        { name: "Curl barre", sets: "4×6-8" },
      ]},
      { title: "Jour 3", exos: [
        { name: "Développé Couché pause (rapide et explosif)", sets: "1×1", lift: "B", pct: [92.5, 92.5] },
        { name: "Squat", sets: "2×5", lift: "S", pct: [75, 75] },
        { name: "Leg Curl", sets: "4×6-8" },
        { name: "Face Pull", sets: "4×12-15" },
      ]},
    ],
  },
  {
    n: 10, title: "Test 1RM",
    days: [
      { title: "Test Squat", testLift: "S", exos: [
        { name: "Leg Curl", sets: "2×10" },
        { name: "Élévations latérales", sets: "2×15-20" },
      ]},
      { title: "Test Développé Couché", testLift: "B", exos: [
        { name: "Curl barre", sets: "1×3", rpe: "10" },
        { name: "Développé Militaire", sets: "2×5", rpe: "7" },
      ]},
      { title: "Test Soulevé de Terre", testLift: "D", exos: [
        { name: "Rowing buste appui", sets: "3×10-12" },
        { name: "Extension triceps barre au front", sets: "2×12-15" },
      ]},
    ],
  },
];

// ---------------------------------------------------------------------------
// Calculs
// ---------------------------------------------------------------------------

const PLATE_SET = [25, 20, 15, 10, 5, 2.5, 1.25];
const BAR_WEIGHT = 20;

function roundToStep(value, step = 2.5) {
  return Math.round(value / step) * step;
}

function computeLoad(max, pct) {
  if (!max || !pct) return null;
  return roundToStep((max * pct) / 100, 2.5);
}

function plateBreakdown(totalKg) {
  if (!totalKg || totalKg <= BAR_WEIGHT) return null;
  let perSide = (totalKg - BAR_WEIGHT) / 2;
  const used = [];
  for (const plate of PLATE_SET) {
    while (perSide >= plate - 0.001) {
      used.push(plate);
      perSide -= plate;
    }
  }
  if (used.length === 0) return null;
  return used.map((p) => (Number.isInteger(p) ? p : p.toFixed(2).replace(/0$/, ""))).join(" + ");
}

function fmt(n) {
  if (n === null || n === undefined) return "—";
  return Number.isInteger(n) ? `${n}` : n.toFixed(1).replace(/\.0$/, "");
}

// Pyramide d'échauffement standard, calculée sur le 1RM (pas sur le poids de travail du jour)
const WARMUP_STEPS = [
  { label: "Barre à vide", pct: null, reps: "15" },
  { label: "40 %", pct: [40, 40], reps: "5" },
  { label: "50 %", pct: [50, 50], reps: "4" },
  { label: "60 %", pct: [60, 60], reps: "3" },
  { label: "70–75 %", pct: [70, 75], reps: "2" },
];

function computeWarmupRows(max) {
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

// Échauffement général de séance — fixe, indépendant des maxes et du jour
const GENERAL_WARMUP = [
  { name: "Cardio basse intensité", sets: "N/A", reps: "5-10 min", notes: "Machine au choix, fréquence cardiaque 100–135 bpm" },
  { name: "Foam roller / balle de lacrosse", sets: "N/A", reps: "2-3 min", notes: "Quadriceps, dorsaux, mollets — balle de lacrosse en option pour pectoraux/deltoïdes/ischios" },
  { name: "Balancement de jambe avant/arrière", sets: "1", reps: "12", notes: "12 par jambe" },
  { name: "Balancement de jambe latéral", sets: "1", reps: "12", notes: "12 par jambe" },
  { name: "Contraction fessiers debout", sets: "1", reps: "15 sec", notes: "Contraction maximale" },
  { name: "Élévation trapèzes au sol (prone trap raise)", sets: "1", reps: "15", notes: "Connexion consciente avec le haut du dos" },
  { name: "Rotation externe à la poulie (optionnel)", sets: "1", reps: "15", notes: "15 par côté" },
  { name: "Rotation interne à la poulie (optionnel)", sets: "1", reps: "15", notes: "15 par côté" },
  { name: "Haussement d'épaules overhead (optionnel)", sets: "1", reps: "15", notes: "Légère contraction trapèzes en haut de chaque rep" },
];

// ---------------------------------------------------------------------------
// Calculs de séance (tonnage, séries)
// ---------------------------------------------------------------------------

// "3×5" -> {sets:3, reps:5} ; "2×8-10" -> {sets:2, reps:8} (borne basse)
function parseSets(setsStr) {
  if (!setsStr) return null;
  const m = String(setsStr).match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!m) return null;
  return { sets: parseInt(m[1], 10), reps: parseInt(m[2], 10) };
}

function dayStats(day, maxes) {
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
function dayIntensity(day) {
  const pcts = day.exos.filter((e) => e.pct && e.lift).map((e) => e.pct[1]);
  if (!pcts.length) return null;
  return Math.round(Math.max(...pcts));
}

// Mouvement dominant du jour, pour le sous-titre "SQUAT EMPHASIS"
function dayEmphasis(day) {
  if (day.testLift) return LIFTS[day.testLift].short;
  const counts = {};
  day.exos.forEach((e) => {
    if (e.lift) counts[e.lift] = (counts[e.lift] || 0) + 1;
  });
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return best ? `${LIFTS[best[0]].short} EMPHASIS` : "ACCESSOIRES";
}

// ---------------------------------------------------------------------------
// Persistance locale (localStorage)
// ---------------------------------------------------------------------------

function loadLocal(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [maxes, setMaxes] = useState({ S: "", B: "", D: "" });
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [done, setDone] = useState({});
  const [screen, setScreen] = useState("home"); // home | day | complete
  const saveTimer = useRef(null);

  useEffect(() => {
    const m = loadLocal("pb-maxes");
    if (m) setMaxes(m);
    const d = loadLocal("pb-done");
    if (d) setDone(d);
  }, []);

  const saveMaxes = useCallback((next) => {
    setMaxes(next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveLocal("pb-maxes", next);
    }, 400);
  }, []);

  const markDone = useCallback((key) => {
    setDone((prev) => {
      const next = { ...prev, [key]: true };
      saveLocal("pb-done", next);
      return next;
    });
  }, []);

  const week = weeks[weekIdx];
  const day = week.days[Math.min(dayIdx, week.days.length - 1)];
  const dayKey = `w${week.n}-d${dayIdx}`;
  const stats = dayStats(day, maxes);

  const totalDays = weeks.reduce((a, w) => a + w.days.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

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
          />
        )}
        {screen === "day" && (
          <DayScreen
            week={week} day={day} dayIdx={dayIdx} setDayIdx={setDayIdx}
            maxes={maxes} stats={stats} setScreen={setScreen}
            onFinish={() => { markDone(dayKey); setScreen("complete"); }}
          />
        )}
        {screen === "complete" && (
          <CompleteScreen
            week={week} day={day} dayIdx={dayIdx} stats={stats}
            weeks={weeks} weekIdx={weekIdx}
            onNext={() => {
              if (dayIdx < week.days.length - 1) setDayIdx(dayIdx + 1);
              else if (weekIdx < weeks.length - 1) { setWeekIdx(weekIdx + 1); setDayIdx(0); }
              setScreen("day");
            }}
            onHome={() => setScreen("home")}
          />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Écran 1 — Accueil
// ---------------------------------------------------------------------------

function ScreenLayout({ children, footer }) {
  return (
    <>
      <div className="pb-scroll" style={S.screen}>{children}</div>
      {footer && <div style={S.stickyFooter}>{footer}</div>}
    </>
  );
}

function HomeScreen({ maxes, saveMaxes, weeks, weekIdx, setWeekIdx, week, setDayIdx, setScreen, doneCount, totalDays }) {
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


// ---------------------------------------------------------------------------
// Écran 2 — Séance
// ---------------------------------------------------------------------------

function DayScreen({ week, day, dayIdx, setDayIdx, maxes, stats, setScreen, onFinish }) {
  const [warmOpen, setWarmOpen] = useState(false);
  const [genOpen, setGenOpen] = useState(false);
  const mainLift = day.testLift || (day.exos.find((e) => e.lift) || {}).lift;
  const warmRows = mainLift ? computeWarmupRows(maxes[mainLift]) : null;
  const top = stats.topSet;

  return (
    <ScreenLayout
      footer={
        <button style={S.primaryBtn} onClick={onFinish}>
          <Check size={15} strokeWidth={3} />
          {top ? `Valider · top set ${fmt(top.load)} kg` : "Valider la séance"}
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
      <div style={S.kickerSm}>{dayEmphasis(day)}</div>

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

        {day.exos.map((exo, i) => {
          const info = exo.lift ? LIFTS[exo.lift] : null;
          const max = exo.lift ? maxes[exo.lift] : null;
          let load = "—";
          if (exo.pct) {
            if (max) {
              const lo = computeLoad(max, exo.pct[0]);
              const hi = computeLoad(max, exo.pct[1]);
              load = exo.pct[0] === exo.pct[1] ? `${fmt(lo)}` : `${fmt(lo)}–${fmt(hi)}`;
            } else {
              load = exo.pct[0] === exo.pct[1] ? `${exo.pct[0]}%` : `${exo.pct[0]}–${exo.pct[1]}%`;
            }
          }
          return (
            <div key={i} style={S.exoRow}>
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
          );
        })}

        {stats.tonnage > 0 && (
          <div style={S.tonnageRow}>
            <span style={S.tonnageLabel}>Tonnage estimé</span>
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
    </ScreenLayout>
  );
}

// ---------------------------------------------------------------------------
// Écran 3 — Séance terminée
// ---------------------------------------------------------------------------

function CompleteScreen({ week, day, dayIdx, stats, weeks, weekIdx, onNext, onHome }) {
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
        {stats.workingSets} séries de travail enregistrées
      </div>

      <div style={S.statPanel}>
        <div style={S.statGrid}>
          <div>
            <div style={S.statLabel}>Tonnage</div>
            <div style={S.statValue}>
              {stats.tonnage > 0 ? stats.tonnage.toLocaleString("fr-FR") : "—"}
              <span style={S.statUnit}>kg</span>
            </div>
          </div>
          <div>
            <div style={S.statLabel}>Séries</div>
            <div style={S.statValue}>{stats.workingSets}</div>
          </div>
          <div>
            <div style={S.statLabel}>Top set</div>
            <div style={S.statValue}>
              {stats.topSet ? fmt(stats.topSet.load) : "—"}
              {stats.topSet && <span style={S.statUnit}>×{stats.topSet.reps}</span>}
            </div>
          </div>
          <div>
            <div style={S.statLabel}>Mouvements</div>
            <div style={S.statValue}>{stats.mainLifts.length}</div>
          </div>
        </div>

        {stats.mainLifts.length > 0 && (
          <div style={S.recapList}>
            {stats.mainLifts.map((m, i) => (
              <div key={i} style={S.recapRow}>
                <span style={S.recapName}>
                  <span style={{ ...S.dotSm, background: LIFTS[m.lift].color, boxShadow: `0 0 8px ${LIFTS[m.lift].color}` }} />
                  {m.name}
                </span>
                <span style={S.recapLoad}>{m.sets} · {fmt(m.load)} kg</span>
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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const RED = "#E4262F";
const RED_HI = "#FF3B30";
const BG = "#0A0A0C";
const SURFACE = "#141417";
const SURFACE_2 = "#1A1A1E";
const LINE = "rgba(255,255,255,0.07)";
const TXT = "#F4F4F5";
const DIM = "rgba(244,244,245,0.42)";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
* { -webkit-tap-highlight-color: transparent; }
html, body { overscroll-behavior-y: contain; }
input::placeholder { color: rgba(244,244,245,0.25); }
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
button { transition: opacity .15s, background .15s, border-color .15s; touch-action: manipulation; }
button:active { opacity: .7; }
.pb-scroll { -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain; }
`;

const S = {
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
    borderRadius: 16, padding: "16px 18px", marginBottom: 26,
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
    display: "flex", alignItems: "center", gap: 8,
    padding: "12px 16px", borderBottom: `1px solid ${LINE}`,
  },
  exoName: { fontSize: 13, color: TXT, fontWeight: 500, display: "flex", alignItems: "center", minWidth: 0 },
  tdCell: { fontSize: 12, color: DIM, fontWeight: 500 },
  tdCellStrong: { fontSize: 12.5, color: TXT, fontWeight: 700 },
  tdCellRpe: { fontSize: 12, color: RED_HI, fontWeight: 700 },
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
  ghostBtn: {
    width: "100%", padding: "12px 0", background: "transparent", border: "none",
    color: DIM, fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
    textTransform: "uppercase", cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
};
