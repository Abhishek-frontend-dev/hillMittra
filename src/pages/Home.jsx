import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { getSeoMetadata } from "../utils/seo";

import Hero from "../sections/Hero";
import WhyParvatMittra from "../sections/whyParvatMittra";
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
      seoTitle: "ParvatMittra | Mountain Travel Reimagined",
      seoDescription:
        "ParvatMittra offers premium editorial guidance for destinations, guides, stories and weather planning in the Himalaya.",
    },
    "home",
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <SEOHead {...seo} />
      <NavBar />
      <main className="overflow-hidden">
        <Hero />
        <WhyParvatMittra />
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
