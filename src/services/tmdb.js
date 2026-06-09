const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const genreNames = {
  12: "Action",
  14: "Sci-Fi",
  16: "Anime",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  53: "Thriller",
  80: "Thriller",
  99: "Documentary",
  878: "Sci-Fi",
  9648: "Thriller",
  10402: "Drama",
  10749: "Romance",
  10751: "Kids",
  10759: "Action",
  10762: "Kids",
  10764: "Documentary",
  10765: "Sci-Fi",
  10766: "Drama",
  10768: "Documentary",
};

const accents = ["#7C3AED", "#F59E0B", "#22D3EE", "#EF4444", "#34D399", "#F472B6"];

export function hasTmdbApiKey() {
  return Boolean(apiKey);
}

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

function mapTmdbItem(item, index = 0) {
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const genres = (item.genre_ids || []).map((id) => genreNames[id]).filter(Boolean);

  return {
    id: `tmdb-${mediaType}-${item.id}`,
    tmdbId: item.id,
    mediaType,
    title: item.title || item.name || "Untitled",
    year: year ? Number(year) : "N/A",
    rating: Number(item.vote_average || 0),
    genre: genres.length ? [...new Set(genres)].slice(0, 3) : ["Drama"],
    platform: "TMDB",
    badge: index < 10 ? "TOP 10" : "HD",
    runtime: mediaType === "tv" ? "Series" : "Movie",
    synopsis: item.overview || "No synopsis available.",
    thumbnail: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : "",
    isTrending: index < 18,
    isNew: index < 8,
    type: mediaType === "tv" ? "Series" : "Movie",
    rank: index + 1,
    progress: index < 6 ? Math.max(12, 88 - index * 8) : undefined,
    cast: ["TMDB metadata"],
    accent: accents[index % accents.length],
  };
}

export async function searchMovies(query) {
  const data = await requestTmdb("/search/multi", { query, include_adult: "false" });

  return data.results
    .filter((item) => ["movie", "tv"].includes(item.media_type) && item.poster_path)
    .map(mapTmdbItem);
}

export async function getTrendingCatalog() {
  const data = await requestTmdb("/trending/all/week");

  return data.results
    .filter((item) => ["movie", "tv"].includes(item.media_type) && item.poster_path)
    .map(mapTmdbItem);
}

export async function getTrailerKey(item) {
  const tmdbId = item?.tmdbId;
  const mediaType = item?.mediaType || (item?.type === "Series" ? "tv" : "movie");

  if (!tmdbId || !apiKey) return null;

  const data = await requestTmdb(`/${mediaType}/${tmdbId}/videos`);
  const candidate = data.results.find((video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")) || data.results.find((video) => video.site === "YouTube");
  return candidate?.key ?? null;
}
