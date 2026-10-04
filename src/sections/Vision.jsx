import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Vision() {
  return (
    <section id="vision" className="border-t border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-slate-900/95 p-10 sm:p-14"
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Our vision
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Building a better way to experience hills.
            </h2>
            <p className="text-slate-300 leading-8 sm:text-lg">
              HillMittra is creating travel that respects mountain cultures,
              prioritizes meaningful connections and brings cinematic mountain
              experiences into a calm, curated journey.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Sustainable design
                </p>
                <p className="mt-4 text-slate-200 leading-7">
                  Thoughtful travel plans that support local communities and
                  minimize impact on delicate hill ecosystems.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Human-led hospitality
                </p>
                <p className="mt-4 text-slate-200 leading-7">
                  Every stay, meal and guide is chosen for its authenticity,
                  warmth and connection to the land.
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
              >
                About HillMittra
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
