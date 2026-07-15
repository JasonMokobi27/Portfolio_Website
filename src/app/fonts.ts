/* Fonts are loaded via next/font (self-hosted at build). next/font requires
 * a static top-level import/call so its compiler can statically analyze it —
 * it cannot be lazily required behind a runtime conditional. In sandboxes or
 * CI without network access to Google Fonts, set SKIP_GOOGLE_FONTS=1 to fall
 * back to system stacks defined in globals.css instead of applying the
 * generated font classes. */
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";

const disp = Archivo({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-disp", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const fonts =
  process.env.SKIP_GOOGLE_FONTS === "1"
    ? "font-fallback"
    : `${disp.variable} ${serif.variable} ${mono.variable}`;
