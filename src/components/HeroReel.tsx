"use client";

import Image from "next/image";
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
      <div className="relative w-full aspect-[16/6.4] max-[820px]:aspect-video bg-black border border-line rounded-[3px] overflow-hidden">
        {stills.map((src, i) => (
          /* Real images, so each frame is served at the width it is shown at
             rather than as a full-size JPEG behind a CSS background. */
          <Image
            key={src}
            src={src}
            alt=""
            aria-hidden
            fill
            /* The page is capped at 1400px with a 56px gutter, so the frame
               stops growing at 1288. Saying 100vw past that would have the
               optimizer serve a wider file than the box ever paints. */
            sizes="(max-width: 1512px) 100vw, 1300px"
            quality={94}
            priority={i === 0}
            className="object-cover transition-opacity duration-[1200ms]"
            style={{ opacity: i === active ? 1 : 0 }}
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
            /* The bar stays 18px, but the `after` gives each segment a 44px
               target without pushing the layout around: a finger needs that
               and twelve 18px strips do not give it. */
            className={`relative flex-1 flex overflow-hidden rounded-[2px] transition-opacity after:absolute after:inset-x-0 after:-top-[13px] after:-bottom-[13px] after:content-[''] ${
              i === active ? "opacity-100 ring-1 ring-halide/70" : "opacity-45 hover:opacity-80"
            }`}
          >
            {swatches.map((colour, j) => (
              <span key={j} className="flex-1" style={{ background: colour }} />
            ))}
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-4 font-mono text-[12px] text-halide-dim mt-2">
        {/* The note is an aside, and on a phone it wraps into the counter and
            makes a mess of both. The counter is the part that does work. */}
        <span className="max-[640px]:hidden">Every colour here is taken from the films themselves</span>
        <span className="whitespace-nowrap max-[640px]:ml-auto">
          {active + 1} / {stills.length}
        </span>
      </div>
    </div>
  );
}
