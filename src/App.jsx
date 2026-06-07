import { AnimatePresence, motion } from "framer-motion";
import { RadioTower } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContentRow from "./components/ContentRow.jsx";
import Footer from "./components/Footer.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import Navbar from "./components/Navbar.jsx";
import PlayerModal from "./components/PlayerModal.jsx";
import SearchPage from "./components/SearchPage.jsx";
import Toast from "./components/Toast.jsx";
import { mockData } from "./data/mockData.js";

function PageShell({ children, viewKey }) {
  return (
    <motion.div
      key={viewKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function GridView({ title, subtitle, items, onWatch, onAdd, emptyLabel = "No titles here yet" }) {
  return (
    <section className="mx-auto min-h-screen max-w-[100rem] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-vault-light">StreamVault collection</p>
        <h1 className="mt-3 font-heading text-6xl leading-none text-white sm:text-7xl">{title}</h1>
        <p className="mt-3 text-white/62">{subtitle}</p>
      </div>
      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {items.map((item) => (
            <MovieCard key={item.id} item={item} onPlay={onWatch} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="grid min-h-[320px] place-items-center rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
          <div>
            <h2 className="font-heading text-5xl text-white">{emptyLabel}</h2>
            <p className="mt-2 text-white/58">Bookmark a title and it will appear here instantly.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function LiveTVView({ items, onWatch, onAdd }) {
  const liveItems = items.filter((item) => ["Action", "Drama", "Documentary", "Comedy"].some((genre) => item.genre.includes(genre))).slice(0, 16);

  return (
    <section className="mx-auto min-h-screen max-w-[100rem] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.28),transparent_34%),rgba(255,255,255,.045)] p-5 shadow-cinema backdrop-blur-xl lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-molten">
            <RadioTower className="h-4 w-4" />
            Live TV
          </p>
          <h1 className="mt-3 font-heading text-6xl leading-none text-white sm:text-7xl">Always-on cinema channels</h1>
          <p className="mt-3 max-w-2xl text-white/62">
            Mock live channels built from free vault programming, with premium guide styling and instant player access.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {["Action 24/7", "Awards", "Kids Vault"].map((channel) => (
            <div key={channel} className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">On now</p>
              <p className="mt-1 font-bold text-white">{channel}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {liveItems.map((item) => (
          <MovieCard key={item.id} item={item} onPlay={onWatch} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [myList, setMyList] = useState([]);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    document.title = activeView === "home" ? "StreamVault" : `StreamVault - ${activeView}`;
  }, [activeView]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const featuredItems = useMemo(() => mockData.filter((item) => item.isTrending).slice(0, 6), []);
  const relatedItems = useMemo(() => {
    if (!selectedItem) return mockData.slice(0, 4);
    return mockData
      .filter((item) => item.id !== selectedItem.id && item.genre.some((genre) => selectedItem.genre.includes(genre)))
      .slice(0, 6);
  }, [selectedItem]);

  const handleWatch = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleAdd = useCallback((item) => {
    setMyList((current) => (current.some((saved) => saved.id === item.id) ? current : [item, ...current]));
    setToast({ message: "Added to My List", detail: item.title });
  }, []);

  const rows = useMemo(
    () => [
      {
        title: "Continue Watching",
        kicker: "Resume in one click",
        showProgress: true,
        items: mockData.filter((item) => item.progress).sort((a, b) => b.progress - a.progress),
      },
      { title: "Trending Now", items: mockData.filter((item) => item.isTrending).sort((a, b) => a.rank - b.rank) },
      { title: "New Releases", items: mockData.filter((item) => item.isNew).sort((a, b) => b.year - a.year) },
      { title: "Top Rated on StreamVault", items: [...mockData].sort((a, b) => b.rating - a.rating).slice(0, 18) },
      { title: "From Netflix Originals", items: mockData.filter((item) => item.platform === "Netflix") },
      { title: "From Prime Video", items: mockData.filter((item) => item.platform === "Prime") },
      { title: "From Disney+ Vault", items: mockData.filter((item) => item.platform === "Disney+") },
      {
        title: "Recommended For You",
        kicker: "AI-personalized label",
        items: mockData.filter((item) => item.rating >= 7.5 && ["Sci-Fi", "Action", "Drama", "Anime"].some((genre) => item.genre.includes(genre))).slice(0, 20),
      },
      {
        title: "International & Award-Winning",
        items: mockData.filter((item) => item.genre.includes("Drama") || item.genre.includes("Documentary") || item.genre.includes("Anime")).slice(0, 18),
      },
    ],
    [],
  );

  const renderView = () => {
    if (activeView === "movies") {
      return (
        <GenreFilter
          items={mockData.filter((item) => item.type === "Movie")}
          title="Movies"
          subtitle="Filter the feature-film vault by genre, platform, and popularity."
          onWatch={handleWatch}
          onAdd={handleAdd}
        />
      );
    }

    if (activeView === "series") {
      return (
        <GenreFilter
          items={mockData.filter((item) => item.type === "Series")}
          title="Series"
          subtitle="Binge-ready seasons, anime, limited series, and prestige drama."
          onWatch={handleWatch}
          onAdd={handleAdd}
        />
      );
    }

    if (activeView === "live") {
      return <LiveTVView items={mockData} onWatch={handleWatch} onAdd={handleAdd} />;
    }

    if (activeView === "mylist") {
      return (
        <GridView
          title="My List"
          subtitle="Your guest-mode watchlist lives locally for this session."
          items={myList}
          onWatch={handleWatch}
          onAdd={handleAdd}
          emptyLabel="Your list is waiting"
        />
      );
    }

    if (activeView === "newhot") {
      return (
        <GridView
          title="New & Hot"
          subtitle="Fresh drops, rising favorites, and titles climbing the free charts."
          items={mockData.filter((item) => item.isNew || item.isTrending).sort((a, b) => a.rank - b.rank)}
          onWatch={handleWatch}
          onAdd={handleAdd}
        />
      );
    }

    if (activeView === "search") {
      return (
        <SearchPage
          items={mockData}
          query={searchTerm}
          setQuery={setSearchTerm}
          debouncedQuery={debouncedSearch}
          setDebouncedQuery={setDebouncedSearch}
          onWatch={handleWatch}
          onAdd={handleAdd}
        />
      );
    }

    return (
      <>
        <HeroBanner items={featuredItems} onWatch={handleWatch} onAdd={handleAdd} />
        <main className="relative z-10 -mt-8 bg-[linear-gradient(180deg,rgba(8,8,16,0),#080810_4rem,#080810_100%)] pb-8">
          {rows.map((row) => (
            <ContentRow
              key={row.title}
              title={row.title}
              kicker={row.kicker}
              items={row.items}
              showProgress={row.showProgress}
              onWatch={handleWatch}
              onAdd={handleAdd}
            />
          ))}
        </main>
        <Footer />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,.1),transparent_28%)]" />
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setDebouncedSearch={setDebouncedSearch}
        myListCount={myList.length}
      />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <PageShell viewKey={activeView}>{renderView()}</PageShell>
        </AnimatePresence>
      </div>
      <PlayerModal item={selectedItem} onClose={() => setSelectedItem(null)} related={relatedItems} />
      <Toast message={toast?.message} detail={toast?.detail} />
    </div>
  );
}
