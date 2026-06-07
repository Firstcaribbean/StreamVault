import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { trendingSearches } from "../data/mockData.js";
import MovieCard from "./MovieCard.jsx";
import SearchBar from "./SearchBar.jsx";

export default function SearchPage({ items, query, setQuery, debouncedQuery, setDebouncedQuery, onWatch, onAdd }) {
  const [recentChip, setRecentChip] = useState("");

  const results = useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase();
    if (!needle) return [];

    return items.filter((item) => {
      const haystack = `${item.title} ${item.genre.join(" ")} ${item.platform} ${item.year}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [debouncedQuery, items]);

  const chooseChip = (chip) => {
    setRecentChip(chip);
    setQuery(chip);
    setDebouncedQuery(chip);
  };

  return (
    <section className="mx-auto min-h-screen max-w-[100rem] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-vault-light">Live search</p>
        <h1 className="mt-3 font-heading text-6xl leading-none text-white sm:text-7xl">Find anything in the vault</h1>
        <p className="mt-3 text-white/62">Search by title, genre, year, or platform. Results update after a tiny cinematic pause.</p>
      </div>

      <div className="mt-8 max-w-3xl">
        <SearchBar
          value={query}
          onChange={setQuery}
          onDebouncedChange={setDebouncedQuery}
          placeholder="Search movies, series, live TV"
          large
          autoFocus
        />
      </div>

      {!debouncedQuery ? (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/45">Trending Searches</p>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => chooseChip(chip)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:focus-ring ${
                  recentChip === chip ? "border-molten bg-molten text-black" : "border-white/10 bg-white/[0.06] text-white/75 hover:border-vault/50 hover:text-white"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}

      {debouncedQuery ? (
        <div className="mt-9">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-4xl text-white">Results for "{debouncedQuery}"</h2>
              <p className="text-sm text-white/55">{results.length} matching free titles</p>
            </div>
          </div>
          {results.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {results.map((item) => (
                <MovieCard key={item.id} item={item} onPlay={onWatch} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-[320px] place-items-center rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center">
              <div>
                <SearchX className="mx-auto h-12 w-12 text-vault-light" />
                <h3 className="mt-4 font-heading text-4xl text-white">No results found - try a different title</h3>
                <p className="mt-2 text-white/55">The vault is huge, but this search came back empty.</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
