import test from "node:test";
import assert from "node:assert/strict";
import {
  getRelatedDestinations,
  getRelatedGuides,
  getRelatedStories,
} from "../src/utils/contentRelations.js";
import { destinations } from "../src/data/destinations.js";
import { guides } from "../src/data/guides.js";
import { stories } from "../src/data/stories.js";

test("getRelatedDestinations returns matching destinations by shared tags", () => {
  const related = getRelatedDestinations(destinations[0], {
    destinations,
    limit: 3,
  });
  assert.ok(related.length > 0);
  assert.ok(related.some((item) => item.slug === "nainital"));
});

test("getRelatedGuides returns matching guides by shared tags", () => {
  const related = getRelatedGuides(guides[0], { guides, limit: 3 });
  assert.ok(related.length > 0);
  assert.ok(related.some((item) => item.slug === "solo-mountain-routes"));
});

test("getRelatedStories returns matching stories by shared tags", () => {
  const related = getRelatedStories(stories[0], { stories, limit: 3 });
  assert.ok(related.length > 0);
  assert.ok(related.some((item) => item.slug === "first-light"));
});
