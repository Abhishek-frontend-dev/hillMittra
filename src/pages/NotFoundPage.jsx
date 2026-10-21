import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

const quickLinks = [
  { label: "Explore destinations", to: "/destinations", primary: true },
  { label: "Read guides", to: "/guides" },
  { label: "Read stories", to: "/stories" },
];

export default function NotFoundPage() {
  return (
    <div className="site-page min-h-screen">
      <SEOHead
        title="Page not found | HillMittra"
        description="The page you are looking for does not exist. Explore HillMittra destinations, guides and stories for calm, premium mountain journeys."
        noindex
      />
      <NavBar />

      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.95)] sm:p-10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
              404 - Lost on the trail
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              This mountain path doesn't exist.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              The page you're looking for may have moved or never existed while
              HillMittra is growing. Here are a few calmer ways back to the
              good trails.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    link.primary
                      ? "inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                      : "inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
