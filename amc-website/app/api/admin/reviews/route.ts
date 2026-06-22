import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export const dynamic = "force-dynamic";

type Review = {
  id: string;
  name: string;
  initials: string;
  text: string;
  date: string;
  rating: number;
  visible: boolean;
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Omit<Review, "id">;
  const review: Review = { ...body, id: crypto.randomUUID() };
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  reviews.push(review);
  await kvSet("reviews", reviews);
  return NextResponse.json({ ok: true, review });
}
