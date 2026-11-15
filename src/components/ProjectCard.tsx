import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { stripForProject } from "@/lib/palette";
import { muxStill } from "@/lib/projects";
import ColourStrip from "./ColourStrip";

/** One project in a grid: the frame cropped to 16:9, the film's own colour
 *  underneath it, then the title and what it is.
 *
 *  The still is a real image with alt text rather than a CSS background, so it
 *  is served at the size the card actually needs and says what it shows. The
 *  title is never truncated: it wraps instead. */
export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const first = project.stills?.[0];
  const src = first ? (first.startsWith("/") ? first : muxStill(first, 0, 1280)) : undefined;

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-1">
      <div className="relative w-full aspect-video rounded-[3px] overflow-hidden bg-black">
        {src && (
          <Image
            src={src}
            alt={`Still from ${project.title}`}
            fill
            /* Measured against the real columns: two of ~628px when featured,
               three of ~410px otherwise, both capped once the page stops
               growing at 1400px. */
            sizes={
              featured
                ? "(max-width: 860px) 100vw, (max-width: 1512px) 46vw, 640px"
                : "(max-width: 560px) 100vw, (max-width: 1100px) 50vw, (max-width: 1512px) 32vw, 420px"
            }
            /* A card is where most visitors meet a grade, so it is encoded at
               the same quality as the full frame rather than as a thumbnail. */
            quality={94}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
        )}
      </div>

      <ColourStrip swatches={stripForProject(project)} className="h-3 opacity-90 group-hover:opacity-100 transition-opacity" />

      <span className="flex justify-between items-baseline gap-3 pt-2.5">
        <span
          className={`font-disp font-medium leading-[1.2] group-hover:underline underline-offset-[4px] ${
            featured ? "text-[clamp(21px,2.2vw,28px)]" : "text-[19px]"
          }`}
        >
          {project.title}
        </span>
        <span className="font-mono text-[12px] text-halide-dim whitespace-nowrap">
          {project.credits.year}, {project.kind.toLowerCase()}
        </span>
      </span>
    </Link>
  );
}

/** The grid the cards sit in. `featured` runs two per row on a desktop, the
 *  default three, and both fall to one on a phone. */
export function ProjectGrid({
  projects,
  featured = false,
}: {
  projects: Project[];
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-8"
          : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-7 gap-y-10"
      }
    >
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} featured={featured} />
      ))}
    </div>
  );
}

/** The small caps label that heads each band of the page. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[12px] tracking-[.1em] uppercase text-halide-dim">{children}</h2>
  );
}
