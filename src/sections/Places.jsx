import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { destinations } from "../data/destinations";

export default function Places() {
  return (
    <section id="places" className="py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          overline="Destinations"
          title="Three mountain journeys with cinematic quietness"
          description="Every destination carries its own rhythm. HillMittra reveals hills that balance adventure, calm and memorable stay experiences."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {destinations.slice(0, 3).map((destination, index) => (
            <motion.article
              key={destination.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_32px_80px_-48px_rgba(15,23,42,0.8)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-white">
                    {destination.name}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {destination.tagline}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {destination.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/destinations"
            className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
