import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { guides } from "../data/guides";
import { getSeoMetadata } from "../utils/seo";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 4;

const categories = [
  "All",
  "Budget",
  "Adventure",
  "Packing",
  "Safety",
  "Solo",
  "Family",
  "Food",
  "Planning",
];

export default function GuideListingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [displayCount, setDisplayCount] = useState(MOBILE_PAGE_SIZE);

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
  }, [search, category, isMobile]);

  const filteredGuides = useMemo(() => {
    const query = search.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesSearch =
        !query ||
        [guide.title, guide.subtitle, guide.category, guide.description]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory = category === "All" || guide.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredGuides.length / DESKTOP_PAGE_SIZE);
  const visibleGuides = useMemo(() => {
    if (isMobile) {
      return filteredGuides.slice(0, displayCount);
    }

    const start = (page - 1) * DESKTOP_PAGE_SIZE;
    return filteredGuides.slice(start, start + DESKTOP_PAGE_SIZE);
  }, [displayCount, filteredGuides, isMobile, page]);

  const hasMore = isMobile && displayCount < filteredGuides.length;

  const seo = getSeoMetadata(
    {
      seoTitle: "Travel Guides | ParvatMittra",
      seoDescription:
        "Find practical guides for mountain travel, packing, budgets, solo trips and slow planning.",
    },
    "guide",
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
                Travel guides
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Discover practical mountain guides
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Find thoughtful guidance for budgeting, packing, solo travel and
                more — without the noise of a generic travel blog.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full lg:max-w-xl">
                  <label
                    htmlFor="guide-search"
                    className="text-sm uppercase tracking-[0.28em] text-slate-400"
                  >
                    Search guides
                  </label>
                  <input
                    id="guide-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by topic or keyword"
                    className="mt-3 w-full rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        category === item
                          ? "bg-emerald-500 text-slate-950"
                          : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                Guides
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Practical reading for calm travel planning
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Showing {filteredGuides.length} guide
              {filteredGuides.length === 1 ? "" : "s"}
            </p>
          </div>

          {filteredGuides.length > 0 ? (
            <>
              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleGuides.map((guide, index) => (
                  <motion.article
                    key={guide.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
                  >
                    <Link to={`/guide/${guide.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={guide.coverImage}
                          alt={guide.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        <div className="absolute left-5 top-5 rounded-full border border-emerald-200/20 bg-emerald-950/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-emerald-100">
                          {guide.category}
                        </div>
                      </div>
                      <div className="p-7">
                        <h3 className="text-2xl font-semibold text-white">
                          {guide.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {guide.description}
                        </p>
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                          <span>{guide.readingTime}</span>
                          <span className="font-semibold text-emerald-300">
                            Read guide
                          </span>
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
                No guides match that search yet.
              </h3>
              <p className="mt-4 text-slate-300">
                Try a broader keyword or switch the category filter.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
