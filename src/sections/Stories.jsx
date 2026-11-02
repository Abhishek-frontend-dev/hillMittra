import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { stories } from "../data/stories";

export default function Stories() {
  const featured = stories[0];
  const secondary = stories[1];
  const featuredQuote = featured?.quotes?.[0];

  return (
    <section
      id="stories"
      className="relative overflow-hidden bg-mist py-20 sm:py-24"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 300 100"
        className="pointer-events-none absolute bottom-4 right-10 hidden h-20 w-72 opacity-[0.08] lg:block"
      >
        <path
          d="M4 92 L70 30 L122 74 L186 20 L244 70 L296 40"
          stroke="#2c583d"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.15fr_0.85fr]">
          {featured ? (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75 }}
            >
              <Link
                to={`/story/${featured.slug}`}
                className="group relative block overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-62px_rgba(16,38,26,0.8)]"
              >
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[25rem]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,38,26,0.55),transparent_55%)]" />
                <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                  {featured.readingTime}
                </span>
              </Link>
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08 }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-emerald-800">
              Stories
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.14] text-emerald-950 sm:text-[2.4rem]">
              Real people. True mountain tales.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              From quiet village mornings to unexpected encounters, these
              stories bring the hills to life.
            </p>
            <Link
              to="/stories"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-green shadow-md shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              Explore Stories
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {featuredQuote ? (
            <motion.figure
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.14 }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="font-display text-7xl leading-[0.4] text-brand-yellow"
              >
                &ldquo;
              </span>
              <blockquote className="mt-7 font-display text-xl italic leading-8 text-emerald-950 sm:text-[1.35rem]">
                {featuredQuote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4">
                {secondary?.coverImage ? (
                  <img
                    src={secondary.coverImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md"
                  />
                ) : null}
                <span className="text-sm font-medium text-slate-500">
                  &mdash; from {featured.title}
                </span>
              </figcaption>
            </motion.figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
