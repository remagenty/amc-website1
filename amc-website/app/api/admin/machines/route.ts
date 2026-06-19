import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import catalogueWN from "@/lib/catalogue_wacker_neuson.json";
import catalogueMagni from "@/lib/catalogue_magni.json";
import cataloguePromove from "@/lib/catalogue_promove.json";

type MachineRaw = Record<string, unknown>;
type Catalogue = { machines: MachineRaw[] };

const BRAND_KEYS: Record<string, string> = {
  "wacker-neuson": "catalogue:wacker_neuson",
  magni: "catalogue:magni",
  "promove-demolition": "catalogue:promove",
};

const FALLBACK: Record<string, { machines: MachineRaw[] }> = {
  "wacker-neuson": catalogueWN as { machines: MachineRaw[] },
  magni: catalogueMagni as unknown as { machines: MachineRaw[] },
  "promove-demolition": cataloguePromove as unknown as { machines: MachineRaw[] },
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getCatalogue(brand: string): Promise<Catalogue> {
  const key = BRAND_KEYS[brand];
  const data = key ? await kvGet<Catalogue>(key) : null;
  return data ?? FALLBACK[brand] ?? { machines: [] };
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const results = await Promise.all(
    Object.keys(BRAND_KEYS).map(async (brand) => {
      const cat = await getCatalogue(brand);
      return cat.machines.map((m) => ({ ...m, _brand: brand }));
    })
  );
  return NextResponse.json(results.flat());
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { _brand, ...machine } = body as MachineRaw & { _brand: string };
  const key = BRAND_KEYS[_brand];
  if (!key) return NextResponse.json({ error: "Invalid brand" }, { status: 400 });

  const cat = await getCatalogue(_brand);
  cat.machines.push(machine);
  await kvSet(key, cat);
  return NextResponse.json({ ok: true, machine });
}
