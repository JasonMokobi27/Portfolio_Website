"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE, type Project } from "@/content/projects";
import { placeholderStill } from "@/lib/placeholder";
import { muxStill } from "@/lib/projects";
import ColourStrip from "./ColourStrip";
import FrameViewer from "./FrameViewer";

/* Shot on / delivered as — the rest of the credit block is the film's crew. */
const TECH_ROWS: [keyof Project["credits"], string][] = [
  ["format", "Format"],
  ["delivery", "Delivery"],
];

/** A single project: the frame first, its own colour strip underneath, then
 *  the stills to step through and the few facts worth stating plainly.
 *  `strip` is sampled on the server so the palette table isn't shipped down. */
export default function ProjectView({
  project,
  strip,
  next,
}: {
  project: Project;
  strip: string[];
  next: Project;
}) {
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setThumbs(
      project.stills?.length
        ? project.stills.map((s) => (s.startsWith("/") ? s : muxStill(s)))
        : [placeholderStill(project.tone, 240, 135)],
    );
    setActive(0);
    setPlaying(false);
  }, [project]);

  const tech = TECH_ROWS.filter(([key]) => project.credits[key]);

  return (
    <div className="min-w-0">
      <div className="flex aspect-[16/8] max-[820px]:aspect-video">
        <FrameViewer
          project={project}
          stillSrc={thumbs[active]}
          showNav={!project.muxPlaybackId && thumbs.length > 1}
          onPrev={() => setActive((i) => (i - 1 + thumbs.length) % thumbs.length)}
          onNext={() => setActive((i) => (i + 1) % thumbs.length)}
          playing={playing}
          onPlay={() => setPlaying(true)}
        />
      </div>

      <ColourStrip swatches={strip} className="h-[14px] mt-1.5" />

      {thumbs.length > 1 && (
        <div className="flex gap-1 mt-1.5 h-[46px] overflow-x-auto">
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setActive(i);
                setPlaying(false);
              }}
              aria-label={`Show still ${i + 1}`}
              aria-current={!playing && i === active}
              className={`flex-1 min-w-[44px] border rounded-[2px] bg-black bg-cover bg-center transition-opacity ${
                !playing && i === active
                  ? "border-safelight opacity-100"
                  : "border-line opacity-55 hover:opacity-90"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      )}

      <h1 className="font-disp font-medium text-[clamp(20px,2.5vw,30px)] leading-[1.15] tracking-[-.01em] mt-7">
        {project.title}
      </h1>
      <p className="font-mono text-[11px] text-halide-dim mt-1.5">
        {project.credits.year}, {project.kind.toLowerCase()}
      </p>

      {project.logline && project.logline !== project.kind && (
        <p className="text-[15px] leading-[1.55] mt-4 max-w-[58ch]">{project.logline}</p>
      )}

      <div className="flex gap-2.5 items-center mt-7">
        {project.video && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="font-mono text-[11px] tracking-[.1em] uppercase border border-safelight/60 text-halide px-4 py-2.5 rounded-[2px] flex items-center gap-2 hover:border-safelight hover:bg-safelight/[0.08] transition-colors"
          >
            {playing ? (
              "Back to stills"
            ) : (
              <>
                <i
                  className="block w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-safelight"
                  aria-hidden
                />
                {project.video.label}
              </>
            )}
          </button>
        )}
        <Link
          href={`/work/${next.slug}`}
          className="font-mono text-[11px] tracking-[.1em] uppercase border border-line text-halide px-4 py-2.5 rounded-[2px] hover:border-halide hover:bg-halide/[0.04] transition-colors"
        >
          Next: {next.title} →
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-line max-w-[70ch]">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-4">
          <div>
            <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-safelight">
              {project.credits.role}
            </dt>
            <dd className="font-disp text-[14px] mt-1">{SITE.name}</dd>
          </div>
          {(project.crew ?? []).map((line) => (
            <div key={line.role}>
              <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">{line.role}</dt>
              <dd className="font-disp text-[14px] mt-1">{line.names.join(", ")}</dd>
            </div>
          ))}
          {tech.map(([key, label]) => (
            <div key={key}>
              <dt className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">{label}</dt>
              <dd className="font-disp text-[14px] mt-1">{project.credits[key]}</dd>
            </div>
          ))}
        </dl>

        {project.cast?.length ? (
          <div className="mt-7">
            <h2 className="font-mono text-[10px] tracking-[.12em] uppercase text-halide-dim">Cast</h2>
            <p className="font-disp text-[14px] leading-[1.6] mt-1.5">
              {project.cast.map((c) => (c.as ? `${c.name} (${c.as})` : c.name)).join(" · ")}
            </p>
          </div>
        ) : null}

        {project.imdb && (
          <a
            href={project.imdb}
            target="_blank"
            rel="noopener"
            className="inline-block font-mono text-[11px] tracking-[.1em] uppercase text-densito mt-7 hover:text-halide transition-colors"
          >
            Full credits on IMDb ↗
          </a>
        )}
      </div>
    </div>
  );
}
