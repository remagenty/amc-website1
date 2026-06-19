/**
 * Seed Vercel KV from local JSON catalogues and team data.
 *
 * Usage:
 *   KV_REST_API_URL=... KV_REST_API_TOKEN=... npx tsx scripts/seed-kv.ts
 *
 * Or create a .env.local with KV_REST_API_URL and KV_REST_API_TOKEN,
 * then run: npx tsx --env-file=.env.local scripts/seed-kv.ts
 *
 * Keys written:
 *   catalogue:wacker_neuson  → { machines: Machine[] }
 *   catalogue:magni          → { machines: Machine[] }
 *   catalogue:promove        → { machines: Machine[] }
 *   team                     → Member[]
 */

import { createClient } from "@vercel/kv";
import * as fs from "fs";
import * as path from "path";

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
  console.error("❌  Missing env vars: KV_REST_API_URL and KV_REST_API_TOKEN are required.");
  console.error("   Set them in .env.local and run:");
  console.error("   npx tsx --env-file=.env.local scripts/seed-kv.ts");
  process.exit(1);
}

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

const LIB = path.join(process.cwd(), "lib");

function readJson<T>(filename: string): T {
  const raw = fs.readFileSync(path.join(LIB, filename), "utf-8");
  return JSON.parse(raw) as T;
}

type Catalogue = { machines: unknown[] };

async function seedCatalogue(key: string, filename: string) {
  const data = readJson<Record<string, unknown>>(filename);
  const machines = data.machines as unknown[];
  const payload: Catalogue = { machines };
  await kv.set(key, payload);
  console.log(`✅  ${key}: ${machines.length} machines`);
}

async function main() {
  console.log("Seeding Vercel KV…\n");

  await seedCatalogue("catalogue:wacker_neuson", "catalogue_wacker_neuson.json");
  await seedCatalogue("catalogue:magni", "catalogue_magni.json");
  await seedCatalogue("catalogue:promove", "catalogue_promove.json");

  const team = readJson<unknown[]>("team.json");
  await kv.set("team", team);
  console.log(`✅  team: ${team.length} membres`);

  console.log("\nDone. KV keys written:");
  const keys = await kv.keys("*");
  keys.forEach((k) => console.log(`  • ${k}`));
}

main().catch((err) => {
  console.error("❌  Seeding failed:", err.message ?? err);
  process.exit(1);
});
