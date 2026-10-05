/* Cuts a colour strip from every frame in /public/work.
 *
 * Each still is trimmed of any baked-in letterbox/pillarbox bars, then
 * downsampled to a small grid: each surviving pixel becomes one swatch.
 * The result is a real sample of the graded image, not an invented palette.
 *
 * Run with:  node scripts/extract-palettes.mjs
 * Writes:    src/content/palettes.ts  (commit the result)
 */

import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WORK_DIR = join(ROOT, "public/work");
const OUT = join(ROOT, "src/content/palettes.ts");

const COLS = 4; // swatches across the frame
const ROWS = 2; // swatches down the frame
const TRIM_THRESHOLD = 14; // how close to the border colour counts as a bar

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

/** Downsample to COLS×ROWS and return one hex swatch per cell. */
async function sample(pipeline) {
  const { data } = await pipeline
    .resize(COLS, ROWS, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const swatches = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    swatches.push(hex(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]));
  }
  return swatches;
}

async function paletteFor(file) {
  // Trim first so black bars don't become black swatches. Trimming can fail
  // or eat the whole frame on very flat images, so fall back to the raw frame.
  try {
    const trimmed = sharp(file).trim({ threshold: TRIM_THRESHOLD });
    const { info } = await trimmed.toBuffer({ resolveWithObject: true });
    if (info.width >= COLS && info.height >= ROWS) {
      return await sample(sharp(file).trim({ threshold: TRIM_THRESHOLD }));
    }
  } catch {
    /* fall through to the untrimmed frame */
  }
  return await sample(sharp(file));
}

const files = (await walk(WORK_DIR)).sort();
const entries = [];

for (const file of files) {
  const key = "/" + relative(join(ROOT, "public"), file);
  try {
    entries.push([key, await paletteFor(file)]);
  } catch (err) {
    console.warn(`skipped ${key}: ${err.message}`);
  }
}

const body = entries
  .map(([key, swatches]) => `  "${key}": [${swatches.map((s) => `"${s}"`).join(", ")}],`)
  .join("\n");

await writeFile(
  OUT,
  `/* GENERATED. Do not edit by hand.
   Run \`node scripts/extract-palettes.mjs\` after adding or changing stills.

   Each entry is a strip of swatches sampled straight from the graded frame
   (letterbox bars trimmed first), read left-to-right, top-to-bottom. */

export const PALETTES: Record<string, string[]> = {
${body}
};
`,
  "utf8",
);

console.log(`wrote ${entries.length} palettes → ${relative(ROOT, OUT)}`);
