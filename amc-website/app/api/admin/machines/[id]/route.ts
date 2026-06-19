import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const CATALOGUE_PATHS: Record<string, string> = {
  "wacker-neuson": join(process.cwd(), "lib", "catalogue_wacker_neuson.json"),
  magni: join(process.cwd(), "lib", "catalogue_magni.json"),
  "promove-demolition": join(process.cwd(), "lib", "catalogue_promove.json"),
};

type Params = { params: { id: string } };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

function findMachine(id: string) {
  for (const [brand, path] of Object.entries(CATALOGUE_PATHS)) {
    const data = JSON.parse(readFileSync(path, "utf-8"));
    const idx = (data.machines ?? []).findIndex((m: { id: string }) => m.id === id);
    if (idx !== -1) return { brand, path, data, idx };
  }
  return null;
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const found = findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...found.data.machines[found.idx], _brand: found.brand });
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { _brand, ...updated } = body;

  const found = findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.data.machines[found.idx] = { ...found.data.machines[found.idx], ...updated };
  writeFileSync(found.path, JSON.stringify(found.data, null, 2));
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const found = findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.data.machines[found.idx] = { ...found.data.machines[found.idx], ...body };
  writeFileSync(found.path, JSON.stringify(found.data, null, 2));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const found = findMachine(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  found.data.machines.splice(found.idx, 1);
  writeFileSync(found.path, JSON.stringify(found.data, null, 2));
  return NextResponse.json({ ok: true });
}
