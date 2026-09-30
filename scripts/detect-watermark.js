const sharp = require("sharp");

const path = require("path");

const dir = path.join(__dirname, "..", "public", "sequence");
const frameCount = 300;
const sample = [];
for (let i = 1; i <= frameCount; i += 10) sample.push(i);

(async () => {
  const first = sharp(path.join(dir, "ezgif-frame-001.jpg"));
  const meta = await first.metadata();
  const W = meta.width, H = meta.height;
  console.log(`Frame size: ${W}x${H}, sampled ${sample.length} frames`);

  const acc = new Float64Array(W * H);
  const acc2 = new Float64Array(W * H);
  const n = sample.length;

  for (const i of sample) {
    const file = path.join(dir, `ezgif-frame-${String(i).padStart(3, "0")}.jpg`);
    const { data } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
    for (let p = 0; p < W * H; p++) { acc[p] += data[p]; acc2[p] += data[p] * data[p]; }
  }

  const mean = new Float64Array(W * H);
  const std = new Float64Array(W * H);
  for (let p = 0; p < W * H; p++) {
    mean[p] = acc[p] / n;
    std[p] = Math.sqrt(Math.max(0, acc2[p] / n - mean[p] * mean[p]));
  }

  // static & bright pixels = watermark candidates
  let minX = W, minY = H, maxX = -1, maxY = -1, count = 0;
  const MEAN_T = 40, STD_T = 4;
  const mask = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (std[p] < STD_T && mean[p] > MEAN_T) {
        mask[p] = 1; count++;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`Static bright pixels: ${count} (${((count / (W * H)) * 100).toFixed(2)}%)`);
  console.log(`Bounding box: x=${minX}..${maxX}, y=${minY}..${maxY}`);
  console.log(`Box size: ${maxX - minX + 1}x${maxY - minY + 1}, right margin: ${W - 1 - maxX}, bottom margin: ${H - 1 - maxY}`);

  // Save mask visualization
  const vis = Buffer.alloc(W * H);
  for (let p = 0; p < W * H; p++) vis[p] = mask[p] ? 255 : 0;
  await sharp(vis, { raw: { width: W, height: H, channels: 1 } }).png().toFile(path.join(__dirname, "watermark-mask.png"));
  console.log("Mask saved to scripts/watermark-mask.png");
})();
