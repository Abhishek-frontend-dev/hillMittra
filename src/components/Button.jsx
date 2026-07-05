export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200'
  const variants = {
    primary: 'bg-emerald-500 text-slate-950 shadow-[0_24px_60px_-32px_rgba(16,185,129,0.45)] hover:bg-emerald-400',
    secondary: 'border border-emerald-300/30 bg-emerald-950/20 text-emerald-100 hover:bg-emerald-950/35',
  }

  return (
    <button className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
