import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const TEAM_PATH = join(process.cwd(), "lib", "team.json");
type Params = { params: { slug: string } };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated = await req.json();
  const team: { slug: string }[] = JSON.parse(readFileSync(TEAM_PATH, "utf-8"));
  const idx = team.findIndex((m) => m.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  team[idx] = { ...team[idx], ...updated };
  writeFileSync(TEAM_PATH, JSON.stringify(team, null, 2));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const team: { slug: string }[] = JSON.parse(readFileSync(TEAM_PATH, "utf-8"));
  const filtered = team.filter((m) => m.slug !== params.slug);
  if (filtered.length === team.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  writeFileSync(TEAM_PATH, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ ok: true });
}
