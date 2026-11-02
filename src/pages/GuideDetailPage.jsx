import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
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
    return <NotFoundPage />;
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
    <div className="site-page min-h-screen">
      <SEOHead {...seo} image={guide.coverImage} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="detail-hero relative overflow-hidden">
          <img
            src={guide.coverImage}
            alt={guide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35),rgba(2,6,23,0.8))]" />
          <div className="relative mx-auto flex min-h-[76vh] w-full max-w-none flex-col justify-end gap-6 px-6 pb-10 pt-44 sm:px-8 lg:min-h-[80vh] lg:px-10 lg:pb-14">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-emerald-100/25 bg-[#214b37]/60 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100 backdrop-blur-md">
                {guide.category}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 [text-wrap:balance]">
                {guide.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white">
              <span className="rounded-full border border-emerald-100/15 bg-[#214b37]/55 px-4 py-2 backdrop-blur-md">
                {guide.readingTime}
              </span>
              <span className="rounded-full border border-emerald-100/15 bg-[#214b37]/55 px-4 py-2 backdrop-blur-md">
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
                  {guide.content?.map((block, index) => {
                    if (typeof block === "string") {
                      return (
                        <p key={index} className="text-lg leading-8">
                          {block}
                        </p>
                      );
                    }

                    if (block?.type === "image") {
                      return (
                        <figure key={index}>
                          <img
                            src={block.src}
                            alt={block.alt || guide.title}
                            loading="lazy"
                            className="h-[24rem] w-full rounded-[2rem] border border-white/10 object-cover"
                          />
                          {block.caption ? (
                            <figcaption className="mt-3 text-center text-sm text-slate-400">
                              {block.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Quick tips
                </p>
                <dl className="mt-3 border-t border-white/10">
                  {guide.quickTips?.map((tip) => (
                    <div
                      key={tip.title}
                      className="border-b border-white/10 py-2.5"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        {tip.title}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-slate-200">
                        {tip.description}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-xs uppercase tracking-[0.28em] text-slate-400">
                  Things to remember
                </p>
                <ul className="mt-3 space-y-2">
                  {guide.checklist?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
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
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
              {relatedDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destination/${destination.slug}`}
                  className="group w-[80vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 md:w-auto md:max-w-none"
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
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
              {relatedStories.map((story) => (
                <div
                  key={story.id}
                  className="w-[80vw] max-w-[22rem] shrink-0 snap-start rounded-[2rem] border border-white/10 bg-slate-900/80 p-7 md:w-auto md:max-w-none"
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
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {continueExploring.map((item) => (
                <Link
                  key={item.id}
                  to={`/guide/${item.slug}`}
                  className="group w-[80vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 md:w-auto md:max-w-none"
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
