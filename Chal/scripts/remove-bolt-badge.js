import fs from "fs";
import path from "path";

const OUT_DIRS = ["dist", "build", "public"];
const BADGE_RE = /<script[^>]*src="https:\/\/bolt\.new\/badge\.js[^"]*"[^>]*>\s*<\/script>/g;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

let changed = 0;

for (const out of OUT_DIRS) {
  const abs = path.resolve(out);
  const files = walk(abs).filter((f) => f.endsWith(".html"));
  for (const f of files) {
    const html = fs.readFileSync(f, "utf8");
    const next = html.replace(BADGE_RE, "");
    if (next !== html) {
      fs.writeFileSync(f, next, "utf8");
      changed++;
      console.log(`Removed Bolt badge from: ${f}`);
    }
  }
}

if (changed === 0) {
  console.log("No Bolt badge script found.");
}
