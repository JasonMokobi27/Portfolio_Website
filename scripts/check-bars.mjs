/* One-off audit: find stills with black bars baked into the file, which read
   as a cropped picture when a frame is filled edge to edge. */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = "public/work";
const hits = [];

for (const dir of fs.readdirSync(root)) {
  const d = path.join(root, dir);
  if (!fs.statSync(d).isDirectory()) continue;

  for (const file of fs.readdirSync(d).filter((f) => /\.(jpg|jpeg|png)$/i.test(f))) {
    const p = path.join(d, file);
    const { data, info } = await sharp(p).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    const colMean = (x) => {
      let s = 0;
      for (let y = 0; y < height; y++) {
        const i = (y * width + x) * channels;
        s += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      return s / height;
    };
    const rowMean = (y) => {
      let s = 0;
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * channels;
        s += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      return s / width;
    };

    let l = 0;
    while (l < width && colMean(l) < 8) l++;
    let r = width - 1;
    while (r > 0 && colMean(r) < 8) r--;
    let t = 0;
    while (t < height && rowMean(t) < 8) t++;
    let b = height - 1;
    while (b > 0 && rowMean(b) < 8) b--;

    const pillar = Math.min(l, width - 1 - r);
    const letter = Math.min(t, height - 1 - b);
    if (pillar > 12 || letter > 12) {
      hits.push(`${dir}/${file}  ${width}x${height}  pillarbox ${pillar}px  letterbox ${letter}px`);
    }
  }
}

console.log(hits.length ? hits.join("\n") : "none");
