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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  const review = reviews.find((r) => r.id === params.id);
  if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(review);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Review;
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  const idx = reviews.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  reviews[idx] = { ...body, id: params.id };
  await kvSet("reviews", reviews);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Partial<Review>;
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  const idx = reviews.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  reviews[idx] = { ...reviews[idx], ...body, id: params.id };
  await kvSet("reviews", reviews);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const reviews = await kvGet<Review[]>("reviews") ?? [];
  const filtered = reviews.filter((r) => r.id !== params.id);
  if (filtered.length === reviews.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await kvSet("reviews", filtered);
  return NextResponse.json({ ok: true });
}
