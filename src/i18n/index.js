const resources = {
  en: {
    translation: {
      appName: "ParvatMittra",
      home: "Home",
      destinations: "Destinations",
      guides: "Guides",
      stories: "Stories",
      weather: "Weather",
      about: "About",
    },
  },
};

export const defaultLanguage = "en";

export function getTranslation(key, language = defaultLanguage) {
  return (
    resources[language]?.translation?.[key] ||
    resources.en.translation[key] ||
    key
  );
}
