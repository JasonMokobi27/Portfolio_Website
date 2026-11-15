/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* AVIF first: at a given quality it is a good deal smaller than WebP, so
       the stills can be encoded high and still arrive quickly. */
    formats: ["image/avif", "image/webp"],
    /* The optimizer only honours qualities listed here. 75 is the Next default
       and stays for anything that doesn't ask; the stills ask for more. The
       grade is the work on this site, so banding and mushy shadows in a dark
       frame are the one thing it cannot afford. */
    qualities: [75, 94],
    /* 2560 so a 1300px frame on a 2x display is served at its true size rather
       than being rounded up to 3840 and wasting bandwidth, or down to 2048 and
       being upscaled. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    remotePatterns: [{ protocol: "https", hostname: "image.mux.com" }],
  },
};
export default nextConfig;
