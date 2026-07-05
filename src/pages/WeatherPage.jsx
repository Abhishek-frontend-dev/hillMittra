import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { destinations } from "../data/destinations";
import { getSeoMetadata } from "../utils/seo";
import {
  getActivitySuggestions,
  getFeaturedDestination,
  getPackingSuggestions,
  getRelatedDestination,
  getRelatedGuide,
  getSafetyTips,
  getTravelRecommendation,
  getWeatherForDestination,
} from "../services/weatherService";

export default function WeatherPage() {
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleWeatherRequest = async (
    destinationOrQuery,
    shouldMarkSearched = true,
  ) => {
    setLoading(true);
    setError("");
    if (shouldMarkSearched) {
      setHasSearched(true);
    }

    try {
      const result = await getWeatherForDestination(destinationOrQuery);
      setWeather(result);
      setSelectedDestination(result.destination ?? null);
      setQuery(
        result.destination?.name ??
          (typeof destinationOrQuery === "string"
            ? destinationOrQuery
            : (destinationOrQuery?.name ?? "")),
      );
    } catch (loadError) {
      setWeather(null);
      setError(loadError.message || "Unable to load weather right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const featured = getFeaturedDestination();
    setSelectedDestination(featured);
    setQuery(featured?.name ?? "");
    setHasSearched(false);
    handleWeatherRequest(featured, false);
  }, []);

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return destinations;
    }

    return destinations.filter((destination) => {
      const haystack =
        `${destination.name} ${destination.region} ${destination.tags?.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const handleDestinationSelect = (destination) => {
    setQuery(destination.name);
    handleWeatherRequest(destination, true);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleWeatherRequest(query, true);
    }
  };

  const recommendation = weather
    ? getTravelRecommendation(weather, selectedDestination)
    : null;
  const packing = weather
    ? getPackingSuggestions(weather, selectedDestination)
    : [];
  const activities =
    weather && selectedDestination
      ? getActivitySuggestions(weather, selectedDestination)
      : [];
  const safetyTips = weather ? getSafetyTips(weather, selectedDestination) : [];
  const relatedGuide = selectedDestination
    ? getRelatedGuide(selectedDestination)
    : null;
  const relatedDestination = selectedDestination
    ? getRelatedDestination(selectedDestination)
    : null;

  const seo = getSeoMetadata(
    {
      seoTitle: "Weather Tool | ParvatMittra",
      seoDescription:
        "Use a calm, live weather planning tool for mountain destinations with smart recommendations and travel comfort insight.",
    },
    "weather",
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} />
      <NavBar />

      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.9)] sm:p-10"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                Weather tool
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Plan the hills with calm, practical weather insight.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Choose a destination, review the current conditions and let the
                tool suggest the kind of day that feels right for your route.
              </p>

              <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <label
                  className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400"
                  htmlFor="destination-search"
                >
                  Search destination
                </label>
                <input
                  id="destination-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder="Try Rishikesh, Auli or Nainital"
                  className="mt-4 w-full rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {filteredDestinations.slice(0, 4).map((destination) => (
                    <button
                      key={destination.id}
                      type="button"
                      onClick={() => handleDestinationSelect(destination)}
                      className={`rounded-full px-4 py-2 text-sm transition ${selectedDestination?.id === destination.id ? "bg-emerald-500 text-white" : "bg-white/10 text-slate-200 hover:bg-white/20"}`}
                    >
                      {destination.name}
                    </button>
                  ))}
                </div>

                {!hasSearched && !loading && !error ? (
                  <p className="mt-4 text-sm text-slate-400">
                    Search or select a destination to load live weather details.
                  </p>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-[2rem] border border-emerald-300/20 bg-gradient-to-br from-emerald-950/70 via-slate-900/80 to-slate-950 p-8 shadow-[0_30px_120px_-70px_rgba(16,185,129,0.55)] sm:p-10"
            >
              {loading ? (
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                    Loading weather
                  </p>
                  <p className="text-xl text-slate-200">
                    Preparing a calm forecast for{" "}
                    {selectedDestination?.name ?? "your next trip"}.
                  </p>
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                    Weather update
                  </p>
                  <p className="text-xl text-slate-200">{error}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                        Current read
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">
                        {selectedDestination?.name ?? "Selected destination"}
                      </h2>
                      <p className="mt-2 text-slate-300">
                        {selectedDestination?.subtitle ??
                          selectedDestination?.description}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                      {recommendation?.label ?? "Calm day"}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[1.5rem] bg-white/10 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        Temp
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-white">
                        {Math.round(weather?.temperature ?? 14)}°C
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/10 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        Rain
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-white">
                        {weather?.precipitation ?? 10}%
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/10 p-5">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                        Wind
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-white">
                        {weather?.windSpeed ?? 6} km/h
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-slate-950/60 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                      Condition
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {weather?.condition ?? "Variable mountain weather"}
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-300">
                      {weather?.summary ??
                        "The air feels balanced and the landscape remains inviting for a gentle plan."}
                    </p>
                    {weather?.forecast?.length ? (
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {weather.forecast.map((item) => (
                          <div
                            key={item.day}
                            className="rounded-[1.2rem] border border-white/10 bg-white/5 p-3"
                          >
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                              {item.day}
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {item.temp}
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                              {item.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </>
              )}

              {error && !loading ? (
                <p className="mt-6 text-sm text-amber-200">{error}</p>
              ) : null}
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Trip recommendation
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {recommendation?.reason ??
                  "A calm day is best shaped by flexible plans."}
              </h3>
              <div className="mt-8 rounded-[1.6rem] border border-emerald-400/10 bg-emerald-500/10 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                  Suggested fit
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {recommendation?.score ?? "Good"}
                </p>
                <p className="mt-3 text-base leading-7 text-slate-300">
                  {recommendation?.reason ??
                    "The conditions feel balanced for slow, scenic movement."}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Pack for the day
              </p>
              <div className="mt-6 space-y-3">
                {packing.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div>
                      <p className="text-base font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Suggested activities
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {activities.map((activity) => (
                  <div
                    key={activity.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-lg font-semibold text-white">
                      {activity.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Safety notes
              </p>
              <ul className="mt-6 space-y-3">
                {safetyTips.map((tip) => (
                  <li
                    key={tip}
                    className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Related guide
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {relatedGuide?.title}
              </h3>
              {relatedGuide ? (
                <>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {relatedGuide.overview}
                  </p>
                  <Link
                    to={`/guide/${relatedGuide.slug}`}
                    className="mt-6 inline-flex rounded-full border border-emerald-300/30 bg-emerald-950/30 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-950/50"
                  >
                    Read the guide
                  </Link>
                </>
              ) : (
                <p className="mt-4 text-base leading-7 text-slate-300">
                  No matching guide is available for this destination in the
                  current database yet.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Nearby inspiration
              </p>
              {relatedDestination ? (
                <>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {relatedDestination.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {relatedDestination.description}
                  </p>
                  <Link
                    to={`/destination/${relatedDestination.slug}`}
                    className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    Explore destination
                  </Link>
                </>
              ) : (
                <p className="mt-4 text-base leading-7 text-slate-300">
                  No matching nearby destination is available for this place in
                  the current database yet.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
