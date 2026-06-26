export const projects = [
  {
    id: "ecolife",
    name: "EcoLife",
    subtitle: "Gamified Carbon Footprint Tracker",
    stack: ["Flutter", "Firebase"],
    date: "Jan 2026",
    images: [
      "/images/ecolife.mp4",
    ],
    badge: "🥇 TechRush 1st Place",
    description: `Diagnosed a retention gap in existing environmental apps — 
users log once, then leave. Repositioned the product around 
personalized, gamified experiences to drive actual behaviour change.

Defined a 5-feature MVP: onboarding, EcoScore engine, daily 
logging, campus leaderboard, and rewards system. Coordinated 
design and dev across end-to-end user flows.

Shipped a demo-ready Android APK on a single Flutter codebase 
within a 7-day sprint.`,
    github: "https://github.com",
    color: "#D4EDD4",
  },
  {
    id: "sign-to-speech",
    name: "Sign-to-Speech Translator",
    subtitle: "Affective ASL-to-Speech Pipeline",
    stack: ["Python", "TensorFlow", "MediaPipe", "DeepFace"],
    date: "May 2026",
    images: ["/images/sih.jpg", "/images/arvr.jpg"],
    badge: null,
    description: `Existing ASL tools miss emotional intent — they translate 
gestures but flatten affect. Built a real-time pipeline that 
fuses LSTM gesture classification (7 ASL signs, ≥85% accuracy) 
with facial emotion detection to modulate speech delivery.

4-stage local inference pipeline: landmark extraction → 
classification → emotion fusion → TTS. Achieves <200ms latency 
at 15 FPS on CPU with zero cloud dependency.`,
    github: "https://github.com",
    color: "#D4D4ED",
  },
  {
    id: "museum",
    name: "Museum of Useless Details",
    subtitle: "Interactive Front-End Experiment",
    stack: ["HTML", "CSS", "JavaScript"],
    date: "Nov 2025",
    images: ["/images/museum-of-useless-details.mp4"],
    badge: null,
    description: `A UX hypothesis in interactive form: facts retain better 
through interaction than static text.

Built an interactive solar system with clickable planets, 
randomised space-fact modals, and scroll-driven animations. 
Each interaction reveals something you didn't expect.

Pure vanilla frontend — no frameworks, just the craft.`,
    github: "https://github.com",
    color: "#EDD4D4",
  },
]
