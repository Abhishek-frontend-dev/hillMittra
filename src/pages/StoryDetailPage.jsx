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

function renderInlineLinks(text) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, partIndex) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return part;
    }
    const [, label, target] = match;
    return (
      <Link
        key={partIndex}
        to={target}
        className="font-medium text-emerald-700 underline decoration-emerald-700/40 underline-offset-4 transition hover:text-emerald-800"
      >
        {label}
      </Link>
    );
  });
}

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

  const faqStructuredData = story.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: story.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="site-page min-h-screen">
      <SEOHead {...seo} image={story.coverImage} />
      <NavBar />

      <main className="pt-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {faqStructuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        ) : null}
        <section className="detail-hero relative overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.35),rgba(2,6,23,0.84))]" />
          <div className="relative mx-auto flex min-h-[76vh] w-full max-w-none flex-col justify-end gap-6 px-6 pb-10 pt-44 sm:px-8 lg:min-h-[80vh] lg:px-10 lg:pb-14">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/15 bg-[#0f241a]/85 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                {story.category}
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl [text-wrap:balance]">
                {story.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700 [text-wrap:balance]">
                {story.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-emerald-950">
              <span className="rounded-full border border-white/15 bg-[#0f241a]/85 px-4 py-2 backdrop-blur-md">
                {story.readingTime}
              </span>
              <span className="rounded-full border border-white/15 bg-[#0f241a]/85 px-4 py-2 backdrop-blur-md">
                {story.category}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-none px-6 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.78fr] lg:gap-12 xl:gap-16">
          <article className="min-w-0">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
              Story
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {story.excerpt}
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {(() => {
              let imageCount = 0;
              return story.content?.map((block, index) => {
              if (typeof block === "string") {
                return (
                  <p key={index} className="text-lg leading-8 text-slate-600">
                    {renderInlineLinks(block)}
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
                      className="h-[22rem] w-full rounded-[2rem] border border-emerald-900/10 object-cover"
                    />
                    {block.caption ? (
                      <figcaption className="mt-3 text-center text-sm text-slate-500">
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
                  className="rounded-[2rem] border border-emerald-900/10 bg-white p-8"
                >
                  <p className="text-lg leading-8 text-slate-700">“{quote}”</p>
                </div>
              ))}
            </div>
          ) : null}

          {story.faq?.length ? (
            <div id="faq" className="mt-16 max-w-4xl scroll-mt-28">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                Questions
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-emerald-950 sm:text-3xl">
                Questions people ask about this story
              </h2>
              <div className="mt-8 space-y-5">
                {story.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-[2rem] border border-emerald-900/10 bg-white p-7"
                  >
                    <h3 className="text-lg font-semibold text-emerald-950">
                      {item.question}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          </article>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[2rem] border border-emerald-900/10 bg-white p-6 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                At a glance
              </p>
              <dl className="mt-3 border-t border-emerald-900/10">
                {story.keyFacts?.map((fact) => (
                  <div
                    key={`${fact.label}-fact`}
                    className="border-b border-emerald-900/10 py-2.5"
                  >
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-700">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-900/15 bg-mist px-3 py-1 text-xs text-emerald-950">
                  {story.readingTime}
                </span>
                <span className="rounded-full border border-emerald-900/15 bg-mist px-3 py-1 text-xs text-emerald-950">
                  {story.category}
                </span>
              </div>
              {story.faq?.length ? (
                <div className="mt-5 border-t border-emerald-900/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Quick answers
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {story.faq.map((item) => (
                      <li key={`${item.question}-side`}>
                        <a
                          href="#faq"
                          className="block text-sm leading-6 text-emerald-700 transition hover:text-emerald-800"
                        >
                          {item.question}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </aside>
          </div>
        </section>

        <section className="border-t border-emerald-900/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  Related destinations
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-emerald-950">
                  Places that echo this memory
                </h2>
              </div>
            </div>
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
              {relatedDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destination/${destination.slug}`}
                  className="group w-[80vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white md:w-auto md:max-w-none"
                >
                  <img
                    src={destination.image}
                    alt={destination.title || destination.name}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                      {destination.region}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-emerald-950">
                      {destination.title || destination.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {destination.subtitle || destination.tagline}
                    </p>
                    <div className="mt-5 text-sm font-semibold text-emerald-700">
                      Explore destination
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-emerald-900/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  Related guides
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-emerald-950">
                  Reading that deepens the journey
                </h2>
              </div>
            </div>
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.id}
                  to={`/guide/${guide.slug}`}
                  className="w-[80vw] max-w-[22rem] shrink-0 snap-start rounded-[2rem] border border-emerald-900/10 bg-white p-7 md:w-auto md:max-w-none"
                >
                  <h3 className="text-xl font-semibold text-emerald-950">
                    {guide.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {guide.description}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-emerald-700">
                    Read guide
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-emerald-900/10 py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  More stories
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-emerald-950">
                  Continue staying with the hills
                </h2>
              </div>
            </div>
            <div className="scroll-row mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {moreStories.map((item) => (
                <Link
                  key={item.id}
                  to={`/story/${item.slug}`}
                  className="group w-[80vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white md:w-auto md:max-w-none"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-emerald-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
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
