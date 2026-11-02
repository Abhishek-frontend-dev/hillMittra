import { Link } from "react-router-dom";
import { Camera, MessageCircle, Video } from "lucide-react";

const footerLinks = [
  { label: "Destinations", to: "/destinations" },
  { label: "Guides", to: "/guides" },
  { label: "Weather", to: "/weather" },
  { label: "Stories", to: "/stories" },
  { label: "Local Products", to: "/#marketplace", anchor: true },
  { label: "Marketplace", comingSoon: true },
  { label: "About", to: "/about" },
];

export default function Footer() {
  return (
    <footer className="site-footer bg-[#10261a] py-12 text-white">
      <div className="px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex flex-col items-start gap-2">
            <Link to="/" aria-label="HillMittra home" className="flex h-10 items-center">
              <img
                src="/HillMittra_Full_Logo.svg?v=2"
                alt="HillMittra"
                className="h-full w-auto"
              />
            </Link>
            <p className="text-xs tracking-[0.2em] text-white/55">
              Mountains. People. Stories.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-medium text-white/75"
          >
            {footerLinks.map((item) =>
              item.comingSoon ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  title="Marketplace is coming soon"
                  className="cursor-not-allowed text-white/40"
                >
                  {item.label}
                </span>
              ) : item.anchor ? (
                <Link
                  key={item.label}
                  to={{
                    pathname: "/",
                    hash: item.to.replace("/#", "#"),
                  }}
                  className="transition hover:text-brand-yellow"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="transition hover:text-brand-yellow"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center justify-center gap-4 lg:justify-end">
            {[
              { Icon: Video, label: "HillMittra on YouTube" },
              { Icon: Camera, label: "HillMittra on Instagram" },
              { Icon: MessageCircle, label: "HillMittra on Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#home"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-brand-yellow/60 hover:text-brand-yellow"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-9 border-t border-white/10 pt-6 text-right text-xs text-white/45">
          &copy; 2026 HillMittra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
