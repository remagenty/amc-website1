import { createClient } from "@vercel/kv";

function makeClient() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return createClient({ url, token });
}

let _client: ReturnType<typeof makeClient> | undefined;
function c() {
  if (_client === undefined) _client = makeClient();
  return _client;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  return c()?.get<T>(key) ?? null;
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  const client = c();
  if (!client) throw new Error("KV not configured (missing KV_REST_API_URL / KV_REST_API_TOKEN)");
  await client.set(key, value);
}

export async function kvDel(key: string): Promise<void> {
  await c()?.del(key);
}

export function kvAvailable(): boolean {
  return c() !== null;
}
