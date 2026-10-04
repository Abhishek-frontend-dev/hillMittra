import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { getSeoMetadata } from "../utils/seo";

const values = [
  {
    title: "Slow discovery",
    description:
      "Every route is paced to feel generous rather than rushed, letting the landscape and culture breathe.",
  },
  {
    title: "Editorial guidance",
    description:
      "The content is shaped like a premium travel journal, balancing clarity, calm and rich visual storytelling.",
  },
  {
    title: "Local perspective",
    description:
      "Each journey is anchored in the living culture of the hills, with an emphasis on meaningful moments over spectacle.",
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Email", href: "mailto:hello@hillmittra.com" },
];

export default function About() {
  const seo = getSeoMetadata(
    {
      seoTitle: "About HillMittra | Mountain Travel Reimagined",
      seoDescription:
        "Learn about HillMittra’s premium editorial approach to mountain travel, stories and thoughtful planning.",
    },
    "about",
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} />
      <NavBar />

      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.95)] sm:p-10"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                About HillMittra
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                A quieter kind of mountain travel, designed with intention.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                HillMittra is a carefully crafted travel companion for travelers
                who want the Himalaya to feel intimate, cinematic and deeply
                human.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/destinations"
                  className="inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Explore destinations
                </Link>
                <Link
                  to="/guides"
                  className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Read guides
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="rounded-[2rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-950/70 via-slate-900/80 to-slate-950 p-8 sm:p-10"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                The story behind the brand
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                The idea emerged from a simple belief: mountain journeys are
                most powerful when they leave space for reflection. We shape
                every page around feeling, pacing and the kind of stillness that
                lingers after the trip ends.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {values.map((value) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8"
              >
                <h2 className="text-2xl font-semibold text-white">
                  {value.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-400">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Join the journey
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Travel notes, quiet inspiration and seasonal updates.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-400">
                Whether you are planning your first hill escape or returning for
                a slower season, the platform is designed to feel like a calm
                companion from first idea to final arrival.
              </p>
              <Link
                to="/stories"
                className="mt-8 inline-flex rounded-full border border-emerald-300/20 bg-emerald-950/30 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/50"
              >
                Read stories
              </Link>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Stay connected
              </p>
              <div className="mt-6 space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    <span>{social.label}</span>
                    <span className="text-slate-400">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
