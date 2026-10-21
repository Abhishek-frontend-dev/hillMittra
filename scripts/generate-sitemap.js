import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { destinations } from "../src/data/destinations.js";
import { guides } from "../src/data/guides.js";
import { stories } from "../src/data/stories.js";

/*
 * Generates public/sitemap.xml from the actual content data.
 * It runs as part of `npm run build`, so any destination/guide/story
 * added to the data files is included automatically on the next build.
 *
 * Paths must stay in sync with the routes in src/App.jsx:
 *   /destination/:slug, /guide/:slug, /story/:slug
 */

const BASE_URL = "https://www.hillmittra.com";

const staticPaths = ["/", "/destinations", "/guides", "/stories", "/weather", "/about"];

const detailPaths = [
  ...destinations.map((item) => `/destination/${item.slug}`),
  ...guides.map((item) => `/guide/${item.slug}`),
  ...stories.map((item) => `/story/${item.slug}`),
];

// Slugs come from hand-written data files, but escape them anyway so the
// script stays safe if content gains characters that XML reserves.
// Entities are built from character codes so this file never relies on
// literal XML escapes that could be altered by tooling.
function escapeXml(value) {
  const amp = String.fromCharCode(38);
  const entities = {
    [String.fromCharCode(38)]: amp + "amp;",
    [String.fromCharCode(60)]: amp + "lt;",
    [String.fromCharCode(62)]: amp + "gt;",
    [String.fromCharCode(34)]: amp + "quot;",
    [String.fromCharCode(39)]: amp + "apos;",
  };
  return value.replace(/[&<>'"]/g, (char) => entities[char]);
}

function buildUrlEntry(path) {
  const loc = `${BASE_URL}${escapeXml(path)}`;
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

const urlEntries = [...staticPaths, ...detailPaths].map(buildUrlEntry).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outputPath = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));
fs.writeFileSync(outputPath, sitemap, "utf8");

console.log(
  `Sitemap generated: ${outputPath} (${staticPaths.length} static + ${detailPaths.length} detail URLs = ${staticPaths.length + detailPaths.length} total)`,
);
