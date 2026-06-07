import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { genres, platforms, sortOptions } from "../data/mockData.js";
import MovieCard from "./MovieCard.jsx";

export default function GenreFilter({ items, title = "Explore the Vault", subtitle, onWatch, onAdd }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState("Most Popular");

  const toggleGenre = (genre) => {
    setSelectedGenres((current) => (current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre]));
  };

  const filteredItems = useMemo(() => {
    const nextItems = items.filter((item) => {
      const genreMatch = selectedGenres.length === 0 || selectedGenres.some((genre) => item.genre.includes(genre));
      const platformMatch = platform === "All" || item.platform === platform;
      return genreMatch && platformMatch;
    });

    return [...nextItems].sort((a, b) => {
      if (sort === "Newest") return b.year - a.year;
      if (sort === "A-Z") return a.title.localeCompare(b.title);
      if (sort === "Rating") return b.rating - a.rating;
      return a.rank - b.rank;
    });
  }, [items, platform, selectedGenres, sort]);

  return (
    <section className="mx-auto max-w-[100rem] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-vault-light">
            <SlidersHorizontal className="h-4 w-4" />
            Genre filter
          </p>
          <h1 className="mt-3 font-heading text-6xl leading-none text-white sm:text-7xl">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-2xl text-white/65">{subtitle}</p> : null}
        </div>
        <label className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
          <span className="text-sm font-bold text-white/60">Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="bg-transparent text-sm font-black text-white outline-none"
            aria-label="Sort titles"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option} className="bg-obsidian">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Genres</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:focus-ring ${
                  selectedGenres.includes(genre)
                    ? "border-vault bg-vault text-white shadow-glow"
                    : "border-white/10 bg-white/[0.06] text-white/70 hover:border-vault/50 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Platform</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setPlatform(name)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:focus-ring ${
                  platform === name
                    ? "border-molten bg-molten text-black shadow-gold-glow"
                    : "border-white/10 bg-white/[0.06] text-white/70 hover:border-molten/50 hover:text-white"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <p className="text-sm text-white/55">
          Showing <span className="font-bold text-white">{filteredItems.length}</span> free titles
        </p>
        {selectedGenres.length || platform !== "All" ? (
          <button
            type="button"
            onClick={() => {
              setSelectedGenres([]);
              setPlatform("All");
            }}
            className="rounded-full px-3 py-2 text-sm font-bold text-vault-light transition hover:bg-white/10 focus-visible:focus-ring"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {filteredItems.map((item) => (
          <MovieCard key={item.id} item={item} onPlay={onWatch} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
