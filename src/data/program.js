// ---------------------------------------------------------------------------
// Données du programme — Coach n°2, Powerbuilding 3.0, bloc 10 semaines
// lift: 'S' squat | 'B' bench | 'D' deadlift | null (pas lié à un max SBD)
// pct: [min, max] ou null | rpe: string | note: texte libre (semaine test)
// ---------------------------------------------------------------------------

export const LIFTS = {
  S: { label: "Squat", short: "SQUAT", color: "#FF3B30" },   // disque 25 kg
  B: { label: "Bench", short: "BENCH", color: "#3B82F6" },   // disque 20 kg
  D: { label: "Deadlift", short: "DEADLIFT", color: "#EAB308" }, // disque 15 kg
};

export const weeks = [
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

// Pyramide d'échauffement standard, calculée sur le 1RM (pas sur le poids de travail du jour)
export const WARMUP_STEPS = [
  { label: "Barre à vide", pct: null, reps: "15" },
  { label: "40 %", pct: [40, 40], reps: "5" },
  { label: "50 %", pct: [50, 50], reps: "4" },
  { label: "60 %", pct: [60, 60], reps: "3" },
  { label: "70–75 %", pct: [70, 75], reps: "2" },
];

// Échauffement général de séance — fixe, indépendant des maxes et du jour
export const GENERAL_WARMUP = [
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

export const BAR_WEIGHT = 20;
