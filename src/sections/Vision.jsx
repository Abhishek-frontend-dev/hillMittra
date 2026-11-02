import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const visionPoints = [
  {
    title: "Sustainable design",
    copy: "Thoughtful travel plans that support local communities and minimize impact on delicate hill ecosystems.",
  },
  {
    title: "Human-led hospitality",
    copy: "Every stay, meal and trusted local connect is chosen for its authenticity, warmth and roots in the land.",
  },
];

export default function Vision() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-emerald-950 py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,_rgba(252,197,53,0.08),_transparent_40%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-brand-yellow">
              Our vision
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl [text-wrap:balance]">
              Building a better way to experience hills.
            </h2>
            <p className="mt-6 max-w-xl text-slate-300 leading-8">
              HillMittra is building travel that respects mountain cultures,
              prioritizes meaningful connections and brings the hills closer -
              first as journeys, then as stories, and soon through the people
              and products of Uttarakhand itself.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-green shadow-md shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              About HillMittra
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-0 border-t border-white/10">
              {visionPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex gap-4 border-b border-white/10 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-yellow"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {point.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Destinations - Guides - Stories - Weather - Marketplace
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
