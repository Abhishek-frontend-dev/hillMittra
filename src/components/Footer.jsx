export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 py-12 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-8 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
            HillMittra
          </p>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            Curated mountain journeys with a premium focus on slow exploration,
            local culture and cinematic landscapes.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-400 sm:text-right">
          <p>New journeys launching soon.</p>
          <p className="text-slate-500">
            © 2026 HillMittra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
