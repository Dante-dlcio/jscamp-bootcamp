import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const isAscending = args.includes("--asc");
const isDescending = args.includes("--desc");
const onlyFiles = args.includes("--files");
const onlyFolders = args.includes("--folders");

const directory = args.find((arg) => !arg.startsWith("--")) ?? ".";

let entries;
try {
  entries = await readdir(directory);
} catch (error) {
  console.error(`no se pudo leer el directorio ${directory} ${error.message}`);
  process.exit(1);
}

async function getEntryInfo(entry) {
  const route = join(directory, entry);
  const info = await stat(route);
  return {
    name: entry,
    isDirectory: info.isDirectory(),
    size: info.size,
  };
}

let entriesInfo = await Promise.all(entries.map(getEntryInfo));

function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

if (isAscending) {
  entriesInfo.sort((a, b) => a.name.localeCompare(b.name));
} else if (isDescending) {
  entriesInfo.sort((a, b) => b.name.localeCompare(a.name));
}

if (onlyFiles) {
  entriesInfo = entriesInfo.filter((entry) => !entry.isDirectory);
} else if (onlyFolders) {
  entriesInfo = entriesInfo.filter((entry) => entry.isDirectory);
}

entriesInfo.forEach((entry) => {
  const icon = entry.isDirectory ? "📁" : "📄";
  const size = entry.isDirectory ? "-" : formatSize(entry.size);
  const paddedName = entry.name.padEnd(30);
  const paddedSize = size.padStart(10);

  console.log(`${icon} ${paddedName} ${paddedSize}`);
});
