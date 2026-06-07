import { ChevronDown, Clapperboard, Menu, PlayCircle, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar.jsx";

const navItems = [
  { label: "Home", view: "home" },
  { label: "Movies", view: "movies" },
  { label: "Series", view: "series" },
  { label: "Live TV", view: "live" },
  { label: "My List", view: "mylist" },
  { label: "New & Hot", view: "newhot" },
];

export default function Navbar({ activeView, setActiveView, searchTerm, setSearchTerm, setDebouncedSearch, myListCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (view) => {
    setActiveView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled ? "border-b border-white/10 bg-obsidian/76 shadow-2xl shadow-black/30 backdrop-blur-2xl" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[100rem] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex shrink-0 items-center gap-2 rounded-full focus-visible:focus-ring"
          aria-label="StreamVault home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-vault/40 bg-vault/20 text-vault-light shadow-glow">
            <PlayCircle className="h-6 w-6 fill-vault/20" />
          </span>
          <span className="font-heading text-3xl tracking-normal text-white">StreamVault</span>
        </button>

        <div className="ml-4 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.view}
              type="button"
              onClick={() => navigate(item.view)}
              className={`rounded-full px-3 py-2 text-sm font-bold text-white/70 transition duration-200 hover:bg-white/10 hover:text-white focus-visible:focus-ring ${
                activeView === item.view ? "bg-white/10 text-white shadow-inner shadow-vault/20" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="ml-auto hidden min-w-0 items-center gap-3 md:flex">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onDebouncedChange={setDebouncedSearch}
            onFocus={() => setActiveView("search")}
            placeholder="Search StreamVault"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-2 pr-3 text-sm text-white/85 backdrop-blur-xl transition hover:border-vault/50 hover:text-white focus-visible:focus-ring"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-vault to-molten">
                <UserRound className="h-4 w-4" />
              </span>
              Guest
              <ChevronDown className="h-4 w-4" />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 mt-3 w-56 rounded-lg border border-white/10 bg-obsidian-soft/95 p-2 shadow-cinema backdrop-blur-2xl" role="menu">
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-vault-light">Guest mode</p>
                <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
                  My List ({myListCount})
                </button>
                <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
                  Free profile settings
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-obsidian-soft/95 p-3 shadow-cinema backdrop-blur-2xl md:hidden">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onDebouncedChange={setDebouncedSearch}
            onFocus={() => navigate("search")}
            placeholder="Search StreamVault"
          />
          <div className="mt-3 grid gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => navigate(item.view)}
                className={`flex items-center justify-between rounded-md px-3 py-3 text-left text-sm font-bold text-white/75 transition hover:bg-white/10 hover:text-white ${
                  activeView === item.view ? "bg-white/10 text-white" : ""
                }`}
              >
                {item.label}
                {item.view === "mylist" ? <span className="rounded-full bg-vault/25 px-2 py-0.5 text-xs">{myListCount}</span> : <Clapperboard className="h-4 w-4 text-vault-light" />}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
