import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const TEAM_PATH = join(process.cwd(), "lib", "team.json");

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const team = JSON.parse(readFileSync(TEAM_PATH, "utf-8"));
  return NextResponse.json(team);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const member = await req.json();
  const team = JSON.parse(readFileSync(TEAM_PATH, "utf-8"));
  team.push(member);
  writeFileSync(TEAM_PATH, JSON.stringify(team, null, 2));
  return NextResponse.json({ ok: true, member });
}
