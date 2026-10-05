import Link from "next/link";
import type { Project } from "@/content/projects";
import { stripForProject } from "@/lib/palette";
import ColourStrip from "./ColourStrip";

/** The index: every project as a row of its own colour. */
export default function WorkRows({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group grid grid-cols-[160px_minmax(0,1fr)] max-[560px]:grid-cols-1 gap-3 max-[560px]:gap-1.5 items-center rounded-[3px] -mx-2 px-2 py-1.5 transition-colors hover:bg-halide/[0.04]"
        >
          <span className="min-w-0">
            <span className="block font-disp text-[14px] leading-[1.2] truncate group-hover:text-halide transition-colors">
              {project.title}
            </span>
            <span className="block font-mono text-[11px] text-halide-dim">
              {project.credits.year}, {project.kind.toLowerCase()}
            </span>
          </span>
          <ColourStrip
            swatches={stripForProject(project)}
            className="h-[26px] opacity-85 group-hover:opacity-100 transition-opacity"
          />
        </Link>
      ))}
    </div>
  );
}
