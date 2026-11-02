import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mountain, Search, Sun } from "lucide-react";
import { destinations } from "../data/destinations";

const featuredSlugs = ["nainital", "kedarnath", "almora", "rishikesh"];

const typewriterPhrases = [
  "Search destinations - try Nainital, Kedarnath, Valley of Flowers",
  "Where should the mountains take you?",
  "Search by region - Kumaon, Garhwal, high passes",
  "Ask about the best season for your hill trip",
];

const popularSearches = ["nainital", "kedarnath", "almora", "rishikesh", "valley-of-flowers"];

const MONTH_ABBREVIATIONS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

function formatSeason(value) {
  if (!value) return "";
  return String(value)
    .split(/\s*,\s*/)
    .map((part) =>
      part
        .replace(/\s+to\s+/g, " - ")
        .replace(/[A-Z][a-z]+/g, (month) => MONTH_ABBREVIATIONS[month] ?? month),
    )
    .join(", ");
}

function getQuickFact(destination, labelPrefix) {
  const fact = (destination.quickFacts ?? []).find((item) =>
    String(item.label).toLowerCase().startsWith(labelPrefix),
  );
  return fact?.value ?? null;
}

function normalizeText(value) {
  return String(value ?? "").toLowerCase().trim();
}

function findDestination(query) {
  const text = normalizeText(query);
  if (!text) return null;
  return (
    destinations.find((item) => normalizeText(item.slug) === text) ??
    destinations.find((item) => normalizeText(item.name) === text) ??
    destinations.find(
      (item) =>
        normalizeText(item.name).includes(text) ||
        normalizeText(item.slug).includes(text),
    ) ??
    null
  );
}

export default function Places() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typed, setTyped] = useState("");
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const placeholderActive = query.trim() === "";

  useEffect(() => {
    if (!placeholderActive || reducedMotion) {
      return undefined;
    }

    let cancelled = false;
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timeoutId;

    const step = () => {
      if (cancelled) return;
      const text = typewriterPhrases[phrase];
      if (!deleting) {
        char += 1;
        setTyped(text.slice(0, char));
        if (char >= text.length) {
          deleting = true;
          timeoutId = setTimeout(step, 1700);
          return;
        }
      } else {
        char -= 1;
        setTyped(text.slice(0, Math.max(0, char)));
        if (char <= 0) {
          deleting = false;
          phrase = (phrase + 1) % typewriterPhrases.length;
        }
      }
      timeoutId = setTimeout(step, deleting ? 24 : 52);
    };

    timeoutId = setTimeout(step, 500);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [placeholderActive, reducedMotion]);

  const placeholder = placeholderActive ? typed : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const match = findDestination(query);
    navigate(match ? `/destination/${match.slug}` : "/destinations");
  };

  const featuredDestinations = featuredSlugs
    .map((slug) => destinations.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <section
      id="places"
      className="relative overflow-hidden bg-emerald-950 py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(252,197,53,0.08),_transparent_42%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 260 110"
        className="pointer-events-none absolute left-0 top-1/2 hidden h-24 w-60 -translate-y-1/2 opacity-[0.12] lg:block"
      >
        <path
          d="M2 104 L58 44 L104 82 L162 22 L214 78 L258 52"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M40 104 L92 64 L146 96 L206 60"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 260 110"
        className="pointer-events-none absolute right-0 top-1/2 hidden h-24 w-60 -translate-y-1/2 opacity-[0.12] lg:block"
      >
        <path
          d="M2 52 L48 20 L110 92 L170 34 L224 84 L258 62"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M28 100 L86 62 L142 92 L204 58"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-brand-yellow">
              Explore destinations
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1.08] text-white sm:text-[2.6rem] lg:text-[3rem]">
              Find your next mountain escape
            </h2>
            <p className="text-[15px] leading-7 text-emerald-100/70">
              Search destinations, guides, stories and more...
            </p>
          </div>
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:text-brand-yellow"
          >
            View All Destinations
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          role="search"
          className="mx-auto mt-8 flex max-w-3xl items-center gap-2 rounded-full border border-white/20 bg-white p-1.5 pl-5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.65)] focus-within:border-brand-yellow"
        >
          <Search size={18} className="shrink-0 text-brand-green" aria-hidden="true" />
          <label htmlFor="destination-search" className="sr-only">
            Search destinations
          </label>
          <input
            id="destination-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-500 sm:text-base"
          />
          <button
            type="submit"
            aria-label="Search destinations"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-yellow text-brand-green transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <ArrowRight size={18} />
          </button>
        </motion.form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs uppercase tracking-[0.22em] text-emerald-100/60">
            Popular searches
          </span>
          {popularSearches.map((slug) => {
            const item = destinations.find((d) => d.slug === slug);
            if (!item) return null;
            return (
              <Link
                key={slug}
                to={`/destination/${item.slug}`}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-50 backdrop-blur transition hover:border-brand-yellow/60 hover:bg-white/15 hover:text-brand-yellow"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {featuredDestinations.map((destination, index) => {
            const altitude = getQuickFact(destination, "altitude");
            const bestSeason = formatSeason(
              getQuickFact(destination, "best season") ?? destination.season,
            );
            return (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="flex w-[80vw] max-w-[20rem] shrink-0 snap-start lg:w-auto lg:max-w-none"
              >
                <Link
                  to={`/destination/${destination.slug}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1d14] shadow-[0_32px_80px_-48px_rgba(0,0,0,0.85)] transition hover:border-brand-yellow/50"
                >
                  <div className="relative h-48 shrink-0 overflow-hidden sm:h-52">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d14] via-transparent to-transparent" />
                    <h3 className="absolute bottom-3 left-5 font-display text-[26px] font-semibold text-white">
                      {destination.name}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 p-4 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {altitude ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#132c20] px-2.5 py-1.5 text-xs font-medium text-white">
                          <Mountain size={12} className="shrink-0 text-brand-yellow" />
                          {altitude}
                        </span>
                      ) : null}
                      {destination.region ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#132c20] px-2.5 py-1.5 text-xs font-medium text-white">
                          <MapPin size={12} className="shrink-0 text-brand-blue" />
                          {destination.region}
                        </span>
                      ) : null}
                      <span className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-yellow text-brand-green transition hover:bg-amber-300">
                        <ArrowRight size={15} />
                      </span>
                    </div>
                    {bestSeason ? (
                      <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-[#0f241a] px-3 py-1.5 text-xs font-medium text-emerald-100">
                        <Sun size={12} className="shrink-0 text-brand-yellow" />
                        Best in: {bestSeason}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
