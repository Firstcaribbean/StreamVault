# StreamVault

StreamVault is a Vite + React streaming-interface demo, ready to deploy on Vercel as a static app.

## Deploy on Vercel

Use this folder as the project root:

```text
C:\Users\AB TECH\Documents\Codex\2026-06-06\design-and-build-a-fully-functional\outputs\streamvault
```

Vercel settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

## Optional Free API

For real movie metadata, use TMDB. It is free for metadata, posters, trailers, genres, ratings, and search. It does not provide free movie streaming files.

1. Create a free TMDB account: https://www.themoviedb.org/signup
2. Open API settings: https://www.themoviedb.org/settings/api
3. Create an API key.
4. In Vercel, open Project Settings > Environment Variables.
5. Add:

```text
VITE_TMDB_API_KEY=your_tmdb_key_here
```

Local development can use a `.env.local` file with the same variable.

The current app ships with local mock data so it deploys without an API key. I added an optional TMDB helper at `src/services/tmdb.js`.

Use it from a component like this:

```js
import { searchMovies } from "./services/tmdb.js";

const results = await searchMovies("Dune");
```

Only call it after `VITE_TMDB_API_KEY` is set. TMDB provides metadata only, not free streaming video files.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```
