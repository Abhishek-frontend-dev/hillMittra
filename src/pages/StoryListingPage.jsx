import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { stories } from "../data/stories";
import { getSeoMetadata } from "../utils/seo";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 4;

const categories = [
  "All",
  "Slow Travel",
  "Winter Escape",
  "Mountain Memory",
  "Reflection",
];

export default function StoryListingPage() {
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

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return stories.filter((story) => {
      const matchesSearch =
        !query ||
        [story.title, story.subtitle, story.category, story.excerpt]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory = category === "All" || story.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredStories.length / DESKTOP_PAGE_SIZE);
  const visibleStories = useMemo(() => {
    if (isMobile) {
      return filteredStories.slice(0, displayCount);
    }

    const start = (page - 1) * DESKTOP_PAGE_SIZE;
    return filteredStories.slice(start, start + DESKTOP_PAGE_SIZE);
  }, [displayCount, filteredStories, isMobile, page]);

  const hasMore = isMobile && displayCount < filteredStories.length;

  const seo = getSeoMetadata(
    {
      seoTitle: "Mountain Stories | HillMittra",
      seoDescription:
        "Read reflective stories about slow travel, mountain mornings and serene journeys across the hills.",
    },
    "story",
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
                Stories
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Mountain stories that stay with you
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                A quieter collection of reflections, first-light memories and
                low-lit journeys shaped by the hills.
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
                    htmlFor="story-search"
                    className="text-sm uppercase tracking-[0.28em] text-slate-400"
                  >
                    Search stories
                  </label>
                  <input
                    id="story-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by mood or place"
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
                Collection
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Immersive reflections from the trail
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Showing {filteredStories.length} story
              {filteredStories.length === 1 ? "" : "s"}
            </p>
          </div>

          {filteredStories.length > 0 ? (
            <>
              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleStories.map((story, index) => (
                  <motion.article
                    key={story.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
                  >
                    <Link to={`/story/${story.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                        <div className="absolute left-5 top-5 rounded-full border border-emerald-200/20 bg-emerald-950/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-emerald-100">
                          {story.category}
                        </div>
                      </div>
                      <div className="p-7">
                        <h3 className="text-2xl font-semibold text-white">
                          {story.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                          {story.excerpt}
                        </p>
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                          <span>{story.readingTime}</span>
                          <span className="font-semibold text-emerald-300">
                            Read story
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
                No stories match that search yet.
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
