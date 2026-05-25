// Italic span with the south-paradise "marker stroke" — a skewed cream block
// sits behind the text, hugging the baseline. Used by display headings to
// highlight a key phrase ("Côte d'Azur", "recherche ciblée"…).

type Props = {
  children: React.ReactNode;
  /** Stroke color — default matches the brand cream highlight. */
  color?: string;
};

export function Mark({ children, color = "#ecdfba" }: Props) {
  return (
    <span
      className="relative inline-block italic"
      style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "-0.18em",
          right: "-0.18em",
          top: "32%",
          bottom: "12%",
          background: color,
          transform: "skewX(-6deg)",
          zIndex: 0,
        }}
      />
      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}
