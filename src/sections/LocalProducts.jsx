import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    name: "Organic Mandua Flour",
    category: "Food",
    image: "/images/products/mandua-flour.jpg",
  },
  {
    name: "Himalayan Honey",
    category: "Food",
    image: "/images/products/himalayan-honey.jpg",
  },
  {
    name: "Woolen Shawl",
    category: "Crafts",
    image: "/images/products/woolen-shawl.jpg",
  },
  {
    name: "Pahadi Rajma",
    category: "Food",
    image: "/images/products/pahadi-rajma.jpg",
  },
];

export default function LocalProducts() {
  return (
    <section
      id="marketplace"
      className="relative overflow-hidden bg-mist py-20 sm:py-24"
    >
      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-emerald-800">
              Explore local products
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.12] text-emerald-950 sm:text-[2.4rem]">
              Pure. Local. From the hills.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-slate-600">
              HillMittra is growing beyond travel guides. Soon you will be able
              to bring the hills home - authentic mountain products, organic
              and pahadi foods, traditional grains and pulses, and handmade
              crafts, sourced straight from the communities that make them.
            </p>
            <span
              aria-disabled="true"
              title="The marketplace is coming soon"
              className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-emerald-900/30 px-6 py-3 text-sm font-semibold text-emerald-900/90"
            >
              Explore Products
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="rounded-[1.75rem] border border-emerald-900/10 bg-white p-7 shadow-[0_34px_80px_-55px_rgba(16,38,26,0.55)] sm:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist text-emerald-800">
                <ShoppingBag size={22} />
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-emerald-950">
                  Marketplace
                </h3>
                <span className="rounded-full bg-brand-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-950">
                  Coming Soon
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Shop directly from local producers and support mountain
              communities. Every product will trace back to a real village, a
              real family and a real harvest.
            </p>
            <span
              aria-disabled="true"
              title="The marketplace is coming soon"
              className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-400"
            >
              Marketplace Coming Soon
            </span>
          </motion.div>
        </div>

        <div className="scroll-row mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="w-[64vw] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-emerald-900/10 bg-white shadow-[0_24px_60px_-48px_rgba(16,38,26,0.4)]">
                <div className="h-40 overflow-hidden sm:h-44">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between gap-3 px-4 py-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold text-emerald-950">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {product.category}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-emerald-800">
                    <ShoppingBag size={15} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-slate-500">
          Products shown are illustrative previews of the coming marketplace -
          inventory, pricing and ordering are not available yet.
        </p>
      </div>
    </section>
  );
}
