import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import catalogueWN from "@/lib/catalogue_wacker_neuson.json";
import catalogueMagni from "@/lib/catalogue_magni.json";
import cataloguePromove from "@/lib/catalogue_promove.json";

type MachineRaw = Record<string, unknown>;
type Catalogue = { machines: MachineRaw[] };
type Params = { params: { id: string } };

const BRAND_KEYS: Record<string, string> = {
  "wacker-neuson": "catalogue:wacker_neuson",
  magni: "catalogue:magni",
  "promove-demolition": "catalogue:promove",
};

const FALLBACK: Record<string, Catalogue> = {
  "wacker-neuson": catalogueWN as Catalogue,
  magni: catalogueMagni as unknown as Catalogue,
  "promove-demolition": cataloguePromove as unknown as Catalogue,
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

async function findMachine(id: string): Promise<{ brand: string; kvKey: string; cat: Catalogue; idx: number } | null> {
  for (const [brand, kvKey] of Object.entries(BRAND_KEYS)) {
    const cat = await getCatalogue(brand);
    const idx = cat.machines.findIndex((m) => (m as { id?: string }).id === id);
    if (idx !== -1) return { brand, kvKey, cat, idx };
  }
  return null;
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const found = await findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...found.cat.machines[found.idx], _brand: found.brand });
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as MachineRaw & { _brand?: string };
  const { _brand, ...updated } = body;

  const found = _brand
    ? await (async () => {
        const cat = await getCatalogue(_brand);
        const idx = cat.machines.findIndex((m) => (m as { id?: string }).id === params.id);
        return idx !== -1 ? { brand: _brand, kvKey: BRAND_KEYS[_brand], cat, idx } : null;
      })()
    : await findMachine(params.id);

  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.cat.machines[found.idx] = { ...found.cat.machines[found.idx], ...updated };
  await kvSet(found.kvKey, found.cat);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as MachineRaw;
  const found = await findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.cat.machines[found.idx] = { ...found.cat.machines[found.idx], ...body };
  await kvSet(found.kvKey, found.cat);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const found = await findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.cat.machines.splice(found.idx, 1);
  await kvSet(found.kvKey, found.cat);
  return NextResponse.json({ ok: true });
}
