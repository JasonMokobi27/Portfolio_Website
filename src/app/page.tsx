import { getProjects } from "@/lib/projects";
import { SITE, HERO_STILLS } from "@/content/projects";
import { stripsForStills } from "@/lib/palette";
import Rail from "@/components/Rail";
import HeroReel from "@/components/HeroReel";
import WorkRows from "@/components/WorkRows";

export default function Home() {
  const projects = getProjects();
  return (
    <main className="min-h-[100dvh] p-[var(--pad)]">
      <div className="mx-auto max-w-[1400px] grid grid-cols-[clamp(150px,15vw,200px)_minmax(0,1fr)] max-[820px]:grid-cols-1 gap-8 max-[820px]:gap-6">
        <Rail active="all" />

        <div className="min-w-0">
          <HeroReel stills={HERO_STILLS} segments={stripsForStills(HERO_STILLS)} />

          <section className="mt-7 pt-7 border-t border-line">
            <h1 className="font-disp font-medium text-[clamp(20px,2.5vw,30px)] leading-[1.15] tracking-[-.01em] mb-2.5 max-w-[22ch]">
              {SITE.headline}
            </h1>
            <p className="text-[15px] leading-[1.55] text-halide-dim max-w-[58ch]">{SITE.intro}</p>
          </section>

          <section className="mt-7 pt-7 border-t border-line">
            <WorkRows projects={projects} />
          </section>
        </div>
      </div>
    </main>
  );
}
