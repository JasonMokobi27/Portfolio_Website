import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="font-mono text-[11px] tracking-[.2em] uppercase text-densito">404 · no such reel</div>
      <h1 className="font-disp font-bold text-[clamp(28px,5vw,56px)]">Frame not found.</h1>
      <Link href="/" className="font-mono text-[12px] tracking-[.16em] uppercase border border-halide px-5 py-3 rounded-[2px] hover:bg-halide hover:text-ink transition-colors">
        Back to the reel →
      </Link>
    </div>
  );
}
