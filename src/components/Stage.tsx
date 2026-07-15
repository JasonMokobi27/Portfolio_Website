"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/content/projects";
import { placeholderStill } from "@/lib/placeholder";
import { muxStill } from "@/lib/projects";
import FrameViewer from "./FrameViewer";
import Dossier from "./Dossier";

export default function Stage({ project, nextSlug }: { project: Project; nextSlug: string }) {
  const [openDossier, setOpenDossier] = useState(false);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [activeStill, setActiveStill] = useState(0);
  const router = useRouter();

  // build contact-strip thumbnails: real Mux stills if present, else placeholders
  useEffect(() => {
    if (project.stills?.length) {
      setThumbs(project.stills.map((s) => (s.startsWith("/") ? s : muxStill(s))));
    } else {
      setThumbs([placeholderStill(project.tone, 240, 135)]);
    }
    setOpenDossier(false);
    setActiveStill(0);
  }, [project]);

  const showNav = !project.muxPlaybackId && thumbs.length > 1;

  return (
    <main className="relative min-w-0 flex flex-col overflow-hidden">
      <header className="flex justify-between items-end gap-6 p-[var(--pad)] pb-4">
        <div>
          <div className="font-disp font-bold text-[clamp(26px,4.2vw,54px)] leading-[.94] tracking-[-.01em]">{project.title}</div>
          <div className="font-serif italic text-halide-dim text-[clamp(14px,1.4vw,18px)] mt-2 max-w-[52ch]">
            {project.kind} · {project.logline}
          </div>
        </div>
        <div className="font-mono text-[11px] tracking-[.14em] uppercase text-densito text-right flex-none leading-[1.9] whitespace-nowrap max-[820px]:hidden">
          {project.credits.role.split(" · ").map((r) => (
            <div key={r}>{r}</div>
          ))}
        </div>
      </header>

      <div className="flex-1 min-h-0 px-[var(--pad)] pb-2.5 flex flex-col">
        <FrameViewer
          project={project}
          stillSrc={thumbs[activeStill]}
          showNav={showNav}
          onPrev={() => setActiveStill((i) => (i - 1 + thumbs.length) % thumbs.length)}
          onNext={() => setActiveStill((i) => (i + 1) % thumbs.length)}
        />
        <div className="flex gap-1.5 mt-2.5 h-[58px] flex-none">
          {thumbs.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStill(i)}
              aria-label={`Show still ${i + 1}`}
              aria-current={i === activeStill}
              className={`flex-1 border rounded-[2px] overflow-hidden bg-black bg-cover bg-center transition-opacity ${
                i === activeStill ? "border-safelight opacity-100" : "border-line opacity-60 hover:opacity-90"
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </div>

      <div className="p-[var(--pad)] pt-1.5 flex gap-2.5 items-center">
        <button
          onClick={() => setOpenDossier(true)}
          className="font-mono text-[11px] tracking-[.1em] uppercase border border-densito/50 text-densito px-4 py-2.5 rounded-[2px] hover:bg-halide/[0.04]"
        >
          Credits & look
        </button>
        <button
          onClick={() => router.push(`/work/${nextSlug}`)}
          className="font-mono text-[11px] tracking-[.1em] uppercase border border-line text-halide px-4 py-2.5 rounded-[2px] hover:border-halide hover:bg-halide/[0.04]"
        >
          Next project →
        </button>
      </div>

      <Dossier project={project} open={openDossier} onClose={() => setOpenDossier(false)} />
    </main>
  );
}
