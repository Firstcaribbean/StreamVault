import { AnimatePresence, motion } from "framer-motion";
import { Captions, Maximize, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getTrailerKey, hasTmdbApiKey } from "../services/tmdb.js";

export default function PlayerModal({ item, onClose, related = [] }) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(72);
  const [progress, setProgress] = useState(12);
  const [quality, setQuality] = useState("1080p");
  const [captions, setCaptions] = useState(true);
  const [showSkipIntro, setShowSkipIntro] = useState(true);
  const [adCountdown, setAdCountdown] = useState(5);
  const [canSkipAd, setCanSkipAd] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  useEffect(() => {
    if (!item) return undefined;
    setPlaying(true);
    setProgress(12);
    setShowSkipIntro(true);
    setAdCountdown(5);
    setCanSkipAd(false);
    setTrailerKey(null);
    setTrailerLoading(false);

    const introTimer = window.setTimeout(() => setShowSkipIntro(false), 3000);
    const adTimer = window.setInterval(() => {
      setAdCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(adTimer);
          setCanSkipAd(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearTimeout(introTimer);
      window.clearInterval(adTimer);
    };
  }, [item]);

  useEffect(() => {
    if (!item || !hasTmdbApiKey() || !item.tmdbId) return undefined;

    let active = true;
    setTrailerLoading(true);

    getTrailerKey(item)
      .then((key) => {
        if (active) setTrailerKey(key);
      })
      .catch(() => {
        if (active) setTrailerKey(null);
      })
      .finally(() => {
        if (active) setTrailerLoading(false);
      });

    return () => {
      active = false;
    };
  }, [item]);

  useEffect(() => {
    if (!item || !playing || trailerKey) return undefined;
    const timer = window.setInterval(() => {
      setProgress((current) => (current >= 98 ? 8 : current + 0.55));
    }, 500);
    return () => window.clearInterval(timer);
  }, [item, playing, trailerKey]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === " ") {
        event.preventDefault();
        setPlaying((current) => !current);
      }
    };

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  const displayRelated = useMemo(() => related.filter((candidate) => candidate.id !== item?.id).slice(0, 4), [item?.id, related]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/88 p-3 backdrop-blur-xl sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} player`}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-4 top-4 z-[90] grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20 focus-visible:focus-ring"
            aria-label="Close player"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.div
            className="grid max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-obsidian-soft shadow-cinema lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.65fr)]"
            initial={{ scale: 0.95, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 24 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="relative min-h-[320px] bg-black lg:min-h-[620px]">
              {trailerKey ? (
                <iframe
                  title={`${item.title} trailer`}
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,0,0,.58), rgba(0,0,0,.15)), radial-gradient(circle at 24% 18%, ${item.accent}88, transparent 34%), url(${item.thumbnail}) center/cover`,
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,.72))]" />
                </>
              )}
              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
                {trailerKey ? "Trailer" : "Ad - Free access stream"}
              </div>

              {trailerLoading ? (
                <div className="absolute left-5 top-16 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
                  Loading trailer
                </div>
              ) : null}

              {showSkipIntro && !trailerKey ? (
                <button
                  type="button"
                  onClick={() => setShowSkipIntro(false)}
                  className="absolute bottom-28 right-5 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:border-molten/50 hover:text-molten focus-visible:focus-ring"
                >
                  Skip Intro
                </button>
              ) : null}

              {!trailerKey ? (
                <div className="absolute right-5 top-16">
                  {canSkipAd ? (
                    <button
                      type="button"
                      onClick={() => setCanSkipAd(false)}
                      className="rounded-full border border-molten/50 bg-molten/20 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-molten shadow-gold-glow transition hover:bg-molten hover:text-black focus-visible:focus-ring"
                    >
                      Skip Ad
                    </button>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm font-bold text-white/70 backdrop-blur-xl">
                      Skip Ad in {adCountdown}s
                    </span>
                  )}
                </div>
              ) : null}

              {!trailerKey ? (
                <div className="absolute inset-0 grid place-items-center">
                  <button
                    type="button"
                    onClick={() => setPlaying((current) => !current)}
                    className="grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-xl transition hover:scale-110 hover:bg-vault/70 focus-visible:focus-ring"
                    aria-label={playing ? "Pause video" : "Play video"}
                  >
                    {playing ? <Pause className="h-10 w-10 fill-current" /> : <Play className="h-10 w-10 fill-current" />}
                  </button>
                </div>
              ) : null}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/88 to-transparent p-4 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="w-12 text-xs font-bold text-white/70">{Math.floor(progress / 3)}:{Math.floor(progress % 3) * 20 || "00"}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(event) => setProgress(Number(event.target.value))}
                    className="h-1 flex-1 accent-vault"
                    aria-label="Seek video"
                  />
                  <span className="w-12 text-right text-xs font-bold text-white/70">{item.runtime}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPlaying((current) => !current)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:focus-ring"
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                  </button>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                    <Volume2 className="h-4 w-4 text-white/75" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(event) => setVolume(Number(event.target.value))}
                      className="w-20 accent-molten"
                      aria-label="Volume"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCaptions((current) => !current)}
                    className={`grid h-10 w-10 place-items-center rounded-full transition focus-visible:focus-ring ${
                      captions ? "bg-vault text-white" : "bg-white/10 text-white/75 hover:bg-white/20"
                    }`}
                    aria-label="Toggle subtitles"
                  >
                    <Captions className="h-5 w-5" />
                  </button>
                  <select
                    value={quality}
                    onChange={(event) => setQuality(event.target.value)}
                    className="h-10 rounded-full border border-white/10 bg-white/10 px-3 text-sm font-bold text-white outline-none focus:border-vault"
                    aria-label="Video quality"
                  >
                    <option className="bg-obsidian" value="1080p">
                      1080p
                    </option>
                    <option className="bg-obsidian" value="4K">
                      4K
                    </option>
                  </select>
                  <button
                    type="button"
                    className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white focus-visible:focus-ring"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <aside className="max-h-[92vh] overflow-y-auto border-t border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:border-l lg:border-t-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-vault-light">
                {item.platform} - {item.badge}
              </p>
              <h2 className="mt-3 font-heading text-5xl leading-none text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">{item.synopsis}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-black/20 p-3 text-center">
                <div>
                  <p className="text-xs uppercase text-white/45">Year</p>
                  <p className="font-bold">{item.year}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-white/45">Rating</p>
                  <p className="font-bold">{item.rating}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-white/45">Runtime</p>
                  <p className="font-bold">{item.runtime}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">Cast</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.cast.map((name) => (
                    <span key={name} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/75">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7">
                <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">Related Titles</h3>
                <div className="mt-3 grid gap-3">
                  {displayRelated.map((candidate) => (
                    <div key={candidate.id} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.05] p-2">
                      <img src={candidate.thumbnail} alt="" className="h-20 w-14 rounded-md object-cover" />
                      <div>
                        <p className="font-bold text-white">{candidate.title}</p>
                        <p className="text-xs text-white/55">
                          {candidate.year} - {candidate.genre.join(", ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
