export default function SectionHeading({
  overline = "HillMittra",
  title,
  description,
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
        {overline}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-slate-300 leading-8">{description}</p>
      ) : null}
    </div>
  );
}
