import fs from "node:fs";
import path from "node:path";

const distIndex = path.join(process.cwd(), "dist", "index.html");

if (!fs.existsSync(distIndex)) {
  console.log("[remove-bolt-badge] dist/index.html not found:", distIndex);
  process.exit(0);
}

let html = fs.readFileSync(distIndex, "utf8");

html = html.replace(
  /<script\b[^>]*src=["']https:\/\/bolt\.new\/badge\.js[^"']*["'][^>]*>\s*<\/script>\s*/gi,
  ""
);

fs.writeFileSync(distIndex, html, "utf8");
console.log("[remove-bolt-badge] cleaned dist/index.html");
