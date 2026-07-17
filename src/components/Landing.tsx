"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";
import type { Project } from "@/content/projects";
import { placeholderStill } from "@/lib/placeholder";
import { muxPoster, muxStill } from "@/lib/projects";

const ROTATE_MS = 4500;

export default function Landing({
  first,
  pool,
  headline,
  kicker,
  intro,
}: {
  first: Project;
  pool: string[];
  headline: string;
  kicker: string;
  intro: string;
}) {
  const router = useRouter();
  const [stills, setStills] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const hasClip = Boolean(first.muxPlaybackId);

  // build the background slideshow from every project's stills, else a placeholder frame
  useEffect(() => {
    if (pool.length) {
      setStills(pool.map((s) => (s.startsWith("/") ? s : muxStill(s, 0, 1280))));
    } else {
      setStills([placeholderStill({ ...first.tone, lift: [10, 6, 2], gain: [1.05, 0.98, 0.86], sat: 0.9, temp: 0.16 }, 1280, 720)]);
    }
    setActive(0);
  }, [pool, first]);

  // rotate through the stills in random order when there's no showreel clip to play instead
  useEffect(() => {
    if (hasClip || stills.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => {
        let next = Math.floor(Math.random() * stills.length);
        while (next === i) next = Math.floor(Math.random() * stills.length);
        return next;
      });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [hasClip, stills]);

  return (
    <section className="relative flex flex-col justify-end p-[var(--pad)] overflow-hidden min-h-[100dvh]">
      <div className="absolute inset-0 -z-10 bg-black">
        {hasClip ? (
          <MuxPlayer
            playbackId={first.muxPlaybackId}
            poster={muxPoster(first.muxPlaybackId!, first.posterTime ?? 0)}
            streamType="on-demand"
            muted
            loop
            autoPlay="muted"
            nohotkeys
            className="mux-cover"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        ) : (
          stills.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover transition-opacity duration-[1500ms]"
              style={{ backgroundImage: `url(${src})`, backgroundPosition: "30%", opacity: i === active ? 1 : 0 }}
            />
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/[0.92]" />
      </div>
      <div className="font-mono text-[11px] tracking-[.22em] uppercase text-halide/80">{kicker}</div>
      <h2 className="font-disp font-bold text-[clamp(34px,6.5vw,86px)] leading-[.9] tracking-[-.02em] my-3.5 max-w-[16ch]">
        {headline}
      </h2>
      <p className="font-serif text-[clamp(15px,1.5vw,19px)] text-halide/85 max-w-[46ch]">{intro}</p>
      <button
        onClick={() => router.push(`/work/${first.slug}`)}
        className="mt-6 self-start font-mono text-[12px] tracking-[.16em] uppercase border border-halide text-halide px-5 py-3 rounded-[2px] hover:bg-halide hover:text-ink transition-colors"
      >
        View the reel →
      </button>
    </section>
  );
}
