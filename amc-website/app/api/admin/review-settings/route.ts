import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export const dynamic = "force-dynamic";

type ReviewSettings = {
  globalRating: number;
};

const DEFAULT_SETTINGS: ReviewSettings = { globalRating: 4.6 };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await kvGet<ReviewSettings>("review-settings") ?? DEFAULT_SETTINGS;
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as ReviewSettings;
  await kvSet("review-settings", body);
  return NextResponse.json({ ok: true });
}
