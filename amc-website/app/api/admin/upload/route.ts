import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Upload désactivé — BLOB_READ_WRITE_TOKEN non configuré. Utilisez le champ URL pour coller un chemin d'image existant." },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  const name = (file as File).name ?? `upload-${Date.now()}`;
  const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "avif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: "Format invalide — JPG, PNG, WebP ou AVIF uniquement" }, { status: 400 });
  }

  const filename = `admin/${Date.now()}-${name.replace(/[^a-z0-9.\-_]/gi, "_")}`;

  try {
    const blob = await put(filename, file, { access: "private" });
    // Return a proxy URL so the image is publicly accessible on the site
    // without exposing the private blob URL or the read/write token.
    const proxyUrl = `/api/blob?src=${encodeURIComponent(blob.url)}`;
    return NextResponse.json({ url: proxyUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erreur Vercel Blob inconnue";
    console.error("[upload] Vercel Blob error:", msg);
    return NextResponse.json({ error: `Erreur upload : ${msg}` }, { status: 500 });
  }
}
