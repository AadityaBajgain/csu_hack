# HERB – AI Symptom Companion

HERB (“HealthAI”) is a multimodal health triage assistant built with Next.js 16.  
Patients describe their symptoms, optionally add photos, and HERB analyzes the inputs with Google Gemini to return structured insights, recommended next steps, and a targeted list of nearby specialists.

---

## ✨ Features

- **Multimodal diagnosis** – Sends symptom descriptions and uploaded photos to Google Gemini (`gemini-2.0-flash`) for structured JSON insights.
- **Condition breakdown** – Shows probabilities, descriptions, and action items for each likely condition.
- **Specialty-aware maps** – Derives the appropriate medical specialty from the AI response and feeds it to the Google Places API to surface nearby hospitals/clinics. Users can jump straight to `/map` with context-preserving query parameters.
- **Responsive UX** – Friendly, glassmorphism-inspired interface with animated cards and accessible typography.
- **Client-side state sharing** – The latest AI response is stored in a tiny `useSyncExternalStore` wrapper (`lib/diagnosisResponse.js`) so the diagnosis page and map view can access the same data without relying on session storage.

---

## 🧱 Tech Stack

| Layer | Details |
|-------|---------|
| Framework | [Next.js 16 (App Router)](https://nextjs.org/) |
| UI | React 19 with utility-first styling |
| AI | [`@google/genai`](https://www.npmjs.com/package/@google/genai`) – Gemini multimodal model |
| Maps | [`@react-google-maps/api`](https://react-google-maps-api-docs.netlify.app/) for Places search, markers, and info windows |
| State sharing | Lightweight diagnosis store via `useSyncExternalStore` |
| Linting | ESLint 9 with `eslint-config-next` |
| Styling | Custom glassmorphism classes defined in `app/globals.css` |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ (per Next.js 16 requirement)
- npm 9+ (or pnpm/yarn/bun if you prefer)
- Google Cloud project with **Gemini API** enabled
- Google Cloud API key with **Maps JavaScript** + **Places** enabled

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create `.env.local` and add:

```bash
GOOGLE_GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here
```

| Variable | Used In | Purpose |
|----------|---------|---------|
| `GOOGLE_GEMINI_API_KEY` | `app/api/gemini/route.js` | Server-side Gemini requests |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | `components/MapComp.jsx` | Client Places & Maps SDK |

### 4. Run locally
```bash
npm run dev
# visit http://localhost:3000
```

### 5. Production build
```bash
npm run build
npm run start
```

### 6. Lint
```bash
npm run lint
```

---

## 🗂️ Key Modules

| Path | Description |
|------|-------------|
| `app/page.jsx` | Landing page with product messaging and CTAs |
| `components/DiagnosisForm.jsx` | Client form, Gemini call, result rendering, map CTA |
| `app/api/gemini/route.js` | API route that calls Gemini and normalizes JSON |
| `components/MapComp.jsx` | Google Map + Places search, optionally driven by AI response |
| `app/(routes)/map/page.jsx` | Map page that reads query overrides and shared diagnosis state |
| `lib/diagnosisResponse.js` | `useSyncExternalStore` wrapper exposing latest AI response |
| `lib/specialityHospitals.js` | Maps condition keywords/specialty hint to Places keyword/type |

---

## 🔄 Core Flow

1. **User submission** – `DiagnosisForm` captures symptoms and optional photos, converts images to base64, and posts to `/api/gemini`.
2. **Gemini analysis** – The API returns structured JSON (`analysis.summary`, conditions, follow-up notes, care level, and `whichSpecialityHospitalToGo`).
3. **Results UI** – The form displays conditions with probabilities, suggested actions, and a CTA to “Check specialty places”.
4. **State sharing** – The full response is saved via `setDiagnosisResponse()` so other views can read it.
5. **Map experience** – `/map` and `MapComp` derive the search settings from either query params or the shared AI response, calling Google Places to show nearby matches.

---

## 📌 Notes & Limitations

- **Not medical advice** – HERB provides informational guidance only; the UI reinforces this disclaimer.
- **Privacy** – Images are processed in memory (converted to base64) and sent directly to Gemini; no persistent storage is used.
- **Error handling** – Network or parsing failures surface friendly error messages to the user.
- **Suspense requirement** – Components using `useSearchParams()` are wrapped in `<Suspense>` boundaries (e.g., the `/map` page shell).

---

## 📷 Screenshots (optional)

1. Diagnosis Form
![Diagnosis Form](<Screenshot 2025-11-02 at 17.08.22.png>)

2. Map View
![Map Page](<Screenshot 2025-11-02 at 17.08.58.png>)

---

## 🤝 Contributing

1. Fork the repo and create a feature branch.  
2. Follow the existing utility-first styling conventions.  
3. Keep lint (`npm run lint`) and build (`npm run build`) passing.  
4. Submit a PR describing your changes and testing steps.

---

