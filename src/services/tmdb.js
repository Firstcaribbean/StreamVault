const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

async function requestTmdb(path, params = {}) {
  if (!apiKey) {
    throw new Error("Missing VITE_TMDB_API_KEY. Add it to .env.local or Vercel environment variables.");
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query) {
  const data = await requestTmdb("/search/multi", { query, include_adult: "false" });

  return data.results.map((item) => ({
    id: `tmdb-${item.media_type}-${item.id}`,
    title: item.title || item.name || "Untitled",
    year: (item.release_date || item.first_air_date || "").slice(0, 4) || "N/A",
    rating: item.vote_average || 0,
    genre: [],
    platform: "TMDB",
    badge: "API",
    runtime: item.media_type === "tv" ? "Series" : "Movie",
    synopsis: item.overview || "No synopsis available.",
    thumbnail: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : "",
    isTrending: false,
    isNew: false,
    type: item.media_type === "tv" ? "Series" : "Movie",
    rank: item.popularity || 999,
    cast: [],
    accent: "#7C3AED",
  }));
}

export async function getTrendingMovies() {
  const data = await requestTmdb("/trending/all/week");
  return data.results;
}
