import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard.jsx";

function SkeletonCard() {
  return (
    <div className="w-[9.2rem] shrink-0 sm:w-44 md:w-48 xl:w-52">
      <div className="aspect-[2/3] rounded-lg border border-white/10 bg-[linear-gradient(110deg,#121225,45%,#272751,55%,#121225)] bg-[length:220%_100%] shadow-xl shadow-black/25 animate-shimmer" />
      <div className="mt-3 h-3 w-3/4 rounded-full bg-white/10" />
      <div className="mt-2 h-3 w-1/2 rounded-full bg-white/5" />
    </div>
  );
}

export default function ContentRow({ title, items, onWatch, onAdd, showProgress = false, kicker }) {
  const rowRef = useRef(null);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 640 + (title.length % 5) * 120);
    return () => window.clearTimeout(timer);
  }, [title]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollByCard = useCallback((direction) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * Math.min(760, row.clientWidth * 0.88), behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`group relative mx-auto max-w-[100rem] px-4 py-6 transition-all duration-700 sm:px-6 lg:px-8 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          {kicker ? <p className="text-xs font-bold uppercase tracking-[0.24em] text-vault-light">{kicker}</p> : null}
          <h2 className="font-heading text-3xl tracking-normal text-white sm:text-4xl">{title}</h2>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/65 transition hover:border-molten/40 hover:text-molten focus-visible:focus-ring"
        >
          See All
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/55 text-white opacity-0 backdrop-blur-xl transition hover:scale-105 hover:border-vault/60 hover:text-vault-light group-hover:grid group-hover:opacity-100 focus-visible:focus-ring lg:grid"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div ref={rowRef} className="hide-scrollbar flex gap-3 overflow-x-auto overflow-y-visible scroll-smooth py-3 pr-8 sm:gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
            : items.map((item) => (
                <MovieCard key={item.id} item={item} onPlay={onWatch} onAdd={onAdd} showProgress={showProgress} />
              ))}
        </div>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/55 text-white opacity-0 backdrop-blur-xl transition hover:scale-105 hover:border-vault/60 hover:text-vault-light group-hover:grid group-hover:opacity-100 focus-visible:focus-ring lg:grid"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
