/* Trim black bars baked into the stills themselves.
 *
 * The frames are filled edge to edge, so a bar inside the JPEG reads as part of
 * the picture rather than as masking.
 *
 * A bar is matte: every pixel in the line is essentially zero. That is what
 * separates it from a merely dark frame, and it matters here because several of
 * these films are very underexposed. love-02 averages 6.9 across its darkest
 * 246 columns and kill-em-now-16 averages 7.5, while a real bar averages 0.01,
 * so both of those keep their picture. The crop is then the smaller of the two
 * opposite bars, which tolerates shadow sitting against one side of the mask.
 *
 *   node scripts/crop-bars.mjs --dry   report only
 *   node scripts/crop-bars.mjs         rewrite the files in place
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const DRY = process.argv.includes("--dry");
const ROOT = "public/work";
const MATTE_MAX = 24; // brightest pixel a masked line may contain
const MATTE_MEAN = 0.5; // and its average, which crushed blacks never reach
const MIN_BAR = 12; // ignore a stray dark line at the very edge
const MAX_SHARE = 0.45; // never eat this much of a dimension
const BLEED = 2; // the boundary line blends bar into picture, so take it too

async function bars(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const px = (x, y) => {
    const i = (y * W + x) * C;
    return Math.max(data[i], data[i + 1], data[i + 2]);
  };

  const matte = (pick, n) => {
    let max = 0;
    let sum = 0;
    for (let k = 0; k < n; k++) {
      const v = pick(k);
      if (v > max) max = v;
      sum += v;
    }
    return max <= MATTE_MAX && sum / n <= MATTE_MEAN;
  };

  const column = (x) => matte((y) => px(x, y), H);
  const rowAt = (y) => matte((x) => px(x, y), W);

  let l = 0;
  while (l < W && column(l)) l++;
  let r = 0;
  while (r < W && column(W - 1 - r)) r++;
  let t = 0;
  while (t < H && rowAt(t)) t++;
  let b = 0;
  while (b < H && rowAt(H - 1 - b)) b++;

  return { W, H, l, r, t, b };
}

const pairFor = (a, b, limit) => {
  const n = Math.min(a, b);
  return n >= MIN_BAR && n / limit < MAX_SHARE ? n + BLEED : 0;
};

let cropped = 0;

for (const dir of fs.readdirSync(ROOT)) {
  const d = path.join(ROOT, dir);
  if (!fs.statSync(d).isDirectory()) continue;

  for (const file of fs.readdirSync(d).filter((f) => /\.(jpg|jpeg|png)$/i.test(f))) {
    const p = path.join(d, file);
    const { W, H, l, r, t, b } = await bars(p);

    const pillar = pairFor(l, r, W);
    const letter = pairFor(t, b, H);
    if (!pillar && !letter) continue;

    const w = W - pillar * 2;
    const h = H - letter * 2;
    console.log(`${dir}/${file}  ${W}x${H} -> ${w}x${h}  (pillar ${pillar}, letter ${letter})`);
    cropped++;
    if (DRY) continue;

    const out = await sharp(p)
      .extract({ left: pillar, top: letter, width: w, height: h })
      .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
      .toBuffer();
    fs.writeFileSync(p, out);
  }
}

console.log(`\n${DRY ? "would crop" : "cropped"} ${cropped}`);
