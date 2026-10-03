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
      className={`fixed inset-x-0 top-0 z-50 border-b border-emerald-300/10 transition-all duration-500 ${
        scrolled || menuOpen || isDetailPage
          ? "bg-emerald-950/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10 lg:py-4 ${isDetailPage ? "lg:py-4" : "lg:py-4"}`}
      >
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Parvat Mittra home"
          className="flex h-9 items-center sm:h-11"
        >
          <img
            src="/HillMittra_Full_Logo.svg"
            alt=""
            className="h-full w-auto"
          />
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100 transition-all duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-300 after:transition-all after:duration-300 hover:text-amber-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/destinations"
            className="inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-500"
          >
            Explore Hills
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-emerald-100 backdrop-blur-sm transition hover:bg-white/20 lg:hidden"
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
            className="absolute right-0 top-full w-full max-w-sm border-l border-emerald-300/10 bg-emerald-950/95 px-5 py-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-100 transition hover:bg-white/10 hover:text-amber-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/destinations"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Explore Hills
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
