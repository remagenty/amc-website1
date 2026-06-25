import { NextRequest, NextResponse } from "next/server";
import { kvGet, kvSet } from "@/lib/kv";

const SECRET = "EKR9FGNfuuVAn4WvFofh4PmI0WR3gQAO";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("token") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await kvGet<Record<string, unknown>>("site-content");
    if (!content) return NextResponse.json({ error: "site-content not found in KV" }, { status: 404 });

    const slides = content.heroSlides as Array<Record<string, unknown>>;
    const slide3 = slides?.find((s) => s.id === "slide-3");
    if (!slide3) return NextResponse.json({ error: "slide-3 not found" }, { status: 404 });

    const before = slide3.image;
    slide3.image = "/images/sav-sur-terrain.jpg";
    await kvSet("site-content", content);

    return NextResponse.json({ success: true, before, after: slide3.image });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
