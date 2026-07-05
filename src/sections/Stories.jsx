import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { stories } from "../data/stories";

export default function Stories() {
  return (
    <section id="stories" className="py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/80 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
          >
            <img
              src={stories[0]?.image}
              alt={stories[0]?.title}
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-300">
                Story highlight
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                {stories[0]?.title}
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Emotional storytelling
            </p>
            <h3 className="text-4xl font-semibold tracking-tight text-white">
              Travel that feels like a chapter of your life.
            </h3>
            <p className="text-slate-300 leading-8">
              ParvatMittra journeys are designed to create space for the moments
              you remember: walking a ridge at first light, hearing the river
              below, and arriving in a village that feels like home.
            </p>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
              <p className="text-slate-200 leading-7">{stories[0]?.excerpt}</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Featured reflection
              </p>
              <h4 className="mt-4 text-2xl font-semibold text-white">
                {stories[1]?.title}
              </h4>
              <p className="mt-4 text-slate-300 leading-7">
                {stories[1]?.excerpt}
              </p>
            </div>
            <div>
              <Link
                to="/stories"
                className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
              >
                Read Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
