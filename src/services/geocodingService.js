const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1";

export async function geocodeDestination(query) {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery) {
    throw new Error("Please enter a destination to search.");
  }

  const response = await fetch(
    `${NOMINATIM_URL}&q=${encodeURIComponent(normalizedQuery)}`,
    {
      headers: {
        "Accept-Language": "en",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Location search failed.");
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No matching location was found.");
  }

  const [result] = data;

  return {
    displayName: result.display_name || normalizedQuery,
    latitude: Number(result.lat),
    longitude: Number(result.lon),
  };
}
