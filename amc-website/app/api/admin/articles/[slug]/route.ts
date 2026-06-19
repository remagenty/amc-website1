import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import type { AdminArticle } from "../route";

type Params = { params: { slug: string } };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getArticles(): Promise<AdminArticle[]> {
  return (await kvGet<AdminArticle[]>("articles")) ?? [];
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const updated = await req.json() as AdminArticle;
  const articles = await getArticles();
  const idx = articles.findIndex((a) => a.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  articles[idx] = { ...articles[idx], ...updated };
  await kvSet("articles", articles);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const articles = await getArticles();
  const filtered = articles.filter((a) => a.slug !== params.slug);
  if (filtered.length === articles.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await kvSet("articles", filtered);
  return NextResponse.json({ ok: true });
}
