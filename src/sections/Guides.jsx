import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { guides } from "../data/guides";

export default function Guides() {
  return (
    <section id="guides" className="py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          overline="Travel guides"
          title="Field notes for a more thoughtful mountain journey"
          description="Preview the stories, route ideas and regional insights that make ParvatMittra travel more intentional, cinematic and grounded."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {guides.slice(0, 3).map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.8)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
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
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/guides"
            className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
          >
            Explore All Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
