export function getSeoMetadata(content, type) {
  const baseUrl = "https://parvatmittra.com";
  const slug = content?.slug ? `/${type}/${content.slug}` : "/";
  const canonicalUrl = `${baseUrl}${slug}`;

  return {
    title:
      content?.seoTitle || content?.title || content?.name || "HillMittra",
    description:
      content?.seoDescription ||
      content?.description ||
      content?.subtitle ||
      "HillMittra helps travelers discover calm, premium mountain experiences.",
    canonicalUrl,
    ogTitle:
      content?.seoTitle || content?.title || content?.name || "HillMittra",
    ogDescription:
      content?.seoDescription ||
      content?.description ||
      content?.subtitle ||
      "HillMittra helps travelers discover calm, premium mountain experiences.",
    ogUrl: canonicalUrl,
    twitterTitle:
      content?.seoTitle || content?.title || content?.name || "HillMittra",
    twitterDescription:
      content?.seoDescription ||
      content?.description ||
      content?.subtitle ||
      "HillMittra helps travelers discover calm, premium mountain experiences.",
  };
}
