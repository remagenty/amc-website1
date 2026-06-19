import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const CATALOGUE_PATHS: Record<string, string> = {
  "wacker-neuson": join(process.cwd(), "lib", "catalogue_wacker_neuson.json"),
  magni: join(process.cwd(), "lib", "catalogue_magni.json"),
  "promove-demolition": join(process.cwd(), "lib", "catalogue_promove.json"),
};

function readAll() {
  return Object.entries(CATALOGUE_PATHS).flatMap(([brand, path]) => {
    try {
      const data = JSON.parse(readFileSync(path, "utf-8"));
      return (data.machines ?? []).map((m: Record<string, unknown>) => ({ ...m, _brand: brand }));
    } catch {
      return [];
    }
  });
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const machines = readAll();
  return NextResponse.json(machines);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { _brand, ...machine } = body;
  const brandKey = _brand as string;
  const path = CATALOGUE_PATHS[brandKey];
  if (!path) return NextResponse.json({ error: "Invalid brand" }, { status: 400 });

  const data = JSON.parse(readFileSync(path, "utf-8"));
  data.machines = [...(data.machines ?? []), machine];
  writeFileSync(path, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true, machine });
}
