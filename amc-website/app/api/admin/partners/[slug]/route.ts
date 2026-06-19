import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export type PartnerOverride = {
  slug: string;
  name?: string;
  description?: string;
  tagline?: string;
  logo?: string | null;
  heroImage?: string | null;
  website?: string;
  stats?: Array<{ value: string; label: string }>;
};

type Params = { params: { slug: string } };

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

async function getPartners(): Promise<Record<string, PartnerOverride>> {
  return (await kvGet<Record<string, PartnerOverride>>("partners")) ?? {};
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const partners = await getPartners();
  return NextResponse.json(partners[params.slug] ?? { slug: params.slug });
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as PartnerOverride;
  const partners = await getPartners();
  partners[params.slug] = { ...partners[params.slug], ...body, slug: params.slug };
  await kvSet("partners", partners);
  return NextResponse.json({ ok: true });
}
