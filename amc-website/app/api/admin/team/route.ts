import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import teamFallback from "@/lib/team.json";

type Member = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  description: string;
  photo: string | null;
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getTeam(): Promise<Member[]> {
  return (await kvGet<Member[]>("team")) ?? (teamFallback as Member[]);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getTeam());
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const member = await req.json() as Member;
  const team = await getTeam();
  team.push(member);
  await kvSet("team", team);
  return NextResponse.json({ ok: true, member });
}
