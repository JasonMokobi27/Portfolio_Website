import TopBar from "./TopBar";
import SiteFooter from "./SiteFooter";

/** The frame every page sits in: the top bar, one measured column, the footer.
 *
 *  The page is one full-width column now rather than a rail beside a panel, so
 *  the grids inside it get the whole width to fill. Archivo is set here rather
 *  than on `body`, so anything that wants the serif asks for it. */
export default function Shell({
  active,
  children,
}: {
  active?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100dvh] font-disp pt-10 pb-16 px-[clamp(20px,4vw,56px)]">
      <div className="mx-auto max-w-[1400px]">
        <TopBar active={active} />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
