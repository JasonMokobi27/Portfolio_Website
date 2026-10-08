"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/content/projects";
import { muxPoster } from "@/lib/projects";

/* The Mux player is ~295kB and no project uses a clip yet, so it only loads
   if one actually has a playbackId. */
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

/** The frame itself. A YouTube trailer or full film once play is pressed,
 *  a Mux clip when a playbackId exists, otherwise the still passed down by
 *  ProjectView. Prev/next arrows step through the stills. */
export default function FrameViewer({
  project,
  stillSrc,
  showNav,
  onPrev,
  onNext,
  playing,
  onPlay,
}: {
  project: Project;
  stillSrc?: string;
  showNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  playing?: boolean;
  onPlay?: () => void;
}) {
  const hasClip = Boolean(project.muxPlaybackId);
  const video = project.video;
  const isPlaying = Boolean(playing && video);

  /* The frame owns its own ratio off a definite width. Leaving the width to be
     inferred from flex-basis plus aspect-ratio collapsed it to a sliver in
     Safari, since every child here is absolutely positioned. */
  return (
    <div className="relative w-full aspect-[16/8] max-[820px]:aspect-video border border-line bg-black overflow-hidden rounded-[3px] shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)]">
      {isPlaying ? (
        <iframe
          key={video!.youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${video!.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={`${project.title} · ${video!.label}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : hasClip ? (
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

      {/* film perforations, stood down while the player owns the frame */}
      {!isPlaying && (
        <>
          <Perf className="top-[5px]" />
          <Perf className="bottom-[5px]" />
        </>
      )}

      {/* play affordance over the still, so motion is one click in */}
      {video && !isPlaying && (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play ${video.label.toLowerCase()}`}
          className="absolute inset-0 z-[7] flex items-center justify-center group bg-ink/0 hover:bg-ink/25 transition-colors"
        >
          <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-[.14em] uppercase text-halide px-4 py-3 rounded-[2px] bg-ink/55 backdrop-blur-[3px] border border-halide/25 group-hover:border-safelight transition-colors">
            <i className="block w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-safelight" aria-hidden />
            {video.label}
          </span>
        </button>
      )}

      {!hasClip && !isPlaying && showNav && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous still"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-[9] w-9 h-9 flex items-center justify-center rounded-full bg-ink/50 backdrop-blur-[3px] text-halide text-lg hover:bg-ink/70"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next still"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[9] w-9 h-9 flex items-center justify-center rounded-full bg-ink/50 backdrop-blur-[3px] text-halide text-lg hover:bg-ink/70"
          >
            ›
          </button>
        </>
      )}

      {/* motion / still badge */}
      {!isPlaying && (
        <span className="absolute top-3.5 left-4 z-[8] font-mono text-[10px] tracking-[.16em] uppercase px-2.5 py-1.5 rounded-[2px] text-halide bg-ink/50 backdrop-blur-[3px] pointer-events-none">
          {hasClip ? (
            <>
              <i className="inline-block w-1.5 h-1.5 rounded-full bg-safelight mr-1.5 align-middle animate-pulse" />
              Motion
            </>
          ) : (
            "Still"
          )}
        </span>
      )}
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
