import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "../data/guides";

export default function Guides() {
  const [featured, ...rest] = guides;

  return (
    <section id="guides" className="relative overflow-hidden bg-mist py-20 sm:py-24">
      <svg
        aria-hidden="true"
        viewBox="0 0 240 90"
        className="pointer-events-none absolute left-4 top-6 hidden h-16 w-56 opacity-[0.08] xl:block"
      >
        <path
          d="M2 84 L48 30 L92 64 L142 18 L190 58 L238 32"
          stroke="#2c583d"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <div className="lg:sticky lg:top-28">
              <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-emerald-800">
                Written travel guides
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.12] text-emerald-950 sm:text-[2.4rem] lg:text-[2.7rem]">
                Local notes. Deeper journeys.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-8 text-slate-600">
                {guides.length} written guides and field notes covering budget
                plans, packing lists, monsoon safety and food-first journeys.
                No tour-guide bookings - just honest, practical writing to plan
                your hills trip with.
              </p>
              <Link
                to="/guides"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-green shadow-md shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Explore All Guides
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {featured ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <Link
                  to={`/guide/${featured.slug}`}
                  className="group grid overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_34px_90px_-58px_rgba(16,38,26,0.6)] transition hover:shadow-[0_40px_100px_-55px_rgba(16,38,26,0.65)] sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative h-56 overflow-hidden sm:h-full sm:min-h-[15rem]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
                        <BookOpen size={12} />
                        {featured.category}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {featured.readingTime}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-emerald-950">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {featured.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      Read the guide
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {rest.slice(0, 2).map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                >
                  <Link
                    to={`/guide/${guide.slug}`}
                    className="group flex h-full items-center gap-4 rounded-[1.6rem] border border-white bg-white p-4 shadow-[0_20px_55px_-45px_rgba(16,38,26,0.4)] transition hover:shadow-[0_28px_70px_-48px_rgba(16,38,26,0.55)]"
                  >
                    <img
                      src={guide.image}
                      alt={guide.title}
                      loading="lazy"
                      className="h-20 w-20 shrink-0 rounded-[1.1rem] object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        {guide.category} - {guide.readingTime}
                      </p>
                      <h3 className="mt-1.5 text-base font-semibold leading-6 text-emerald-950">
                        {guide.title}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="ml-auto shrink-0 text-emerald-700 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
