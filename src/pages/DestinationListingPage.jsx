import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { destinations } from "../data/destinations";
import { getSeoMetadata } from "../utils/seo";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 4;

export default function DestinationListingPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [category, setCategory] = useState("All");
  const [season, setSeason] = useState("All");
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [displayCount, setDisplayCount] = useState(MOBILE_PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setDisplayCount(mobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPage(1);
    setDisplayCount(isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE);
    setFiltersOpen(false);
  }, [search, region, category, season, isMobile]);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        !query ||
        [
          destination.name,
          destination.title,
          destination.subtitle,
          destination.region,
          destination.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesRegion = region === "All" || destination.region === region;
      const matchesCategory =
        category === "All" || destination.category === category;
      const matchesSeason = season === "All" || destination.season === season;

      return matchesSearch && matchesRegion && matchesCategory && matchesSeason;
    });
  }, [search, region, category, season]);

  const suggestionList = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return destinations
      .filter((destination) => destination.name.toLowerCase().includes(query))
      .slice(0, 4);
  }, [search]);

  const totalPages = Math.ceil(filteredDestinations.length / DESKTOP_PAGE_SIZE);
  const visibleDestinations = useMemo(() => {
    if (isMobile) {
      return filteredDestinations.slice(0, displayCount);
    }

    const start = (page - 1) * DESKTOP_PAGE_SIZE;
    return filteredDestinations.slice(start, start + DESKTOP_PAGE_SIZE);
  }, [displayCount, filteredDestinations, isMobile, page]);

  const hasMore = isMobile && displayCount < filteredDestinations.length;

  const resetFilters = () => {
    setSearch("");
    setRegion("All");
    setCategory("All");
    setSeason("All");
  };

  const seo = getSeoMetadata(
    {
      seoTitle: "Discover Destinations | HillMittra",
      seoDescription:
        "Browse a calm collection of Himalayan destinations shaped by atmosphere, pacing and premium editorial guidance.",
    },
    "destination",
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} />
      <NavBar />

      <main className="pt-24">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                Destination collection
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Explore destinations
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Discover mountain landscapes shaped by slow travel, cinematic
                views and thoughtful stays.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full lg:max-w-xl">
                  <label
                    htmlFor="destination-search"
                    className="text-sm uppercase tracking-[0.28em] text-slate-400"
                  >
                    Search destinations
                  </label>
                  <div className="mt-3">
                    <input
                      id="destination-search"
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Try Rishikesh, Auli or Nainital"
                      className="w-full rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
                    />
                  </div>
                  {suggestionList.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestionList.map((destination) => (
                        <Link
                          key={destination.id}
                          to={`/destination/${destination.slug}`}
                          className="rounded-full border border-emerald-300/20 bg-emerald-950/20 px-3 py-1.5 text-sm text-emerald-100 transition hover:bg-emerald-950/35"
                        >
                          {destination.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen((current) => !current)}
                    className="rounded-full border border-emerald-300/30 bg-emerald-950/20 px-4 py-2 text-sm font-semibold text-emerald-100"
                  >
                    {filtersOpen ? "Hide filters" : "Filters"}
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div
                className={`${filtersOpen ? "mt-5 block" : "mt-5 hidden"} gap-4 lg:mt-6 lg:flex lg:items-end lg:gap-4`}
              >
                <div className="flex-1">
                  <label className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Region
                  </label>
                  <select
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    className="mt-3 w-full rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="All">All regions</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Garhwal">Garhwal</option>
                    <option value="Kumaon">Kumaon</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="mt-3 w-full rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="All">All categories</option>
                    <option value="River Retreat">River Retreat</option>
                    <option value="Snow Escape">Snow Escape</option>
                    <option value="Lake Escape">Lake Escape</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Season
                  </label>
                  <select
                    value={season}
                    onChange={(event) => setSeason(event.target.value)}
                    className="mt-3 w-full rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="All">Any season</option>
                    <option value="Year-round">Year-round</option>
                    <option value="Winter">Winter</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>

                <div className="hidden lg:block">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/10"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                Discover
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Curated mountain escapes
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Showing {filteredDestinations.length} destination
              {filteredDestinations.length === 1 ? "" : "s"}
            </p>
          </div>

          {filteredDestinations.length > 0 ? (
            <>
              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleDestinations.map((destination, index) => (
                  <motion.article
                    key={destination.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
                  >
                    <Link
                      to={`/destination/${destination.slug}`}
                      className="block"
                    >
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        <div className="absolute left-5 top-5 rounded-full border border-emerald-200/20 bg-emerald-950/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-emerald-100">
                          {destination.category}
                        </div>
                      </div>
                      <div className="p-7">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                              {destination.region}
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">
                              {destination.title || destination.name}
                            </h3>
                          </div>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                            {destination.season}
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {destination.subtitle || destination.tagline}
                        </p>
                        <div className="mt-6 inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition group-hover:bg-emerald-950/35">
                          View destination
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {!isMobile ? (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`h-11 w-11 rounded-full border text-sm font-semibold transition ${
                        pageNumber === page
                          ? "border-emerald-400 bg-emerald-500 text-slate-950"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
              ) : hasMore ? (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setDisplayCount((current) => current + MOBILE_PAGE_SIZE)
                    }
                    className="rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
                  >
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-10 text-center">
              <h3 className="text-2xl font-semibold text-white">
                No destinations match these filters yet.
              </h3>
              <p className="mt-4 text-slate-300">
                Try a broader search or reset the filters to see the full
                collection again.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
