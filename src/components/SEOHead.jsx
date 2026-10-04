import { useEffect } from "react";

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  twitterTitle,
  twitterDescription,
  image,
}) {
  useEffect(() => {
    const nextTitle = title || "HillMittra";
    document.title = nextTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        description ||
          "HillMittra helps travelers discover calm, premium mountain experiences.",
      );
    } else {
      const tag = document.createElement("meta");
      tag.name = "description";
      tag.content =
        description ||
        "HillMittra helps travelers discover calm, premium mountain experiences.";
      document.head.appendChild(tag);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl || window.location.href);
    } else {
      const tag = document.createElement("link");
      tag.rel = "canonical";
      tag.href = canonicalUrl || window.location.href;
      document.head.appendChild(tag);
    }

    const setMetaTag = (property, contentValue) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute("content", contentValue || "");
      } else {
        const tag = document.createElement("meta");
        tag.setAttribute("property", property);
        tag.content = contentValue || "";
        document.head.appendChild(tag);
      }
    };

    setMetaTag("og:type", "website");
    setMetaTag("og:title", ogTitle || title || "HillMittra");
    setMetaTag(
      "og:description",
      ogDescription ||
        description ||
        "HillMittra helps travelers discover calm, premium mountain experiences.",
    );
    setMetaTag("og:url", ogUrl || canonicalUrl || window.location.href);
    if (image) {
      setMetaTag("og:image", image);
    }

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", twitterTitle || title || "HillMittra");
    setMetaTag(
      "twitter:description",
      twitterDescription ||
        description ||
        "HillMittra helps travelers discover calm, premium mountain experiences.",
    );
    if (image) {
      setMetaTag("twitter:image", image);
    }
  }, [
    title,
    description,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogUrl,
    twitterTitle,
    twitterDescription,
    image,
  ]);

  return null;
}
