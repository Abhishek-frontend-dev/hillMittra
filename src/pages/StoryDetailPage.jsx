import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { stories } from "../data/stories";
import { destinations } from "../data/destinations";
import { guides } from "../data/guides";
import {
  getRelatedDestinations,
  getRelatedGuides,
} from "../utils/contentRelations";
import { getSeoMetadata } from "../utils/seo";

export default function StoryDetailPage() {
  const { slug } = useParams();

  const story = useMemo(
    () => stories.find((item) => item.slug === slug),
    [slug],
  );

  if (!story) {
    return <Navigate to="/stories" replace />;
  }

  const relatedDestinations = getRelatedDestinations(
    {
      id: story.id,
      tags: story.tags,
    },
    { destinations, limit: 3 },
  );

  const relatedGuides = getRelatedGuides(
    {
      id: story.id,
      relatedTags: story.tags,
    },
    { guides, limit: 3 },
  );

  const moreStories = stories
    .filter((item) => item.id !== story.id)
    .slice(0, 3);

  const seo = getSeoMetadata(story, "story");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: seo.description,
    url: seo.canonicalUrl,
    author: {
      "@type": "Organization",
      name: "ParvatMittra",
    },
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} image={story.coverImage} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="relative overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="h-[72vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.84))]" />
          <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-none flex-col gap-6 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-950/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100">
                {story.category}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {story.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200">
                {story.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                {story.readingTime}
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                {story.category}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-none px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Story
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {story.excerpt}
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {story.content?.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {story.quotes?.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {story.quotes.map((quote) => (
                <div
                  key={quote}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8"
                >
                  <p className="text-lg leading-8 text-slate-200">“{quote}”</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Related destinations
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Places that echo this memory
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
                  Related guides
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Reading that deepens the journey
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/guide/${guide.slug}`}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {guide.description}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-emerald-300">
                    Read guide
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
                  More stories
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Continue staying with the hills
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {moreStories.map((item) => (
                <Link
                  key={item.id}
                  to={`/story/${item.slug}`}
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
                      {item.excerpt}
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
