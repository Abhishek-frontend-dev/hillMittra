import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const aboutPoints = [
  {
    title: "Sustainable design",
    copy: "Thoughtful travel plans that support local communities and minimise impact on delicate hill ecosystems.",
  },
  {
    title: "Human-led hospitality",
    copy: "Every stay, meal and trusted local connect is chosen for its authenticity, warmth and roots in the land.",
  },
  {
    title: "Stories before sales",
    copy: "We lead with truth from the mountains - folk tales, field notes and live weather - not with pushy packages.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-mist py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,_rgba(67,146,179,0.10),_transparent_36%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 260 90"
        className="pointer-events-none absolute bottom-6 left-6 hidden h-16 w-60 opacity-[0.08] xl:block"
      >
        <path
          d="M2 84 L58 30 L104 66 L160 18 L212 60 L258 34"
          stroke="#2c583d"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-emerald-800">
              About us
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.12] text-emerald-950 sm:text-[2.5rem] [text-wrap:balance]">
              Travel that respects the mountains.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              HillMittra is building travel that honours mountain cultures,
              prioritises meaningful connections and brings the hills closer -
              first as journeys, then as stories, and soon through the people
              and products of Uttarakhand itself.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-green shadow-md shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
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
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-white p-2 shadow-[0_34px_90px_-58px_rgba(16,38,26,0.55)]">
              {aboutPoints.map((point, index) => (
                <div
                  key={point.title}
                  className={`flex gap-4 px-6 py-6 ${
                    index > 0 ? "border-t border-emerald-900/10" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-yellow"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-950">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {point.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.24em] text-slate-500">
              Destinations - Guides - Stories - Weather - Marketplace
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
