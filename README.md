# Leadership Assessment

A 20-question management style assessment covering decision-making, feedback,
conflict resolution, delegation, empathy, and more. Multi-select questions
score across 5 management styles (including the Emotionally Intelligent
Leader), then generate a personalized growth roadmap.

Manager accounts can create a team, invite members by email, and view an
aggregate team dashboard with style/empathy breakdowns.

## Stack

- React + Vite + Tailwind CSS v4
- Recharts for results visualizations
- Firebase Analytics for usage tracking
- `mailto:` links for sending results/invites (no backend required)
- Data persisted in `localStorage` (per-browser, no server)

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in Firebase config to enable analytics
(optional — the app works without it).

## Build

```bash
npm run build
```

Deployed via Vercel with auto-deploy on push to `main`.
