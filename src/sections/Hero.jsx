import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import mountainVideo from "../assets/images/video/mountain-view.mp4";

export default function Hero() {
  return (
    <section id="home" className="home-hero relative min-h-[88vh] overflow-hidden lg:min-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <video
          src={mountainVideo}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,27,33,0.82)_0%,rgba(19,35,40,0.58)_48%,rgba(18,32,36,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,27,33,0.42)_0%,transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pb-14 pt-28 sm:px-8 lg:min-h-screen lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="hero-content max-w-4xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-brand-yellow sm:text-sm">
            Find your mountain moment
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Every mountain has a journey. We help you find it
          </h1>
          <p className="hero-description mt-5 max-w-2xl text-base leading-7 text-white drop-shadow-md sm:text-lg sm:leading-8">
            Explore the hills with local insights, thoughtful travel guides and
            stories that help every journey feel more meaningful.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/destinations"
              className="inline-flex min-h-12 min-w-[220px] items-center justify-center rounded-full bg-brand-yellow px-7 py-3 text-sm font-bold text-brand-green shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore Destinations
            </Link>
            <Link
              to="/guides"
              className="inline-flex min-h-12 min-w-[220px] items-center justify-center rounded-full border border-white/75 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Discover Guides
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
