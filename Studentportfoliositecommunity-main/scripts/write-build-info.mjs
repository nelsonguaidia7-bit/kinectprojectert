/**
 * Writes dist/build-info.json after Vite build (version, time, git SHA for CI/CD).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

if (!fs.existsSync(dist)) {
  console.error("dist/ missing; run `vite build` first.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

let gitSha =
  process.env.GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.CF_PAGES_COMMIT_SHA ||
  null;

if (!gitSha) {
  try {
    gitSha = execSync("git rev-parse HEAD", { cwd: root, encoding: "utf8" }).trim();
  } catch {
    gitSha = null;
  }
}

const info = {
  name: pkg.name,
  version: pkg.version,
  builtAt: new Date().toISOString(),
  gitSha,
  gitRef: process.env.GITHUB_REF || null,
  node: process.version,
};

fs.writeFileSync(path.join(dist, "build-info.json"), JSON.stringify(info, null, 2) + "\n");
console.log("Wrote dist/build-info.json");
