import { motion } from "framer-motion";
import { BookmarkPlus, Play } from "lucide-react";
import StarRating from "./StarRating.jsx";

const badgeClasses = {
  NEW: "border-ember/40 bg-ember/25 text-red-100",
  HD: "border-aurora/40 bg-aurora/20 text-cyan-100",
  "4K": "border-vault/50 bg-vault/25 text-violet-100",
  "TOP 10": "border-molten/50 bg-molten/25 text-amber-100",
  FREE: "border-emerald-300/40 bg-emerald-400/20 text-emerald-100",
};

export default function MovieCard({ item, onPlay, onAdd, showProgress = false }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="group relative w-[9.2rem] shrink-0 rounded-lg outline-none sm:w-44 md:w-48 xl:w-52"
      tabIndex={0}
      aria-label={`${item.title}, ${item.year}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-obsidian-soft shadow-xl shadow-black/30 transition duration-300 group-hover:border-vault/60 group-hover:shadow-glow group-focus-within:border-vault/60">
        <img
          src={item.thumbnail}
          alt={`${item.title} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-focus-within:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase leading-none ${badgeClasses[item.badge] ?? badgeClasses.HD}`}>
            {item.badge}
          </span>
          {item.isNew ? (
            <span className="rounded-full border border-white/20 bg-white/15 px-2 py-1 text-[10px] font-black uppercase leading-none text-white">
              NEW
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onAdd(item)}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/45 text-white/80 opacity-0 backdrop-blur-md transition duration-300 hover:border-molten/60 hover:text-molten group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:focus-ring"
          aria-label={`Add ${item.title} to My List`}
        >
          <BookmarkPlus className="h-4 w-4" />
        </button>

        {showProgress && item.progress ? (
          <div className="absolute inset-x-3 bottom-14 h-1 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-molten" style={{ width: `${item.progress}%` }} />
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 p-3 transition duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
          <h3 className="line-clamp-2 text-sm font-bold text-white">{item.title}</h3>
          {showProgress && item.progress ? <p className="mt-1 text-[11px] text-white/60">{item.progress}% watched</p> : null}
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/82 to-black/20 p-3 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="translate-y-4 transition duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            <div className="mb-2 inline-flex rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-bold uppercase text-white/80">
              {item.genre[0]}
            </div>
            <h3 className="line-clamp-2 text-sm font-black text-white">{item.title}</h3>
            <StarRating rating={item.rating} compact />
            <p className="mt-2 line-clamp-3 text-[11px] leading-4 text-white/70">{item.synopsis}</p>
            <button
              type="button"
              onClick={() => onPlay(item)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-vault px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-glow transition hover:bg-vault-light focus-visible:focus-ring"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Play
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
