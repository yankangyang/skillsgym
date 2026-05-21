import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = fileURLToPath(new URL("../../", import.meta.url));
const repoRoot = path.resolve(backendRoot, "..");

export async function readRepoJson<T>(relativePath: string): Promise<T> {
  const absolutePath = path.join(repoRoot, relativePath);
  const raw = await readFile(absolutePath, "utf-8");
  return JSON.parse(raw) as T;
}

