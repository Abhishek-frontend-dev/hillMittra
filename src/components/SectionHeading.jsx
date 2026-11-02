export default function SectionHeading({
  overline = "HillMittra",
  title,
  description,
  tone = "dark",
}) {
  const colors =
    tone === "light"
      ? {
          overline: "text-emerald-700",
          title: "text-emerald-950",
          description: "text-slate-600",
        }
      : {
          overline: "text-slate-400",
          title: "text-white",
          description: "text-slate-300",
        };

  return (
    <div className="max-w-2xl space-y-4">
      <p className={`text-sm uppercase tracking-[0.32em] ${colors.overline}`}>
        {overline}
      </p>
      <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${colors.title}`}>
        {title}
      </h2>
      {description ? (
        <p className={`${colors.description} leading-8`}>{description}</p>
      ) : null}
    </div>
  );
}
