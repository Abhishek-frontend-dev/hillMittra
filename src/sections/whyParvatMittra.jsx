import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

export default function WhyParvatMittra() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/5 py-24">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.16),_transparent_30%)] lg:block" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <SectionHeading
              overline="Why ParvatMittra"
              title="A better way to experience the hills"
              description="We exist to move beyond checklist travel. Each journey is shaped by local custodians, mindful logistics and stories that belong to the mountains."
            />
            <div className="mt-10 space-y-6 text-slate-300 sm:text-lg">
              <p>
                ParvatMittra opens doors to hidden valleys, sunrise ridge lines and small-scale hospitality that feels rare, honest and soulful.
              </p>
              <p>
                Our evenings are built around campfire conversation, not group schedules. Our routes value atmosphere over attractions, and every departure is crafted with authenticity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_34px_100px_-70px_rgba(15,23,42,0.85)]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Craft and care</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Local guides, local culture, unforgettable access</h3>
              <p className="mt-4 text-slate-300 leading-7">
                We collaborate with communities to design trips that feel personal, sustainable and rooted in place. The result is a travel experience that honors the hills and the people who know them best.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-slate-900/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Thoughtful pace</p>
                <p className="mt-4 text-slate-200 leading-7">
                  Journeys are paced around quiet mornings, scenic afternoons and evenings that echo mountain calm.
                </p>
              </div>
              <div className="rounded-[2rem] bg-slate-900/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Curated authenticity</p>
                <p className="mt-4 text-slate-200 leading-7">
                  We source stays, walks and meals that feel cultivated, genuine and connected to each destination’s spirit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
