import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Destinations", to: "/destinations" },
  { label: "Guides", to: "/guides" },
  { label: "Weather", to: "/weather" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage =
    ["/destinations", "/guides", "/stories"].some((path) =>
      location.pathname.startsWith(path),
    ) ||
    ["/destination", "/guide", "/story"].some((path) =>
      location.pathname.startsWith(path),
    );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = (event) => {
    if (location.pathname === "/") {
      event.preventDefault();
      const hero = document.getElementById("home");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className={`site-nav fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-all duration-500 ${
        scrolled || menuOpen || isDetailPage
          ? "bg-emerald-950 shadow-[0_8px_30px_rgba(16,38,26,0.28)]"
          : "bg-emerald-950/95 shadow-[0_4px_20px_rgba(16,38,26,0.2)] backdrop-blur-lg"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10 lg:py-4 ${isDetailPage ? "lg:py-4" : "lg:py-4"}`}
      >
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="HillMittra home"
          className="flex h-9 items-center sm:h-11"
        >
          <img
            src="/HillMittra_Full_Logo.svg?v=2"
            alt=""
            className="h-full w-auto"
          />
        </button>

        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-yellow after:transition-all after:duration-300 hover:text-amber-300 hover:after:w-full xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/destinations"
            className="inline-flex rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-green shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore Hills
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 top-full w-full max-w-sm border-l border-white/10 bg-emerald-950 px-5 py-5 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium uppercase tracking-[0.16em] text-white transition hover:bg-white/10 hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/destinations"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex rounded-full bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-green transition hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore Hills
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
