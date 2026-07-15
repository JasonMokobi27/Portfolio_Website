import type { Tone } from "@/content/projects";

type Ctx = CanvasRenderingContext2D;

const SCENES: Record<Tone["scene"], (x: Ctx, w: number, h: number) => void> = {
  room(x, w, h) {
    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#2b2620"); g.addColorStop(1, "#0b0a09");
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.fillStyle = "#3a332a"; x.fillRect(w * 0.12, h * 0.2, w * 0.28, h * 0.66);
    x.fillStyle = "#6b5a44"; x.fillRect(w * 0.62, h * 0.34, w * 0.2, h * 0.5);
    const gl = x.createRadialGradient(w * 0.8, h * 0.2, 10, w * 0.8, h * 0.2, w * 0.4);
    gl.addColorStop(0, "rgba(220,180,120,.5)"); gl.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = gl; x.fillRect(0, 0, w, h);
  },
  window(x, w, h) {
    x.fillStyle = "#14161a"; x.fillRect(0, 0, w, h);
    const g = x.createLinearGradient(w * 0.3, 0, w * 0.9, h);
    g.addColorStop(0, "#c9c1ad"); g.addColorStop(1, "#2a2620");
    x.fillStyle = g; x.fillRect(w * 0.42, h * 0.1, w * 0.42, h * 0.7);
    x.fillStyle = "rgba(10,10,12,.9)";
    for (let i = 1; i < 4; i++) x.fillRect(w * 0.42 + i * w * 0.105, h * 0.1, 3, h * 0.7);
    x.fillStyle = "#1c1a17"; x.fillRect(0, h * 0.66, w, h * 0.34);
  },
  portrait(x, w, h) {
    x.fillStyle = "#0d0b0a"; x.fillRect(0, 0, w, h);
    const s = x.createRadialGradient(w * 0.5, h * 0.46, 20, w * 0.5, h * 0.46, w * 0.34);
    s.addColorStop(0, "#a9825e"); s.addColorStop(0.7, "#5a4029"); s.addColorStop(1, "#120d0a");
    x.fillStyle = s; x.beginPath(); x.ellipse(w * 0.5, h * 0.5, w * 0.2, h * 0.34, 0, 0, 7); x.fill();
    x.fillStyle = "rgba(230,200,160,.35)";
    x.beginPath(); x.ellipse(w * 0.4, h * 0.4, w * 0.06, h * 0.12, 0, 0, 7); x.fill();
  },
  coast(x, w, h) {
    const sky = x.createLinearGradient(0, 0, 0, h * 0.55);
    sky.addColorStop(0, "#8a97a0"); sky.addColorStop(1, "#c8ccc9");
    x.fillStyle = sky; x.fillRect(0, 0, w, h * 0.55);
    const sea = x.createLinearGradient(0, h * 0.55, 0, h);
    sea.addColorStop(0, "#5f7379"); sea.addColorStop(1, "#2c3a3d");
    x.fillStyle = sea; x.fillRect(0, h * 0.55, w, h * 0.45);
    x.fillStyle = "#1c1a18"; x.beginPath();
    x.moveTo(0, h); x.lineTo(w * 0.28, h * 0.6); x.lineTo(w * 0.5, h); x.fill();
    x.fillStyle = "rgba(210,120,60,.55)"; x.beginPath(); x.arc(w * 0.2, h * 0.5, 10, 0, 7); x.fill();
  },
};

function applyTone(img: ImageData, t: Tone): ImageData {
  const d = img.data;
  const [lr, lg, lb] = t.lift, [gr, gg, gb] = t.gain, { sat, temp } = t;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i] * gr + lr, g = d[i + 1] * gg + lg, b = d[i + 2] * gb + lb;
    r += temp * 40; b -= temp * 40;
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    r = l + (r - l) * sat; g = l + (g - l) * sat; b = l + (b - l) * sat;
    d[i] = clamp(r); d[i + 1] = clamp(g); d[i + 2] = clamp(b);
  }
  return img;
}
const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

/** Render a placeholder still to a data URL. Browser-only (needs canvas). */
export function placeholderStill(tone: Tone, w = 960, h = 540): string {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const x = c.getContext("2d");
  if (!x) return "";
  SCENES[tone.scene](x, w, h);
  const im = x.getImageData(0, 0, w, h);
  applyTone(im, tone);
  x.putImageData(im, 0, 0);
  return c.toDataURL();
}

/** CSS gradient roughly matching a tone — used for the tiny reel chips (SSR-safe). */
export function chipGradient(t: Tone): string {
  const m = (v: number) => Math.max(0, Math.min(255, v));
  const a = `rgb(${m(120 * t.gain[0] + t.lift[0] + t.temp * 40)},${m(110 * t.gain[1] + t.lift[1])},${m(100 * t.gain[2] + t.lift[2] - t.temp * 40)})`;
  const b = `rgb(${m(55 * t.gain[0] + t.lift[0])},${m(50 * t.gain[1] + t.lift[1])},${m(65 * t.gain[2] + t.lift[2])})`;
  return `linear-gradient(135deg, ${a}, ${b})`;
}
