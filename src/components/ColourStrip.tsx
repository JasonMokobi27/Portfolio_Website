/** A run of colour cut from the film itself. Each slice is one sample of a
 *  graded frame. Decorative, so it stays out of the accessibility tree. */
export default function ColourStrip({
  swatches,
  className = "",
}: {
  swatches: string[];
  className?: string;
}) {
  if (!swatches.length) return null;
  return (
    <div className={`flex overflow-hidden rounded-[2px] ${className}`} aria-hidden>
      {swatches.map((colour, i) => (
        <span key={i} className="flex-1" style={{ background: colour }} />
      ))}
    </div>
  );
}
