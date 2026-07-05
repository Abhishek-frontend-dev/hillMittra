import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { destinations } from "../data/destinations";
import { guides } from "../data/guides";
import { stories } from "../data/stories";
import {
  getRelatedDestinations,
  getRelatedGuides,
  getRelatedStories,
} from "../utils/contentRelations";
import { getSeoMetadata } from "../utils/seo";

export default function DestinationDetailPage() {
  const { slug } = useParams();

  const destination = useMemo(
    () => destinations.find((item) => item.slug === slug),
    [slug],
  );

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  const relatedGuides = getRelatedGuides(
    {
      id: destination.id,
      relatedTags: destination.tags,
    },
    { guides, limit: 3 },
  );

  const relatedStories = getRelatedStories(
    {
      id: destination.id,
      tags: destination.tags,
    },
    { stories, limit: 3 },
  );

  const nearbyPlaces = destinations.filter((item) => {
    if (item.id === destination.id) {
      return false;
    }

    const matchesByTags = item.tags?.some((tag) =>
      destination.tags?.includes(tag),
    );
    const matchesByNearbyList =
      destination.nearbyPlaces?.includes(item.slug) ||
      destination.nearbyPlaces?.includes(item.id);
    const matchesByRegion = item.region === destination.region;

    return matchesByTags || matchesByNearbyList || matchesByRegion;
  });

  const seo = getSeoMetadata(destination, "destination");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "ParvatMittra",
    description: seo.description,
    url: seo.canonicalUrl,
    about: destination.title || destination.name,
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} image={destination.image} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="relative overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title || destination.name}
            className="h-[72vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.72))]" />
          <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-none flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-300">
                {destination.region}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {destination.title || destination.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200">
                {destination.subtitle}
              </p>
            </div>
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur md:grid-cols-4 sm:grid-cols-2">
              {destination.quickFacts?.map((fact) => (
                <div key={fact.label}>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-none px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Overview
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  A place shaped by atmosphere and intent
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  {destination.overview}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                  Why visit
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  A destination that balances stillness and discovery
                </h3>
                <p className="mt-4 text-slate-300 leading-8">
                  {destination.whyVisit}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Travel style
              </p>
              <div className="mt-6 space-y-4">
                {destination.quickFacts?.map((fact) => (
                  <div
                    key={`${fact.label}-detail`}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-base font-medium text-white">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Top experiences
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  The moments that define this place
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {destination.thingsToDo?.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7"
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    {index + 1}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Best time to visit
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  When this destination feels most alive
                </h2>
                <div className="mt-8 space-y-4">
                  {destination.seasonalHighlights?.map((item) => (
                    <div
                      key={item.period}
                      className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                        {item.period}
                      </p>
                      <p className="mt-2 text-base text-slate-200">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                  Food to try
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {destination.food?.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                Travel tips
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                {destination.travelTips}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Nearby places
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Places that pair beautifully with this route
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {nearbyPlaces.length > 0 ? (
                nearbyPlaces.map((place) => (
                  <Link
                    key={place.id}
                    to={`/destination/${place.slug}`}
                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80"
                  >
                    <img
                      src={place.image}
                      alt={place.title || place.name}
                      className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="p-6">
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                        {place.region}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-white">
                        {place.title || place.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {place.subtitle || place.tagline}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-slate-300 md:col-span-2 xl:col-span-3">
                  No matching nearby destination is available for this route in
                  the current database yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Related guides
                </p>
                <div className="mt-8 space-y-4">
                  {relatedGuides.length > 0 ? (
                    relatedGuides.map((guide) => (
                      <div
                        key={guide.id}
                        className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">
                          {guide.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {guide.description}
                        </p>
                        <a
                          href="/guides"
                          className="mt-4 inline-flex text-sm font-semibold text-emerald-300"
                        >
                          Read guide
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-300">
                      No matching guide is available for this destination in the
                      current database yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Related stories
                </p>
                <div className="mt-8 space-y-4">
                  {relatedStories.length > 0 ? (
                    relatedStories.map((story) => (
                      <div
                        key={story.id}
                        className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">
                          {story.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {story.excerpt}
                        </p>
                        <a
                          href="/stories"
                          className="mt-4 inline-flex text-sm font-semibold text-emerald-300"
                        >
                          Read story
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-300">
                      More stories will appear here as the collection grows.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
