import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { guides } from "../data/guides";
import { destinations } from "../data/destinations";
import { stories } from "../data/stories";
import {
  getRelatedDestinations,
  getRelatedStories,
} from "../utils/contentRelations";
import { getSeoMetadata } from "../utils/seo";

export default function GuideDetailPage() {
  const { slug } = useParams();

  const guide = useMemo(
    () => guides.find((item) => item.slug === slug),
    [slug],
  );

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const relatedDestinations = getRelatedDestinations(
    {
      id: guide.id,
      tags: guide.relatedTags,
    },
    { destinations, limit: 3 },
  );

  const relatedStories = getRelatedStories(
    {
      id: guide.id,
      tags: guide.relatedTags,
    },
    { stories, limit: 3 },
  );

  const continueExploring = guides
    .filter((item) => item.id !== guide.id)
    .slice(0, 3);

  const seo = getSeoMetadata(guide, "guide");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: seo.description,
    url: seo.canonicalUrl,
    author: {
      "@type": "Organization",
      name: "HillMittra",
    },
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} image={guide.coverImage} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="relative overflow-hidden">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="h-[70vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25),rgba(2,6,23,0.8))]" />
          <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-none flex-col gap-6 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-950/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">
                {guide.category}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200">
                {guide.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                {guide.readingTime}
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                {guide.category}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-none px-6 py-20 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Guide overview
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  {guide.overview}
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <h2 className="text-3xl font-semibold text-white">
                  Guide content
                </h2>
                <div className="mt-6 space-y-5 text-slate-300">
                  {guide.content?.map((block) => (
                    <p key={block} className="text-lg leading-8">
                      {block}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Quick tips
                </p>
                <div className="mt-6 space-y-4">
                  {guide.quickTips?.map((tip) => (
                    <div
                      key={tip.title}
                      className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                        {tip.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Things to remember
                </p>
                <ul className="mt-6 space-y-3 text-slate-300">
                  {guide.checklist?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Related destinations
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Places that fit this guide
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destination/${destination.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80"
                >
                  <img
                    src={destination.image}
                    alt={destination.title || destination.name}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                      {destination.region}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {destination.title || destination.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {destination.subtitle || destination.tagline}
                    </p>
                    <div className="mt-5 text-sm font-semibold text-emerald-300">
                      Explore destination
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Related stories
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Stories that echo this guide
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {relatedStories.map((story) => (
                <div
                  key={story.id}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {story.excerpt}
                  </p>
                  <a
                    href="/stories"
                    className="mt-5 inline-flex text-sm font-semibold text-emerald-300"
                  >
                    Read story
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Continue exploring
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  More guides to keep reading
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {continueExploring.map((item) => (
                <Link
                  key={item.id}
                  to={`/guide/${item.slug}`}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
