import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { getSeoMetadata } from "../utils/seo";

import Hero from "../sections/Hero";
import WhyHillMittra from "../sections/whyHillMittra";
import Places from "../sections/Places";
import Guides from "../sections/Guides";
import Weather from "../sections/Weather";
import Stories from "../sections/Stories";
import Vision from "../sections/Vision";

const pathMap = {
  "/destinations": "places",
  "/guides": "guides",
  "/weather": "weather",
  "/stories": "stories",
  "/about": "about",
};

export default function Home({ scrollToSection }) {
  const location = useLocation();

  useEffect(() => {
    const section = scrollToSection || pathMap[location.pathname] || "home";
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, scrollToSection]);

  const seo = getSeoMetadata(
    {
      seoTitle: "HillMittra | Mountain Travel Reimagined",
      seoDescription:
        "HillMittra offers premium editorial guidance for destinations, guides, stories and weather planning in the Himalaya.",
    },
    "home",
  );

  return (
    <div className="site-page min-h-screen">
      <SEOHead {...seo} />
      <NavBar />
      <main className="overflow-hidden">
        <Hero />
        <WhyHillMittra />
        <Places />
        <Guides />
        <Weather />
        <Stories />
        <Vision />
      </main>
      <Footer />
    </div>
  );
}
