import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const PROJECT_KEYWORDS = [
  "project",
  "portfolio",
  "capstone",
  "showcase",
  "thesis",
  "assignment",
  "prototype",
];
const ACKERLY_KEYWORD = "ackerly";
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"]);
const TEXT_EXTENSIONS = new Set([".md", ".txt", ".json", ".ts", ".tsx", ".js", ".jsx", ".html", ".css"]);
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  ".cache",
  ".cursor",
  ".vscode",
  "__pycache__",
]);
const MAX_DEPTH = 4;
const MAX_REAL_ITEMS = 20;
const MAX_ACKERLY_ITEMS = 30;
const MAX_TEXT_FILE_SIZE_BYTES = 250_000;

function toTitle(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseRoots() {
  const defaultRoots = [path.join(os.homedir(), "Desktop"), path.join(os.homedir(), "Documents"), path.join(os.homedir(), "Downloads")];
  const custom = process.argv
    .slice(2)
    .filter(Boolean)
    .flatMap((entry) => entry.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set([...defaultRoots, ...custom])];
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function containsProjectKeyword(value) {
  const lower = value.toLowerCase();
  return PROJECT_KEYWORDS.some((keyword) => lower.includes(keyword));
}

function confidenceScore({ nameMatch, hasReadme, hasMedia }) {
  let score = 0;
  if (nameMatch) score += 0.55;
  if (hasReadme) score += 0.25;
  if (hasMedia) score += 0.2;
  return Number(score.toFixed(2));
}

async function readSnippet(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat.size > MAX_TEXT_FILE_SIZE_BYTES) return "";
    const raw = await fs.readFile(filePath, "utf8");
    return raw.replace(/\s+/g, " ").trim().slice(0, 180);
  } catch {
    return "";
  }
}

async function walkRoots(roots) {
  const realProjects = [];
  const ackerlyItems = [];
  const seenProjectPaths = new Set();
  const seenAckerlyPaths = new Set();

  for (const root of roots) {
    if (!(await exists(root))) continue;

    const queue = [{ dir: root, depth: 0 }];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      const { dir, depth } = current;
      let entries = [];

      try {
        entries = await fs.readdir(dir, { withFileTypes: true });
      } catch {
        continue;
      }

      const readme = entries.find((entry) => entry.isFile() && entry.name.toLowerCase().startsWith("readme"));
      const mediaCandidates = entries
        .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
        .slice(0, 4)
        .map((entry) => normalizePath(path.join(dir, entry.name)));

      const dirName = path.basename(dir);
      const projectNameMatch = containsProjectKeyword(dirName);
      const projectLooksUseful = projectNameMatch || Boolean(readme) || mediaCandidates.length > 0;

      if (projectLooksUseful && containsProjectKeyword(`${dirName} ${entries.map((e) => e.name).join(" ")}`)) {
        const key = normalizePath(dir);
        if (!seenProjectPaths.has(key)) {
          const readmePath = readme ? path.join(dir, readme.name) : "";
          const snippet = readmePath ? await readSnippet(readmePath) : "";
          let role = "Contributor";
          if (dirName.toLowerCase().includes("portfolio")) role = "Designer & Developer";
          if (dirName.toLowerCase().includes("capstone")) role = "Project Lead";

          realProjects.push({
            id: `real-${realProjects.length + 1}`,
            title: toTitle(dirName),
            category: "Discovered Student Project",
            description: snippet || `Discovered project folder at ${normalizePath(dir)}.`,
            coverImage: mediaCandidates[0] || "",
            images: mediaCandidates,
            author: {
              name: "Local Student Work",
              bio: "Automatically discovered from local project folders.",
              avatar: "",
            },
            details: {
              year: `${new Date().getFullYear()}`,
              role,
              tools: ["Local Filesystem"],
            },
            source: "real",
            sourcePath: normalizePath(dir),
            confidence: confidenceScore({
              nameMatch: projectNameMatch,
              hasReadme: Boolean(readme),
              hasMedia: mediaCandidates.length > 0,
            }),
          });
          seenProjectPaths.add(key);
        }
      }

      for (const entry of entries) {
        if (entry.isDirectory()) {
          if (depth >= MAX_DEPTH || IGNORE_DIRS.has(entry.name.toLowerCase())) continue;
          queue.push({ dir: path.join(dir, entry.name), depth: depth + 1 });
          continue;
        }

        const fullPath = path.join(dir, entry.name);
        const normalized = normalizePath(fullPath);
        const lowerName = entry.name.toLowerCase();

        if ((lowerName.includes(ACKERLY_KEYWORD) || normalized.toLowerCase().includes(ACKERLY_KEYWORD)) && !seenAckerlyPaths.has(normalized)) {
          const stat = await fs.stat(fullPath).catch(() => null);
          ackerlyItems.push({
            id: `ackerly-${ackerlyItems.length + 1}`,
            title: toTitle(entry.name.replace(path.extname(entry.name), "")),
            snippet: `Keyword match in file path: ${normalized}`,
            sourcePath: normalized,
            updatedAt: stat?.mtime?.toISOString?.() ?? "",
            source: "real",
          });
          seenAckerlyPaths.add(normalized);
        } else if (TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) && !seenAckerlyPaths.has(normalized)) {
          const stat = await fs.stat(fullPath).catch(() => null);
          if (!stat || stat.size > MAX_TEXT_FILE_SIZE_BYTES) continue;
          const text = await readSnippet(fullPath);
          if (text.toLowerCase().includes(ACKERLY_KEYWORD)) {
            ackerlyItems.push({
              id: `ackerly-${ackerlyItems.length + 1}`,
              title: toTitle(entry.name.replace(path.extname(entry.name), "")),
              snippet: text,
              sourcePath: normalized,
              updatedAt: stat.mtime.toISOString(),
              source: "real",
            });
            seenAckerlyPaths.add(normalized);
          }
        }
      }
    }
  }

  const sortedReal = realProjects.sort((a, b) => b.confidence - a.confidence).slice(0, MAX_REAL_ITEMS);
  const sortedAckerly = ackerlyItems
    .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
    .slice(0, MAX_ACKERLY_ITEMS);

  return { rootsScanned: roots.map(normalizePath), generatedAt: new Date().toISOString(), realProjects: sortedReal, ackerlyItems: sortedAckerly };
}

async function main() {
  const roots = parseRoots();
  const data = await walkRoots(roots);
  const outPath = path.resolve(process.cwd(), "src/app/data/discovered-projects.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Wrote ${data.realProjects.length} projects and ${data.ackerlyItems.length} Ackerly items to ${outPath}`);
}

main().catch((error) => {
  console.error("Discovery script failed:", error);
  process.exitCode = 1;
});
