import { motion } from "framer-motion";
import { Compass, HeartHandshake, Leaf, Mountain } from "lucide-react";

const highlights = [
  {
    icon: Mountain,
    title: "Local expertise",
    copy: "Real people, real knowledge of the mountains.",
  },
  {
    icon: Compass,
    title: "Curated experiences",
    copy: "From hidden gems to must-visit places.",
  },
  {
    icon: Leaf,
    title: "Sustainable travel",
    copy: "For people, nature and local communities.",
  },
  {
    icon: HeartHandshake,
    title: "Always with you",
    copy: "Planning, exploring, remembering.",
  },
];

export default function WhyHillMittra() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-mist py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,_rgba(252,197,53,0.10),_transparent_32%),radial-gradient(circle_at_6%_78%,_rgba(67,146,179,0.10),_transparent_38%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 320 90"
        className="pointer-events-none absolute -left-6 bottom-6 h-20 w-72 opacity-[0.08]"
      >
        <path
          d="M2 82 L60 34 L104 66 L160 18 L214 62 L262 30 L318 78"
          stroke="#2c583d"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-emerald-800">
              Why HillMittra
            </p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.12] text-emerald-950 sm:text-[2.6rem] lg:text-[3rem]">
              A better way to experience the hills
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              We&rsquo;re not just a travel platform. We&rsquo;re your mountain
              companion - helping you explore with deeper insights, local
              connections and a greater sense of belonging.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-y-8 divide-y divide-[#d8e0d3] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`pt-2 sm:py-1 lg:px-6 ${
                      index === 0 ? "lg:pl-0" : ""
                    } ${index === highlights.length - 1 ? "lg:pr-0" : ""}`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className="text-emerald-700"
                    />
                    <h3 className="mt-4 text-[15px] font-semibold text-emerald-950">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {item.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -right-2 top-2 z-20 h-9 w-9 rounded-full bg-brand-yellow sm:-right-4"
            />
            <p className="mb-4 font-display text-2xl italic leading-snug text-emerald-950 sm:text-[1.7rem]">
              Your mountain companion
            </p>
            <img
              src="/images/destinations/ranikhet.jpg"
              alt="Countryside of the Uttarakhand hills"
              loading="lazy"
              className="h-72 w-full rounded-[2.25rem] rounded-tr-[6rem] object-cover shadow-[0_46px_100px_-62px_rgba(16,38,26,0.75)] sm:h-[24rem] lg:h-[26rem]"
            />
            <p className="mx-auto mt-7 max-w-md text-center text-sm leading-7 text-slate-600">
              HillMittra opens doors to hidden valleys, sunrise ridge lines and
              small-scale hospitality - built around campfire conversation, not
              group schedules.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
