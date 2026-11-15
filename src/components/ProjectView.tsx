"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, type Project } from "@/content/projects";
import { getCategoryOf, leadCredit, muxStill } from "@/lib/projects";
import ColourStrip from "./ColourStrip";
import FrameViewer from "./FrameViewer";
import { SectionLabel } from "./ProjectCard";

/* Shot on / delivered as. The rest of the credit block is the film's crew. */
const TECH_ROWS: [keyof Project["credits"], string][] = [
  ["format", "Format"],
  ["delivery", "Delivery"],
];

/** A single project: the title, the frame and the stills to step through,
 *  then the credits in full.
 *  `strip` is sampled on the server so the palette table isn't shipped down. */
export default function ProjectView({ project, strip }: { project: Project; strip: string[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const stills = project.stills ?? [];
  const thumbs = stills.map((s) => (s.startsWith("/") ? s : muxStill(s, 0, 1280)));

  useEffect(() => {
    setActive(0);
    setPlaying(false);
  }, [project]);

  const tech = TECH_ROWS.filter(([key]) => project.credits[key]);
  const category = getCategoryOf(project);
  const director = leadCredit(project, "director");
  const dp = leadCredit(project, "dp");

  /* Only what the film actually credits. A missing DP leaves no trace. */
  const meta = [
    `${project.credits.year}, ${project.kind.toLowerCase()}`,
    director && `Dir. ${director}`,
    dp && `DP ${dp}`,
  ].filter(Boolean);

  return (
    <>
      {/* A way back that doesn't depend on the browser's own back button. */}
      <Link
        href={category ? `/${category.slug}` : "/"}
        className="inline-flex items-center gap-2 mt-5 min-h-[44px] font-disp text-[14px] text-halide-dim hover:text-halide transition-colors"
      >
        <span aria-hidden>←</span>
        {category?.label ?? "All work"}
      </Link>

      <section className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6 pt-7 pb-9">
        <div className="flex flex-col gap-3 min-w-0">
          <h1 className="font-disp font-medium text-[clamp(40px,7vw,88px)] leading-[1] tracking-[-.03em]">
            {project.title}
          </h1>
          <span className="font-mono text-[13px] text-halide-dim">{meta.join(" · ")}</span>
        </div>

        {/* The one control for the trailer. The frame itself carries none. */}
        {project.video && (
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="inline-flex items-center gap-2.5 min-h-[44px] px-[18px] rounded-[2px] bg-halide text-ink font-disp font-medium text-[15px] hover:bg-white transition-colors"
          >
            {playing ? (
              "Back to stills"
            ) : (
              <>
                <i
                  className="block w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-ink"
                  aria-hidden
                />
                Watch {project.video.label.toLowerCase()}
              </>
            )}
          </button>
        )}
      </section>

      <FrameViewer
        project={project}
        stillSrc={thumbs[active]}
        stillAlt={`${project.title}, still ${active + 1} of ${thumbs.length}`}
        index={active}
        total={thumbs.length}
        showNav={!project.muxPlaybackId && thumbs.length > 1}
        onPrev={() => setActive((i) => (i - 1 + thumbs.length) % thumbs.length)}
        onNext={() => setActive((i) => (i + 1) % thumbs.length)}
        playing={playing}
      />

      <ColourStrip swatches={strip} className="h-[14px] mt-1" />

      {thumbs.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pt-3.5 pb-1.5">
          {thumbs.map((src, i) => {
            const current = !playing && i === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                aria-label={`Show still ${i + 1}`}
                aria-current={current}
                className="relative flex-[0_0_132px] aspect-video rounded-[2px] overflow-hidden bg-black"
              >
                <Image
                  src={src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="132px"
                  quality={94}
                  className={`object-cover transition-opacity ${
                    current ? "opacity-100" : "opacity-[0.72] hover:opacity-95"
                  }`}
                />
                {current && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-[2px] ring-2 ring-safelight ring-offset-2 ring-offset-ink"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <section className="flex flex-col gap-[22px] pt-12">
        <SectionLabel>Credits</SectionLabel>

        {/* Credits run the full width of the page. Each column is a short label
            over one or two names, not prose, so there is no measure to protect:
            auto-fit takes as many 210px columns as fit. */}
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-x-7 gap-y-6">
          <div className="flex flex-col gap-[5px]">
            <dt className="font-mono text-[12px] tracking-[.1em] uppercase text-safelight-lit">
              {project.credits.role}
            </dt>
            <dd className="font-disp text-[16px] leading-[1.35]">{SITE.name}</dd>
          </div>
          {(project.crew ?? []).map((line) => (
            <div key={line.role} className="flex flex-col gap-[5px]">
              <dt className="font-mono text-[12px] tracking-[.1em] uppercase text-halide-dim">
                {line.role}
              </dt>
              <dd className="font-disp text-[16px] leading-[1.35]">{line.names.join(", ")}</dd>
            </div>
          ))}
        </dl>

        {/* Format and delivery are facts about the picture, not people, so they
            get a line of their own rather than a cell in among the crew. */}
        {tech.length > 0 && (
          <dl className="flex flex-wrap gap-x-7 gap-y-6">
            {tech.map(([key, label]) => (
              <div key={key} className="flex flex-col gap-[5px] min-w-[210px]">
                <dt className="font-mono text-[12px] tracking-[.1em] uppercase text-halide-dim">
                  {label}
                </dt>
                <dd className="font-disp text-[16px] leading-[1.35]">{project.credits[key]}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.cast?.length ? (
          <div className="flex flex-col gap-[5px]">
            <h3 className="font-mono text-[12px] tracking-[.1em] uppercase text-halide-dim">Cast</h3>
            {/* One long run of text, so unlike the credits it keeps a measure. */}
            <p className="font-disp text-[16px] leading-[1.6] max-w-[70ch]">
              {project.cast.map((c) => (c.as ? `${c.name} (${c.as})` : c.name)).join(" · ")}
            </p>
          </div>
        ) : null}

        {project.imdb && (
          <a
            href={project.imdb}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center self-start min-h-[44px] font-disp text-[15px] text-halide underline underline-offset-[4px] decoration-halide/40 hover:decoration-halide transition-colors"
          >
            Cast and full credits on IMDb ↗
          </a>
        )}
      </section>
    </>
  );
}
