"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 5000;

/** The reel at the top of the page: a slow crossfade through the strongest
 *  frames, with the colour strip underneath doubling as the scrubber: one
 *  segment per frame, cut from that frame. `segments` is sampled on the
 *  server so the whole palette table stays out of the client bundle. */
export default function HeroReel({ stills, segments }: { stills: string[]; segments: string[][] }) {
  const [active, setActive] = useState(0);

  /* Keyed on `active` so picking a segment restarts the clock rather than
     cutting away a moment later. The reel never stops on its own. */
  useEffect(() => {
    if (stills.length <= 1) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % stills.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, stills.length]);

  return (
    <div>
      <div className="relative aspect-[16/6.4] max-[820px]:aspect-[16/9] bg-black border border-line rounded-[3px] overflow-hidden">
        {stills.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms]"
            style={{ backgroundImage: `url(${src})`, opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
      </div>

      {/* the strip is the scrubber, one segment per frame */}
      <div className="flex gap-[2px] h-[18px] mt-1.5">
        {segments.map((swatches, i) => (
          <button
            key={stills[i]}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show frame ${i + 1}`}
            aria-current={i === active}
            className={`flex-1 flex overflow-hidden rounded-[2px] transition-opacity ${
              i === active ? "opacity-100 ring-1 ring-halide/70" : "opacity-45 hover:opacity-80"
            }`}
          >
            {swatches.map((colour, j) => (
              <span key={j} className="flex-1" style={{ background: colour }} />
            ))}
          </button>
        ))}
      </div>

      <div className="flex justify-between font-mono text-[11px] text-halide-dim mt-2">
        <span>Every colour here is taken from the films themselves</span>
        <span>
          {active + 1} / {stills.length}
        </span>
      </div>
    </div>
  );
}
