import { AnimatePresence, motion } from "framer-motion";
import { Play, Plus, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ParticleField from "./ParticleField.jsx";
import StarRating from "./StarRating.jsx";

const grain =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.34'/%3E%3C/svg%3E";

export default function HeroBanner({ items, onWatch, onAdd }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = items[activeIndex] ?? items[0];

  const nextSpotlight = useCallback(() => {
    if (!items.length) return;
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    const timer = window.setInterval(nextSpotlight, 6500);
    return () => window.clearInterval(timer);
  }, [nextSpotlight]);

  const spotlightTags = useMemo(() => featured?.genre.slice(0, 3) ?? [], [featured]);

  if (!featured) return null;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-obsidian pt-28 text-white"
      aria-label="Featured StreamVault spotlight"
    >
      <ParticleField accent={featured.accent} />
      <motion.div
        key={featured.id}
        className="absolute inset-0 z-0 opacity-80 blur-3xl"
        style={{
          background: `radial-gradient(circle at 22% 18%, ${featured.accent}70, transparent 30%),
            radial-gradient(circle at 76% 34%, rgba(245, 158, 11, 0.34), transparent 28%),
            linear-gradient(135deg, #080810 0%, ${featured.accent}22 52%, #080810 100%)`,
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(90deg,#080810_0%,rgba(8,8,16,.74)_50%,rgba(8,8,16,.18)_100%)]" />
      <div className="absolute inset-0 z-0 opacity-[0.16] mix-blend-screen" style={{ backgroundImage: `url("${grain}")` }} />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.04fr_.76fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-molten/30 bg-molten/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-molten shadow-gold-glow backdrop-blur-xl"
          >
            <ShieldCheck className="h-4 w-4" />
            100% Free - No Credit Card - No Sign-up
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span className="rounded-full border border-ember/40 bg-ember/15 px-3 py-1 font-bold text-ember">
                  #{featured.rank} in Nigeria Today
                </span>
                <StarRating rating={featured.rating} />
                <span>{featured.year}</span>
                <span>{featured.runtime}</span>
              </div>
              <h1 className="max-w-4xl font-heading text-[clamp(4.4rem,14vw,10.5rem)] leading-[0.82] tracking-normal text-white drop-shadow-[0_16px_70px_rgba(0,0,0,.65)]">
                {featured.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-2">
                {spotlightTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/80 backdrop-blur-xl">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">{featured.synopsis}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onWatch(featured)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-vault px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-glow transition duration-300 hover:-translate-y-1 hover:bg-vault-light hover:shadow-gold-glow focus-visible:focus-ring"
            >
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </button>
            <button
              type="button"
              onClick={() => onAdd(featured)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-molten/50 hover:text-molten focus-visible:focus-ring"
            >
              <Plus className="h-5 w-5" />
              Add to List
            </button>
          </div>

          <div className="mt-9 flex items-center gap-3" aria-label="Featured title selector">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:focus-ring ${
                  index === activeIndex ? "w-12 bg-molten" : "w-2.5 bg-white/35 hover:bg-white/70"
                }`}
                aria-label={`Show ${item.title}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="relative mx-auto hidden w-full max-w-sm lg:block"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-8 rounded-[2rem] opacity-70 blur-3xl" style={{ background: featured.accent }} />
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-cinema backdrop-blur-2xl">
            <img src={featured.thumbnail} alt="" className="aspect-[2/3] w-full object-cover" loading="eager" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-6">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-molten">Tonight's Vault Pick</p>
              <p className="mt-2 font-heading text-5xl leading-none">{featured.title}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
