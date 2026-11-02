import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplets, MapPin, Umbrella, Wind } from "lucide-react";
import WeatherIcon from "../components/WeatherIcons";
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

  const stats = weather
    ? [
        { icon: Droplets, label: "Humidity", value: weather.humidity ?? "-" },
        { icon: Wind, label: "Wind", value: weather.wind ?? "-" },
        {
          icon: Umbrella,
          label: "Rainfall",
          value: `${weather.precipitation ?? 0} mm`,
        },
      ]
    : [];

  return (
    <section
      id="weather"
      className="home-weather relative overflow-hidden py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(112deg,#123129_0%,#1d4d59_46%,#10281f_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_18%,_rgba(255,255,255,0.13),_transparent_46%),radial-gradient(ellipse_at_22%_85%,_rgba(255,255,255,0.08),_transparent_40%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 110"
        className="pointer-events-none absolute right-0 bottom-0 hidden h-24 w-80 opacity-[0.10] lg:block"
      >
        <path
          d="M4 104 L74 40 L128 82 L196 24 L254 72 L316 44"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M36 104 L96 66 L152 94 L214 58"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.35fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <div className="max-w-md">
              <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[#a5d2e4]">
                Mountain weather
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.14] text-white sm:text-[2.4rem]">
                Check the mountain weather before you go
              </h2>
              <p className="mt-5 text-[15px] leading-7 text-white/75">
                Live weather updates - temperature, rainfall and best time to
                visit - all in one place.
              </p>
              <Link
                to="/weather"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3 text-sm font-bold text-brand-green shadow-md shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                View Detailed Forecast
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(140deg,rgba(67,146,179,0.42),rgba(11,29,20,0.62))] p-7 shadow-[0_40px_100px_-55px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-9"
          >
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
                  <MapPin size={14} className="text-brand-yellow" />
                  {featuredDestination?.name ?? "Featured destination"}
                  {featuredDestination?.region ? (
                    <span className="text-white/60">
                      - {featuredDestination.region}
                    </span>
                  ) : null}
                </span>
                {!loading && !error && weather ? (
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a5d2e4]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a5d2e4] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a5d2e4]" />
                    </span>
                    Live
                  </span>
                ) : null}
              </div>

              {loading ? (
                <div className="mt-8 rounded-[1.4rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                    Loading
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Fetching the latest mountain conditions.
                  </p>
                </div>
              ) : error ? (
                <div className="mt-8 rounded-[1.4rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                    Weather update
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/80">{error}</p>
                </div>
              ) : weather ? (
                <>
                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <WeatherIcon
                      code={weather.weatherCode}
                      className="h-20 w-20 shrink-0"
                    />
                    <div>
                      <p className="font-display text-6xl font-semibold tracking-tight text-white">
                        {Math.round(weather.temperature ?? 14)}
                        <span className="align-top text-2xl text-white/70">
                          &deg;C
                        </span>
                      </p>
                      <p className="mt-1 text-base font-medium text-brand-yellow">
                        {weather.condition ?? "Clear sky"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-3 gap-3">
                    {stats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="rounded-[1.2rem] border border-white/15 bg-white/10 p-4 backdrop-blur"
                        >
                          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-white/60">
                            <Icon size={13} className="text-[#a5d2e4]" />
                            {stat.label}
                          </p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            {stat.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {weather.forecast?.length ? (
                    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
                      {weather.forecast.slice(0, 5).map((item) => (
                        <div
                          key={item.day}
                          title={item.note}
                          className="rounded-[1.2rem] border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur"
                        >
                          <p className="text-xs font-semibold text-white/70">
                            {item.day}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {item.temp}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {recommendation ? (
                    <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-6 text-white/60">
                      <span className="font-semibold uppercase tracking-[0.18em] text-brand-yellow">
                        {recommendation.label}
                      </span>{" "}
                      - {recommendation.reason}
                    </p>
                  ) : null}
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
