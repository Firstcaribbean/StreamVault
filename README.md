# StreamVault

StreamVault is a premium dark-cinema streaming platform concept built as a static React single-page app with Vite and Tailwind CSS.

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production build outputs static assets to `dist/`.

## Deploying to Vercel

This repository is configured for Vercel deployment:

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Node runtime: `22.x`

The same settings are committed in `vercel.json` and `package.json`, so importing the repository into Vercel should require no manual overrides.

## Notes

- The app is fully static and requires no backend, database, or environment variables.
- Mock poster/backdrop images are loaded from `placehold.co` for preview purposes.
- `vercel.json` includes an SPA rewrite so deep links serve `index.html`.
