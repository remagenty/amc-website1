import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import teamFallback from "@/lib/team.json";

type Member = { slug: string; name: string; role: string; initials: string; description: string; photo: string | null };
type Params = { params: { slug: string } };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getTeam(): Promise<Member[]> {
  return (await kvGet<Member[]>("team")) ?? (teamFallback as Member[]);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated = await req.json() as Member;
  const team = await getTeam();
  const idx = team.findIndex((m) => m.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  team[idx] = { ...team[idx], ...updated };
  await kvSet("team", team);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const team = await getTeam();
  const filtered = team.filter((m) => m.slug !== params.slug);
  if (filtered.length === team.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await kvSet("team", filtered);
  return NextResponse.json({ ok: true });
}
