"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { muxPoster } from "@/lib/projects";

/* The Mux player is ~295kB and no project uses a clip yet, so it only loads
   if one actually has a playbackId. */
const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

/** The frame itself. A YouTube trailer or full film once play is pressed,
 *  a Mux clip when a playbackId exists, otherwise the still passed down by
 *  ProjectView. Prev/next arrows step through the stills, and the counter
 *  says where in them you are.
 *
 *  There is no play button over the frame: the page carries one beside the
 *  title, and two controls for the same trailer read as two trailers. */
export default function FrameViewer({
  project,
  stillSrc,
  stillAlt,
  index,
  total,
  showNav,
  onPrev,
  onNext,
  playing,
}: {
  project: Project;
  stillSrc?: string;
  stillAlt?: string;
  index?: number;
  total?: number;
  showNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  playing?: boolean;
}) {
  const hasClip = Boolean(project.muxPlaybackId);
  const video = project.video;
  const isPlaying = Boolean(playing && video);
  const pad = (n: number) => String(n).padStart(2, "0");

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
        stillSrc && (
          <Image
            key={stillSrc}
            src={stillSrc}
            alt={stillAlt ?? ""}
            fill
            sizes="(max-width: 860px) 100vw, 1300px"
            priority
            className="object-cover"
          />
        )
      )}

      {/* film perforations, stood down while the player owns the frame */}
      {!isPlaying && (
        <>
          <Perf className="top-[5px]" />
          <Perf className="bottom-[5px]" />
        </>
      )}

      {!hasClip && !isPlaying && showNav && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous still"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[9] w-11 h-11 flex items-center justify-center rounded-full border border-halide/40 bg-ink/70 backdrop-blur-[3px] text-halide text-lg hover:border-halide"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next still"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[9] w-11 h-11 flex items-center justify-center rounded-full border border-halide/40 bg-ink/70 backdrop-blur-[3px] text-halide text-lg hover:border-halide"
          >
            <span aria-hidden>›</span>
          </button>
        </>
      )}

      {/* where you are in the stills */}
      {!isPlaying && !hasClip && typeof index === "number" && typeof total === "number" && total > 1 && (
        <span className="absolute right-4 bottom-3.5 z-[8] font-mono text-[12px] text-halide bg-ink/72 px-2 py-1 rounded-[2px] pointer-events-none">
          {pad(index + 1)} / {pad(total)}
        </span>
      )}

      {/* motion / still badge */}
      {!isPlaying && (
        <span className="absolute top-3.5 left-4 z-[8] font-mono text-[12px] tracking-[.16em] uppercase px-2.5 py-1.5 rounded-[2px] text-halide bg-ink/50 backdrop-blur-[3px] pointer-events-none">
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
