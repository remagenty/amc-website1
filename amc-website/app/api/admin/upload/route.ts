import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifyToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Accept both static token and OIDC-based authentication (Vercel auto-injects)
  const hasCredentials =
    !!process.env.BLOB_READ_WRITE_TOKEN ||
    (!!process.env.VERCEL_OIDC_TOKEN && !!process.env.BLOB_STORE_ID);

  if (!hasCredentials) {
    return NextResponse.json(
      {
        error:
          "Upload désactivé — BLOB_READ_WRITE_TOKEN non configuré. " +
          "Utilisez le champ URL pour coller un chemin d'image existant.",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Impossible de lire le formulaire" }, { status: 400 });
  }

  const file = formData.get("file");

  // Robust check that doesn't rely on cross-runtime instanceof Blob
  if (!file || typeof (file as Blob).arrayBuffer !== "function") {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  const fileBlob = file as File;
  const name = fileBlob.name ?? `upload-${Date.now()}.jpg`;
  const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp", "avif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json(
      { error: `Format invalide (${ext}) — JPG, PNG, WebP ou AVIF uniquement` },
      { status: 400 }
    );
  }

  const filename = `admin/${Date.now()}-${name.replace(/[^a-z0-9.\-_]/gi, "_")}`;

  try {
    // Convert to ArrayBuffer first to avoid cross-runtime stream issues
    const buffer = await fileBlob.arrayBuffer();
    const blob = await put(filename, buffer, {
      access: "private",
      contentType: fileBlob.type || "image/jpeg",
    });
    // Return a proxy URL so images are publicly accessible on the site
    const proxyUrl = `/api/blob?src=${encodeURIComponent(blob.url)}`;
    return NextResponse.json({ url: proxyUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[upload] Vercel Blob error:", msg);
    return NextResponse.json({ error: `Erreur Blob : ${msg}` }, { status: 500 });
  }
}
