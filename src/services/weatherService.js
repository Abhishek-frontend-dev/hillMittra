import { destinations } from "../data/destinations";
import { guides } from "../data/guides";
import { geocodeDestination } from "./geocodingService";

const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  95: "Thunderstorm",
};

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function getDestinationProfile(destination, fallbackName = "") {
  const name = normalizeText(destination?.name || fallbackName);
  const region = normalizeText(destination?.region || "");

  if (name.includes("delhi") || region.includes("delhi")) {
    return { kind: "city", label: "city" };
  }

  if (
    name.includes("auli") ||
    name.includes("shimla") ||
    name.includes("manali") ||
    name.includes("mussoorie") ||
    name.includes("almora")
  ) {
    return { kind: "hill-station", label: "hill-station" };
  }

  if (name.includes("rishikesh")) {
    return { kind: "river", label: "river" };
  }

  if (name.includes("nainital")) {
    return { kind: "lake", label: "lake" };
  }

  return { kind: "general", label: "general" };
}

function getFallbackDestinationMatch(query, destinationList = destinations) {
  const normalized = normalizeText(query);
  if (!normalized) return null;

  const fallbackMap = {
    almora: "nainital",
    mussoorie: "rishikesh",
    shimla: "auli",
    dehradun: "rishikesh",
    haridwar: "rishikesh",
    kumaon: "nainital",
  };

  const fallbackSlug = fallbackMap[normalized];
  return fallbackSlug
    ? (destinationList.find(
        (destination) => destination.slug === fallbackSlug,
      ) ?? null)
    : null;
}

function findMatchingDestination(query, destinationList = destinations) {
  const normalized = normalizeText(query);
  if (!normalized) return null;

  const directMatch = destinationList.find((destination) => {
    const haystack = [
      destination.name,
      destination.title,
      destination.slug,
      destination.region,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });

  return (
    directMatch ?? getFallbackDestinationMatch(normalized, destinationList)
  );
}

export function getFeaturedDestination(
  date = new Date(),
  destinationList = destinations,
) {
  const month = date.getMonth() + 1;

  if ([12, 1, 2].includes(month)) {
    return (
      destinationList.find((destination) => destination.slug === "auli") ??
      destinationList[0]
    );
  }

  if ([6, 7, 8, 9].includes(month)) {
    return (
      destinationList.find((destination) => destination.slug === "rishikesh") ??
      destinationList[0]
    );
  }

  return (
    destinationList.find((destination) => destination.slug === "nainital") ??
    destinationList[0]
  );
}

export async function getWeatherForDestination(
  destinationOrQuery,
  options = {},
) {
  const fallbackDestination =
    typeof destinationOrQuery === "string" ? null : destinationOrQuery;
  const query =
    typeof destinationOrQuery === "string"
      ? destinationOrQuery
      : (destinationOrQuery?.name ?? "");
  const matchedDestination =
    fallbackDestination ?? findMatchingDestination(query);

  let destination = matchedDestination;
  let coordinates = fallbackDestination?.coordinates;
  let displayName = matchedDestination?.name ?? query;

  if (!coordinates) {
    const geocoded = await geocodeDestination(
      query || matchedDestination?.name || options?.label || "Himalayas",
    );
    displayName =
      geocoded.displayName ||
      query ||
      matchedDestination?.name ||
      options?.label ||
      "Selected destination";
    coordinates = {
      latitude: geocoded.latitude,
      longitude: geocoded.longitude,
    };
  }

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

  const response = await fetch(weatherUrl);

  if (!response.ok) {
    throw new Error("Unable to fetch weather right now.");
  }

  const data = await response.json();
  const current = data.current ?? {};
  const daily = data.daily ?? {};
  const dailyTimes = daily.time ?? [];
  const dailyMax = daily.temperature_2m_max ?? [];
  const dailyMin = daily.temperature_2m_min ?? [];
  const dailyPrecip = daily.precipitation_sum ?? [];

  const forecast = dailyTimes.slice(0, 3).map((day, index) => ({
    day: index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Weekend",
    temp: `${Math.round(dailyMax[index] ?? 0)}° / ${Math.round(dailyMin[index] ?? 0)}°`,
    note: `${dailyPrecip[index] ? `${Math.round(dailyPrecip[index])}% rain` : "Clear mountain air"}`,
    humidity: `${Math.max(50, Math.min(95, Math.round((current.temperature_2m ?? 14) + 60)))}%`,
    wind: `${Math.round(current.wind_speed_10m ?? 6)} km/h`,
  }));

  const payload = {
    destination: destination
      ? {
          ...destination,
          subtitle:
            destination.subtitle ||
            destination.description ||
            "Live weather data",
          description:
            destination.description ||
            destination.subtitle ||
            "Live weather data",
        }
      : {
          name: options?.label || displayName || "Selected destination",
          subtitle: options?.subtitle || "Live weather data",
          description: options?.description || "Live weather data",
          slug: "search",
          tags: [],
          region: options?.region || "",
        },
    temperature: current.temperature_2m ?? 14,
    precipitation: current.precipitation ?? 0,
    windSpeed: current.wind_speed_10m ?? 6,
    weatherCode: current.weather_code ?? 1,
    condition: weatherCodeMap[current.weather_code] ?? "Clear sky",
    summary: `${Math.round(current.temperature_2m ?? 14)}°C with ${current.precipitation ? `${current.precipitation}% precipitation` : "light wind"} and calm mountain visibility.`,
    forecast,
  };

  return payload;
}

export function getTravelRecommendation(weather, destination) {
  const { temperature, precipitation, windSpeed, weatherCode } = weather;
  const profile = getDestinationProfile(
    destination,
    weather?.destination?.name || "",
  );

  if (
    precipitation >= 60 ||
    windSpeed >= 30 ||
    temperature <= 4 ||
    weatherCode >= 95
  ) {
    return {
      score: "Avoid Today",
      label: "Avoid Today",
      reason:
        profile.kind === "city"
          ? "Heavy rain and strong wind make outdoor city plans less comfortable today."
          : "Heavy rain, lightning or strong wind makes long mountain drives and exposed routes less comfortable.",
    };
  }

  if (temperature >= 18 && precipitation <= 15 && windSpeed <= 18) {
    return {
      score: "Excellent",
      label: "Excellent",
      reason:
        profile.kind === "city"
          ? "Ideal conditions for long walks, cafés and open-air city time."
          : profile.kind === "river"
            ? "Perfect for riverside pauses, photography and easy outdoor exploration."
            : "Perfect conditions for long walks, photography and outdoor exploration.",
    };
  }

  if (temperature >= 10 && precipitation <= 30 && windSpeed <= 24) {
    return {
      score: "Good",
      label: "Good",
      reason:
        profile.kind === "hill-station"
          ? "Comfortable for scenic routes, slow wandering and mountain viewpoints."
          : profile.kind === "lake"
            ? "A calm day for lakeside strolls and relaxed local exploring."
            : "Comfortable conditions for scenic travel and slow outdoor plans.",
    };
  }

  return {
    score: "Average",
    label: "Average",
    reason:
      profile.kind === "city"
        ? "The day is workable, but the weather suggests a lighter city plan with flexible timing."
        : "The day is workable, but the weather suggests shorter plans and flexible timing.",
  };
}

export function getPackingSuggestions(weather, destination) {
  const profile = getDestinationProfile(
    destination,
    weather?.destination?.name || "",
  );
  const items = [
    { name: "Water bottle", reason: "Hydration matters even on calm days." },
    {
      name: "Light jacket",
      reason: "Mountain air shifts quickly after sunrise.",
    },
  ];

  if (weather.precipitation >= 30) {
    items.push({
      name: "Raincoat",
      reason: "Expected showers can change your route quickly.",
    });
  }

  if (weather.temperature <= 10) {
    items.push({
      name: "Warm layer",
      reason: "Temperatures stay cooler at elevation.",
    });
  }

  if (weather.windSpeed >= 18) {
    items.push({
      name: "Windproof layer",
      reason: "Wind feels stronger in exposed stretches.",
    });
  }

  if (weather.weatherCode >= 71 || profile.kind === "hill-station") {
    items.push({
      name: "Snow-ready shoes",
      reason: "Snow and slush need sure footing and dry socks.",
    });
  }

  if (profile.kind === "city") {
    items.push({
      name: "Compact umbrella",
      reason: "A small umbrella is useful for quick city weather changes.",
    });
  }

  items.push({
    name: "Power bank",
    reason: "Useful for long drives, scenic stops and phone navigation.",
  });

  return items;
}

export function getActivitySuggestions(weather, destination) {
  const profile = getDestinationProfile(
    destination,
    weather?.destination?.name || "",
  );
  const suggestions = [];

  if (weather.precipitation >= 50) {
    suggestions.push({
      title: profile.kind === "city" ? "Indoor cafés" : "Cafe hopping",
      description:
        profile.kind === "city"
          ? "A slower day with warm drinks and indoor stops suits the weather well."
          : "A slow day with warm drinks and long pauses suits rainy weather beautifully.",
    });
  } else if (weather.temperature >= 18) {
    suggestions.push({
      title: profile.kind === "city" ? "City walk" : "Photography walk",
      description:
        profile.kind === "city"
          ? "Longer daylight and mild conditions make city wandering especially pleasant."
          : "Clear light and soft air make this an excellent day for scenic exploration.",
    });
  } else {
    suggestions.push({
      title: profile.kind === "river" ? "Riverside pause" : "Nature walk",
      description:
        profile.kind === "river"
          ? "A gentle riverside break feels especially good in cooler conditions."
          : "A gentle walk suits the cooler air and calm mountain light.",
    });
  }

  if (weather.weatherCode >= 71) {
    suggestions.push({
      title: "Snowy ridge pause",
      description:
        "Winter conditions make a slow ridge walk feel cinematic and memorable.",
    });
  } else if (profile.kind === "river") {
    suggestions.push({
      title: "Riverfront pause",
      description: "A calm riverside afternoon fits the day beautifully.",
    });
  } else if (profile.kind === "hill-station") {
    suggestions.push({
      title: "Viewpoint stroll",
      description:
        "A gentle hilltop loop feels especially rewarding in mild weather.",
    });
  } else {
    suggestions.push({
      title: profile.kind === "city" ? "Local market loop" : "Lakefront stroll",
      description:
        profile.kind === "city"
          ? "A slower circuit through the local streets feels much richer in good weather."
          : "A slower lake loop feels especially good in mild conditions.",
    });
  }

  return suggestions.slice(0, 3);
}

export function getSafetyTips(weather, destination) {
  const profile = getDestinationProfile(
    destination,
    weather?.destination?.name || "",
  );
  const tips = [];

  if (weather.precipitation >= 40) {
    tips.push("Avoid exposed ridges and long hill drives during heavy rain.");
  }

  if (weather.windSpeed >= 24) {
    tips.push("Keep your route simple and leave extra time for slower travel.");
  }

  if (weather.weatherCode >= 71 || profile.kind === "hill-station") {
    tips.push(
      "Snow and ice can make trails slick, so allow more time and keep footing secure.",
    );
  }

  if (profile.kind === "city") {
    tips.push(
      "Leave extra buffer time for traffic if you are moving between multiple stops.",
    );
  }

  tips.push("Check local conditions before setting out for a long trek.");
  tips.push("Carry a dry layer even when the forecast looks calm.");

  return tips;
}

export function getRelatedGuide(destination) {
  if (!destination?.tags?.length) return null;
  const guideIndex = guides.findIndex((guide) =>
    guide.relatedTags?.some((tag) => destination.tags?.includes(tag)),
  );
  return guideIndex >= 0 ? guides[guideIndex] : null;
}

export function getRelatedDestination(destination) {
  if (!destination?.id) return null;

  const directMatch = destinations.find(
    (item) =>
      item.id !== destination.id &&
      item.tags?.some((tag) => destination.tags?.includes(tag)),
  );

  if (directMatch) {
    return directMatch;
  }

  const fallbackMatch = getFallbackDestinationMatch(
    destination?.name || destination?.title || "",
    destinations,
  );
  return fallbackMatch && fallbackMatch.id !== destination.id
    ? fallbackMatch
    : null;
}
