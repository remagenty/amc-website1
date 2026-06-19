import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export type AdminArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string | null;
  status: "published" | "draft";
  publishedAt: string;
  createdAt: string;
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getArticles(): Promise<AdminArticle[]> {
  return (await kvGet<AdminArticle[]>("articles")) ?? [];
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getArticles());
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const article = await req.json() as AdminArticle;
  const articles = await getArticles();
  if (articles.find((a) => a.slug === article.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }
  articles.unshift(article);
  await kvSet("articles", articles);
  return NextResponse.json({ ok: true, article });
}
