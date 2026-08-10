"use client";

import MuxPlayer from "@mux/mux-player-react";
import type { Project } from "@/content/projects";
import { muxPoster } from "@/lib/projects";

/** The frame stage. Real Mux clip when a playbackId exists; otherwise the
 *  still passed down from Stage (a real shot, or a graded procedural
 *  placeholder — Stage decides which). Prev/next arrows let you step
 *  through multiple stills when there's no clip yet. */
export default function FrameViewer({
  project,
  stillSrc,
  showNav,
  onPrev,
  onNext,
}: {
  project: Project;
  stillSrc?: string;
  showNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const hasClip = Boolean(project.muxPlaybackId);

  return (
    <div className="relative flex-1 min-h-0 max-[820px]:flex-none max-[820px]:aspect-video border border-line bg-black overflow-hidden rounded-[3px] shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)]">
      {hasClip ? (
        <MuxPlayer
          playbackId={project.muxPlaybackId}
          poster={muxPoster(project.muxPlaybackId!, project.posterTime ?? 0)}
          streamType="on-demand"
          muted
          loop
          autoPlay="muted"
          nohotkeys
          className="mux-cover"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{ backgroundImage: stillSrc ? `url(${stillSrc})` : undefined }}
        />
      )}

      {/* film perforations */}
      <Perf className="top-[5px]" />
      <Perf className="bottom-[5px]" />

      {!hasClip && showNav && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous still"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-[6] w-9 h-9 flex items-center justify-center rounded-full bg-ink/50 backdrop-blur-[3px] text-halide text-lg hover:bg-ink/70"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next still"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[6] w-9 h-9 flex items-center justify-center rounded-full bg-ink/50 backdrop-blur-[3px] text-halide text-lg hover:bg-ink/70"
          >
            ›
          </button>
        </>
      )}

      {/* motion / still badge */}
      <span className="absolute top-3.5 left-4 z-[5] font-mono text-[10px] tracking-[.16em] uppercase px-2.5 py-1.5 rounded-[2px] text-halide bg-ink/50 backdrop-blur-[3px]">
        {hasClip ? (
          <>
            <i className="inline-block w-1.5 h-1.5 rounded-full bg-safelight mr-1.5 align-middle animate-pulse" />
            Motion
          </>
        ) : (
          "Still"
        )}
      </span>
    </div>
  );
}

function Perf({ className }: { className: string }) {
  return (
    <div className={`absolute left-0 right-0 h-[9px] pointer-events-none z-[4] flex gap-3.5 px-2.5 opacity-45 ${className}`} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="flex-1 max-w-4 bg-ink rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      ))}
    </div>
  );
}
