import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
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
    return <NotFoundPage />;
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
      name: "HillMittra",
    },
  };

  return (
    <div className="site-page min-h-screen">
      <SEOHead {...seo} image={story.coverImage} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section className="detail-hero relative overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35),rgba(2,6,23,0.84))]" />
          <div className="relative mx-auto flex min-h-[76vh] w-full max-w-none flex-col justify-end gap-6 px-6 pb-10 pt-44 sm:px-8 lg:min-h-[80vh] lg:px-10 lg:pb-14">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-emerald-100/25 bg-[#214b37]/60 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-100 backdrop-blur-md">
                {story.category}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
                {story.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 [text-wrap:balance]">
                {story.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white">
              <span className="rounded-full border border-emerald-100/15 bg-[#214b37]/55 px-4 py-2 backdrop-blur-md">
                {story.readingTime}
              </span>
              <span className="rounded-full border border-emerald-100/15 bg-[#214b37]/55 px-4 py-2 backdrop-blur-md">
                {story.category}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-none px-6 py-20 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Story
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {story.excerpt}
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {(() => {
              let imageCount = 0;
              return story.content?.map((block, index) => {
              if (typeof block === "string") {
                return (
                  <p key={index} className="text-lg leading-8 text-slate-300">
                    {block}
                  </p>
                );
              }

              if (block?.type === "image") {
                const isLeft = imageCount % 2 === 0;
                imageCount += 1;
                return (
                  <figure
                    key={index}
                    className={`my-8 w-full lg:w-[44%] ${
                      isLeft ? "lg:float-left lg:mr-10 lg:ml-0" : "lg:float-right lg:ml-10 lg:mr-0"
                    }`}
                  >
                    <img
                      src={block.src}
                      alt={block.alt || story.title}
                      loading="lazy"
                      className="h-[22rem] w-full rounded-[2rem] border border-white/10 object-cover"
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
              });
            })()}
          </div>

          <div className="clear-both" aria-hidden="true" />

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
