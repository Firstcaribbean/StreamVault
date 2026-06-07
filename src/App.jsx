import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Bookmark, Check, ChevronLeft, ChevronRight, Facebook, Gamepad2, Github, Headphones, Instagram, Laptop, Maximize, Menu, Monitor, Pause, Play, Plus, Search, Smartphone, Star, Subtitles, Tablet, Tv, Volume2, X } from 'lucide-react'
import { featured, genres, movies, platforms, rowDefinitions } from './mockData'

const cn = (...classes) => classes.filter(Boolean).join(' ')

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function useVisible() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.16 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

function Navbar({ activeView, setActiveView, onSearchFocus }) {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['Home', 'Movies', 'Series', 'Live TV', 'My List', 'New & Hot']
  const nav = (link) => {
    setActiveView(link === 'Home' ? 'home' : link === 'Movies' || link === 'Series' || link === 'New & Hot' ? 'genres' : 'home')
    setMenuOpen(false)
  }
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-obsidian/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1800px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <button className="group flex items-center gap-2" onClick={() => setActiveView('home')} aria-label="StreamVault home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-vault shadow-glow transition group-hover:scale-110"><Play className="h-5 w-5 fill-white" /></span>
          <span className="font-heading text-3xl tracking-wide">Stream<span className="text-molten">Vault</span></span>
        </button>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((link) => <button key={link} onClick={() => nav(link)} className={cn('rounded-full px-4 py-2 text-sm font-bold text-white/70 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white', (activeView === 'home' && link === 'Home') || (activeView === 'genres' && ['Movies', 'Series', 'New & Hot'].includes(link)) ? 'bg-white/10 text-white' : '')}>{link}</button>)}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button onClick={onSearchFocus} className="group hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/70 transition-all focus-within:w-72 hover:border-vault/60 md:flex">
            <Search className="h-4 w-4" /><span className="text-sm">Search titles</span>
          </button>
          <button className="rounded-full p-2 text-white/75 transition hover:bg-white/10 hover:text-molten"><Bell className="h-5 w-5" /></button>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1 pr-3 transition hover:border-vault/60"><span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-vault to-molten text-sm font-black">G</span><span className="hidden text-sm font-bold sm:block">Guest</span></button>
            {open && <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#11111f]/95 p-3 shadow-2xl backdrop-blur-xl"><p className="text-sm font-bold">Guest Mode</p><p className="mt-1 text-xs text-white/55">Free access enabled. No sign-up needed.</p><button className="mt-3 w-full rounded-xl bg-vault px-3 py-2 text-sm font-bold">Upgrade vibes</button></div>}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2 lg:hidden"><Menu /></button>
        </div>
      </div>
      {menuOpen && <nav className="grid gap-1 border-t border-white/10 bg-obsidian/95 px-4 py-3 lg:hidden">{links.map((link) => <button key={link} onClick={() => nav(link)} className="rounded-xl px-3 py-3 text-left font-bold text-white/75 hover:bg-white/10">{link}</button>)}</nav>}
    </header>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined
    let raf
    const particles = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + .4, s: Math.random() * .35 + .08 }))
    const draw = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => { p.y = (p.y + p.s / 1000) % 1; ctx.fillStyle = `rgba(255,255,255,${0.25 + p.r / 4})`; ctx.beginPath(); ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * ratio, 0, Math.PI * 2); ctx.fill() })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden />
}

function HeroBanner({ onPlay, onToast }) {
  const [index, setIndex] = useState(0)
  const item = featured[index]
  useEffect(() => { const timer = setInterval(() => setIndex((i) => (i + 1) % featured.length), 6500); return () => clearInterval(timer) }, [])
  return (
    <section id="home" className={cn('cinema-grain relative min-h-screen overflow-hidden bg-gradient-to-br pt-28 transition-colors duration-700', item.heroTint)}>
      <ParticleCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,.28),transparent_30%),linear-gradient(90deg,#080810_0%,rgba(8,8,16,.7)_45%,rgba(8,8,16,.2)_100%)]" />
      <img src={item.backdrop} alt="" className="absolute inset-y-0 right-0 hidden h-full w-2/3 object-cover opacity-30 mix-blend-screen lg:block" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1800px] items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <div className="mb-5 inline-flex animate-float items-center gap-2 rounded-full border border-molten/40 bg-molten/10 px-4 py-2 text-sm font-black text-molten shadow-gold">🔓 100% Free · No Credit Card · No Sign-up</div>
          <div className="mb-3 inline-flex rounded-full bg-vault/20 px-3 py-1 text-sm font-black text-violet-200">🔥 #3 in Nigeria Today</div>
          <h1 className="font-heading text-7xl leading-none tracking-wide sm:text-8xl lg:text-[10rem]">{item.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold text-white/75"><span className="text-molten">★ {item.rating}</span><span>{item.year}</span><span>{item.runtime}</span>{item.genre.map((g) => <span key={g} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{g}</span>)}</div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{item.synopsis}</p>
          <div className="mt-8 flex flex-wrap gap-4"><button onClick={() => onPlay(item)} className="animate-pulseGlow rounded-full bg-white px-7 py-4 font-black text-obsidian transition hover:-translate-y-1 hover:scale-105"><Play className="mr-2 inline h-5 w-5 fill-obsidian" /> Watch Now</button><button onClick={onToast} className="rounded-full border border-white/15 bg-white/10 px-7 py-4 font-black transition hover:-translate-y-1 hover:border-molten hover:text-molten"><Plus className="mr-2 inline h-5 w-5" /> Add to List</button></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:block"><div className="absolute -inset-8 rounded-[3rem] bg-vault/25 blur-3xl" /><img src={item.thumbnail} alt={item.title} className="relative ml-auto w-[390px] rounded-[2rem] border border-white/15 shadow-2xl" /></motion.div>
      </div>
    </section>
  )
}

function Rating({ value }) {
  return <div className="flex gap-0.5" aria-label={`${value} out of 10 rating`}>{[1,2,3,4,5].map((s) => <Star key={s} className={cn('h-3.5 w-3.5 transition group-hover:scale-125', s <= Math.round(value / 2) ? 'fill-molten text-molten' : 'text-white/30')} />)}</div>
}

function MovieCard({ item, onPlay, onToast, compact = false }) {
  return (
    <article tabIndex="0" className={cn('group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] shadow-xl outline-none transition-all duration-300 hover:z-20 hover:-translate-y-2 hover:scale-105 hover:border-vault/70 hover:shadow-glow focus:z-20 focus:border-molten', compact ? 'w-40 sm:w-48' : 'w-44 sm:w-52 lg:w-60')}>
      <img loading="lazy" src={item.thumbnail} alt={item.title} className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-110" />
      <div className="absolute left-2 top-2 flex flex-wrap gap-1"><span className="rounded-md bg-molten px-2 py-1 text-[10px] font-black text-black">{item.badge}</span>{item.isNew && <span className="rounded-md bg-vault px-2 py-1 text-[10px] font-black">NEW</span>}</div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3"><h3 className="font-bold leading-tight">{item.title}</h3>{item.progress > 0 && <div className="mt-2 h-1.5 rounded-full bg-white/20"><div className="h-full rounded-full bg-molten" style={{ width: `${item.progress}%` }} /></div>}</div>
      <div className="absolute inset-0 flex translate-y-5 flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
        <Rating value={item.rating} /><p className="mt-2 line-clamp-3 text-xs leading-5 text-white/72">{item.synopsis}</p><div className="mt-2 flex flex-wrap gap-1"><span className="rounded-full bg-vault/25 px-2 py-1 text-[10px] font-bold text-violet-100">{item.genre[0]}</span><span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold">FREE</span></div>
        <div className="mt-3 flex gap-2"><button onClick={() => onPlay(item)} className="flex-1 rounded-full bg-vault px-3 py-2 text-xs font-black shadow-glow transition hover:bg-molten"><Play className="mr-1 inline h-3 w-3 fill-white" /> Play</button><button onClick={onToast} className="rounded-full bg-white/10 p-2 transition hover:bg-white/20" aria-label={`Add ${item.title} to list`}><Bookmark className="h-4 w-4" /></button></div>
      </div>
    </article>
  )
}

function SkeletonRow() {
  return <div className="flex gap-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-72 w-52 shrink-0 animate-shimmer rounded-2xl bg-white/10 shimmer" />)}</div>
}

function ContentRow({ title, items, onPlay, onToast }) {
  const scroller = useRef(null)
  const [loading, setLoading] = useState(true)
  const [ref, visible] = useVisible()
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 500 + Math.random() * 450); return () => clearTimeout(timer) }, [])
  const scroll = (dir) => scroller.current?.scrollBy({ left: dir * 720, behavior: 'smooth' })
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} className="group relative py-6">
      <div className="mb-4 flex items-end justify-between"><h2 className="font-heading text-3xl tracking-wide sm:text-4xl">{title}</h2><button className="text-sm font-black text-violet-200 transition hover:text-molten">See All →</button></div>
      <div className="relative">{loading ? <SkeletonRow /> : <div ref={scroller} className="no-scrollbar flex gap-4 overflow-x-auto pb-6 pt-2">{items.map((item) => <MovieCard key={`${title}-${item.id}`} item={item} onPlay={onPlay} onToast={onToast} />)}</div>}
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 opacity-0 backdrop-blur transition group-hover:opacity-100 md:block"><ChevronLeft /></button><button onClick={() => scroll(1)} className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 opacity-0 backdrop-blur transition group-hover:opacity-100 md:block"><ChevronRight /></button></div>
    </motion.section>
  )
}

function GenreFilter({ onPlay, onToast }) {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [platform, setPlatform] = useState('All')
  const [sort, setSort] = useState('Most Popular')
  const filtered = useMemo(() => {
    let data = movies.filter((m) => (platform === 'All' || m.platform === platform) && (!selectedGenres.length || selectedGenres.some((g) => m.genre.includes(g))))
    if (sort === 'Newest') data = [...data].sort((a, b) => b.year - a.year)
    if (sort === 'A–Z') data = [...data].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'Rating') data = [...data].sort((a, b) => b.rating - a.rating)
    return data
  }, [selectedGenres, platform, sort])
  return <section className="mx-auto max-w-[1800px] px-4 pt-32 sm:px-6 lg:px-10"><h1 className="font-heading text-6xl">Browse the Vault</h1><p className="mt-2 text-white/60">Filter by genre, source platform, and mood with smooth instant transitions.</p><div className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[.04] p-5"><ChipGroup items={genres} selected={selectedGenres} toggle={(g) => setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])} /><ChipGroup items={platforms} selected={[platform]} toggle={setPlatform} /><select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-obsidian px-4 py-3 font-bold md:w-64">{['Most Popular', 'Newest', 'A–Z', 'Rating'].map((s) => <option key={s}>{s}</option>)}</select></div><motion.div layout className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{filtered.map((item) => <MovieCard key={item.id} item={item} onPlay={onPlay} onToast={onToast} compact />)}</motion.div></section>
}

function ChipGroup({ items, selected, toggle }) { return <div className="flex flex-wrap gap-2">{items.map((item) => <button key={item} onClick={() => toggle(item)} className={cn('rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-0.5', selected.includes(item) ? 'border-vault bg-vault text-white shadow-glow' : 'border-white/10 bg-white/5 text-white/70 hover:border-molten')}>{item}</button>)}</div> }

function SearchPage({ query, setQuery, onPlay, onToast }) {
  const debounced = useDebounce(query, 300)
  const results = useMemo(() => movies.filter((m) => [m.title, m.platform, ...m.genre].join(' ').toLowerCase().includes(debounced.toLowerCase())), [debounced])
  const trending = ['Inception', 'Arcane', 'Shōgun', 'Free 4K', 'Disney classics']
  return <section className="mx-auto max-w-[1800px] px-4 pt-32 sm:px-6 lg:px-10"><h1 className="font-heading text-6xl">Search StreamVault</h1><div className="mt-6 flex max-w-3xl items-center gap-3 rounded-3xl border border-vault/40 bg-white/10 px-5 py-4 shadow-glow"><Search className="text-violet-200" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies, shows, genres, platforms..." className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-white/40" /></div>{!query && <div className="mt-8"><p className="mb-3 font-bold text-white/60">Trending Searches</p><ChipGroup items={trending} selected={[]} toggle={setQuery} /></div>}<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">{query && results.map((item) => <MovieCard key={item.id} item={item} onPlay={onPlay} onToast={onToast} compact />)}</div>{query && results.length === 0 && <div className="mt-16 rounded-3xl border border-white/10 bg-white/[.04] p-10 text-center text-xl font-bold text-white/65">No results found — try a different title</div>}</section>
}

function PlayerModal({ item, onClose }) {
  const [playing, setPlaying] = useState(true), [intro, setIntro] = useState(true), [ad, setAd] = useState(5)
  useEffect(() => { const close = (e) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  useEffect(() => { const t = setTimeout(() => setIntro(false), 3000); return () => clearTimeout(t) }, [item])
  useEffect(() => { const t = setInterval(() => setAd((a) => Math.max(0, a - 1)), 1000); return () => clearInterval(t) }, [item])
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/92 p-4 backdrop-blur-xl"><button onClick={onClose} className="absolute right-5 top-5 rounded-full bg-white/10 p-3 transition hover:bg-white/20" aria-label="Close player"><X /></button><div className="grid max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b14] shadow-2xl lg:grid-cols-[1fr_360px]"><div className="relative aspect-video min-h-[360px] bg-black"><img src={item.backdrop} alt="" className="h-full w-full object-cover opacity-55" /><div className="absolute inset-0 grid place-items-center"><button onClick={() => setPlaying(!playing)} className="grid h-24 w-24 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-110">{playing ? <Pause className="h-10 w-10 fill-white" /> : <Play className="h-10 w-10 fill-white" />}</button></div>{intro && <button className="absolute bottom-24 right-8 rounded-full bg-white px-5 py-3 font-black text-black">Skip Intro</button>}<button className="absolute right-8 top-8 rounded-full bg-black/70 px-4 py-2 text-sm font-black">{ad ? `Skip Ad in ${ad}` : 'Skip Ad'}</button><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-5"><div className="h-1.5 rounded-full bg-white/20"><div className="h-full w-1/3 rounded-full bg-vault" /></div><div className="mt-4 flex items-center gap-4"><button onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button><Volume2 /><span className="text-sm font-bold">00:42 / {item.runtime}</span><div className="ml-auto flex items-center gap-4"><Subtitles /><select className="rounded-lg bg-white/10 px-2 py-1 text-sm"><option>1080p</option><option>4K</option></select><Maximize /></div></div></div></div><aside className="overflow-y-auto p-6"><h2 className="font-heading text-5xl">{item.title}</h2><div className="mt-2 flex gap-2 text-sm font-bold text-white/60"><span className="text-molten">★ {item.rating}</span><span>{item.year}</span><span>{item.badge}</span></div><p className="mt-5 leading-7 text-white/70">{item.synopsis}</p><h3 className="mt-6 font-bold">Cast</h3><p className="mt-2 text-white/60">{item.cast.join(' · ')}</p><h3 className="mt-6 font-bold">Related titles</h3><div className="mt-3 grid grid-cols-2 gap-3">{movies.filter((m) => m.id !== item.id).slice(0, 4).map((m) => <button key={m.id} className="rounded-xl border border-white/10 bg-white/5 p-2 text-left text-sm font-bold hover:border-vault"><img src={m.thumbnail} alt="" className="mb-2 aspect-video w-full rounded-lg object-cover" />{m.title}</button>)}</div></aside></div></motion.div>
}

function Footer() { return <footer className="mt-20 border-t border-white/10 bg-black/30 px-4 py-12 sm:px-6 lg:px-10"><div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[1.2fr_1fr_1fr]"><div><div className="flex items-center gap-2 font-heading text-4xl"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-vault"><Play className="h-5 w-5 fill-white" /></span>Stream<span className="text-molten">Vault</span></div><p className="mt-3 text-white/60">The world's content. Always free.</p><p className="mt-6 max-w-xl text-sm leading-6 text-white/45">StreamVault does not host any content. All titles are aggregated from publicly available free sources.</p></div><div><h3 className="font-bold">Quick links</h3><div className="mt-4 grid grid-cols-2 gap-3 text-white/60">{['About', 'DMCA', 'Privacy', 'Terms', 'Contact'].map((l) => <a key={l} href="#home" className="hover:text-molten">{l}</a>)}</div></div><div><h3 className="font-bold">Available on all devices</h3><div className="mt-4 flex gap-3 text-white/65"><Smartphone /><Tablet /><Tv /><Laptop /><Monitor /><Gamepad2 /></div><div className="mt-6 flex gap-3"><Instagram /><Facebook /><Github /><Headphones /></div></div></div></footer> }

function Toast({ show }) { return <AnimatePresence>{show && <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-molten/40 bg-[#141424]/95 px-5 py-3 font-black shadow-gold backdrop-blur"><Check className="mr-2 inline h-5 w-5 text-molten" />Added to My List ✓</motion.div>}</AnimatePresence> }

export default function App() {
  const [activeView, setActiveView] = useState('home')
  const [query, setQuery] = useState('')
  const [playerItem, setPlayerItem] = useState(null)
  const [toast, setToast] = useState(false)
  const searchRef = useRef(null)
  const toastTimer = useRef(null)
  const showToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(true)
    toastTimer.current = setTimeout(() => setToast(false), 2200)
  }, [])
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])
  const openSearch = () => { setActiveView('search'); setTimeout(() => searchRef.current?.scrollIntoView({ behavior: 'smooth' }), 50) }
  return <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#1a1030_0%,#080810_42%)] text-white"><Navbar activeView={activeView} setActiveView={setActiveView} onSearchFocus={openSearch} /><AnimatePresence mode="wait"><motion.main key={activeView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>{activeView === 'home' && <><HeroBanner onPlay={setPlayerItem} onToast={showToast} /><section className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-10">{rowDefinitions.map(([title, items]) => <ContentRow key={title} title={title} items={items} onPlay={setPlayerItem} onToast={showToast} />)}</section></>}{activeView === 'genres' && <GenreFilter onPlay={setPlayerItem} onToast={showToast} />}{activeView === 'search' && <div ref={searchRef}><SearchPage query={query} setQuery={setQuery} onPlay={setPlayerItem} onToast={showToast} /></div>}</motion.main></AnimatePresence><Footer /><Toast show={toast} /><AnimatePresence>{playerItem && <PlayerModal item={playerItem} onClose={() => setPlayerItem(null)} />}</AnimatePresence></div>
}
