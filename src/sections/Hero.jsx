import { motion } from "framer-motion";
import Button from "../components/Button";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <video
          src="/src/assets/images/video/mountain-view.mp4"
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28),rgba(15,23,42,0.55),rgba(2,6,23,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_rgba(14,116,144,0.14),_transparent_35%)]" />
      </div>

      <div className="relative flex min-h-screen max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Every mountain has a journey. We help you find it
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8">
            Explore hills with trusted information, local stories and better
            travel experiences.Explore the hills with local insights, travel
            guides and stories that help you experience every journey better.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              variant="primary"
              className=" bg-emerald-700 font-semibold text-white min-w-[220px]"
            >
              Explore Hills
            </Button>
            <Button variant="secondary" className="min-w-[220px]">
              Discover Guides
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
