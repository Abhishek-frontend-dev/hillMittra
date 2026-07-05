import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import {
  getFeaturedDestination,
  getTravelRecommendation,
  getWeatherForDestination,
} from "../services/weatherService";

export default function Weather() {
  const [featuredDestination, setFeaturedDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const destination = getFeaturedDestination();
    setFeaturedDestination(destination);
    setLoading(true);
    setError("");

    getWeatherForDestination(destination)
      .then((result) => {
        setWeather(result);
      })
      .catch((loadError) => {
        setError(loadError.message || "Unable to load weather right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const recommendation = weather
    ? getTravelRecommendation(weather, featuredDestination)
    : null;

  return (
    <section id="weather" className="py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <SectionHeading
          overline="Weather preview"
          title="A preview of mountain conditions for your next trip"
          description="Travel planning with calm confidence. This preview introduces the weather tool without turning the page into a dashboard."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
              Featured destination
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              {featuredDestination?.name ?? "Featured destination"},{" "}
              {featuredDestination?.region ?? ""}
            </h3>
            <p className="mt-6 text-slate-300 leading-8">
              {featuredDestination?.description ??
                "Live weather is loading for the featured destination."}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {loading ? (
                <div className="rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-white/10 sm:col-span-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Loading
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Fetching the latest mountain conditions.
                  </p>
                </div>
              ) : error ? (
                <div className="rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-white/10 sm:col-span-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    Weather update
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {error}
                  </p>
                </div>
              ) : (
                weather?.forecast?.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-white/10"
                  >
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                      {item.day}
                    </p>
                    <p className="mt-4 text-3xl font-semibold text-white">
                      {item.temp}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {item.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/70 to-slate-900/85 p-10"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
              Travel weather concept
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">
              Designed for confident hill travel.
            </h3>
            <p className="mt-6 text-slate-300 leading-8">
              This module introduces the weather tool as a calm, premium layer
              of planning information rather than a dense forecast screen.
            </p>
            <div className="mt-10 space-y-4 rounded-[1.8rem] bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Trip highlight
              </p>
              <p className="text-slate-200 leading-7">
                {recommendation?.reason ??
                  "Early mornings favor clear mountain light and crisp air. The evenings are best spent near the fire with a view of the ridge line."}
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/weather"
                className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/35"
              >
                Check Weather Tool
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
