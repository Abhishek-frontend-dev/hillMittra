export function getRelatedContent(
  item,
  collection,
  { limit = 3, key = "tags" } = {},
) {
  if (!item || !Array.isArray(collection)) {
    return [];
  }

  const currentId = item.id;
  const itemTags = Array.isArray(item[key]) ? item[key] : [];

  return collection
    .filter((entry) => entry.id !== currentId)
    .filter((entry) => {
      const entryTags = Array.isArray(entry[key]) ? entry[key] : [];
      return itemTags.some((tag) => entryTags.includes(tag));
    })
    .slice(0, limit);
}

export function getRelatedDestinations(destination, options = {}) {
  const { destinations = [], limit = 3 } = options;
  return getRelatedContent(destination, destinations, {
    limit,
    key: "tags",
  }).filter(Boolean);
}

export function getRelatedGuides(guide, options = {}) {
  const { guides = [], limit = 3 } = options;
  return getRelatedContent(guide, guides, { limit, key: "relatedTags" }).filter(
    Boolean,
  );
}

export function getRelatedStories(story, options = {}) {
  const { stories = [], limit = 3 } = options;
  return getRelatedContent(story, stories, { limit, key: "tags" }).filter(
    Boolean,
  );
}
