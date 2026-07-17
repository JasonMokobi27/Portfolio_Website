import { getProjects } from "@/lib/projects";
import { SITE } from "@/content/projects";
import Reel from "@/components/Reel";
import Landing from "@/components/Landing";

export default function Home() {
  const projects = getProjects();
  const pool = projects.flatMap((p) => p.stills ?? []);
  return (
    <div className="grid grid-cols-[clamp(220px,22vw,300px)_1fr] h-[100dvh] max-[820px]:grid-cols-1 max-[820px]:h-auto max-[820px]:min-h-[100dvh]">
      <Reel projects={projects} />
      <Landing first={projects[0]} pool={pool} headline={SITE.headline} kicker={`${SITE.role} · worldwide`} intro={SITE.intro} />
    </div>
  );
}
