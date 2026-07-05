import { destinations } from "../data/destinations";
import { guides } from "../data/guides";

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

export async function fetchWeather(destination) {
  const coordinates = destination.coordinates;

  if (!coordinates) {
    return {
      destination,
      temperature: 14,
      precipitation: 10,
      windSpeed: 6,
      weatherCode: 1,
      condition: "Clear sky",
      summary:
        "Weather data is temporarily unavailable, but conditions remain calm for slow travel.",
    };
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  const data = await response.json();
  const current = data.current ?? {};

  return {
    destination,
    temperature: current.temperature_2m ?? 14,
    precipitation: current.precipitation ?? 0,
    windSpeed: current.wind_speed_10m ?? 6,
    weatherCode: current.weather_code ?? 1,
    condition: weatherCodeMap[current.weather_code] ?? "Clear sky",
    summary: `${Math.round(current.temperature_2m ?? 14)}°C with ${current.precipitation ? `${current.precipitation}% precipitation` : "light wind"} and calm mountain visibility.`,
  };
}

export function getTravelRecommendation(weather) {
  const { temperature, precipitation, windSpeed } = weather;

  if (precipitation >= 60 || windSpeed >= 30 || temperature <= 4) {
    return {
      score: "Avoid Today",
      label: "Avoid Today",
      reason:
        "Heavy rain or strong wind makes long mountain drives and exposed routes less comfortable.",
    };
  }

  if (temperature >= 18 && precipitation <= 15 && windSpeed <= 18) {
    return {
      score: "Excellent",
      label: "Excellent",
      reason:
        "Perfect conditions for long walks, photography and outdoor exploration.",
    };
  }

  if (temperature >= 10 && precipitation <= 30 && windSpeed <= 24) {
    return {
      score: "Good",
      label: "Good",
      reason:
        "Comfortable conditions for scenic travel and slow outdoor plans.",
    };
  }

  return {
    score: "Average",
    label: "Average",
    reason:
      "The day is workable, but the weather suggests shorter plans and flexible timing.",
  };
}

export function getPackingSuggestions(weather) {
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

  items.push({
    name: "Power bank",
    reason: "Useful for long drives, scenic stops and phone navigation.",
  });

  return items;
}

export function getActivitySuggestions(weather, destination) {
  const suggestions = [];

  if (weather.precipitation >= 50) {
    suggestions.push({
      title: "Cafe hopping",
      description:
        "A slow day with warm drinks and long pauses works well in rainy weather.",
    });
  } else if (weather.temperature >= 18) {
    suggestions.push({
      title: "Photography walk",
      description:
        "Clear light and soft air make this an excellent day for scenic exploration.",
    });
  } else {
    suggestions.push({
      title: "Nature walk",
      description:
        "A gentle walk suits the cooler air and calm mountain light.",
    });
  }

  if (destination.slug === "auli") {
    suggestions.push({
      title: "Snow walk",
      description: "Winter conditions make a slow ridge walk feel cinematic.",
    });
  } else if (destination.slug === "rishikesh") {
    suggestions.push({
      title: "Riverfront pause",
      description: "A calm riverside afternoon fits the day beautifully.",
    });
  } else {
    suggestions.push({
      title: "Lakefront stroll",
      description:
        "A slower lake loop feels especially good in mild conditions.",
    });
  }

  return suggestions.slice(0, 3);
}

export function getSafetyTips(weather) {
  const tips = [];

  if (weather.precipitation >= 40) {
    tips.push("Avoid exposed ridges and long hill drives during heavy rain.");
  }

  if (weather.windSpeed >= 24) {
    tips.push("Keep your route simple and leave extra time for slower travel.");
  }

  tips.push("Check local conditions before setting out for a long trek.");
  tips.push("Carry a dry layer even when the forecast looks calm.");

  return tips;
}

export function getRelatedGuide(weather, destination) {
  const guideIndex = guides.findIndex((guide) =>
    guide.relatedTags?.includes(destination.tags?.[0]),
  );
  return guides[guideIndex] ?? guides[0];
}

export function getRelatedDestination(destination) {
  return (
    destinations.find(
      (item) =>
        item.id !== destination.id &&
        item.tags?.some((tag) => destination.tags?.includes(tag)),
    ) ?? destinations.find((item) => item.id !== destination.id)
  );
}
