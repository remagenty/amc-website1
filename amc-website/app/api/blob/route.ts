import { NextRequest, NextResponse } from "next/server";

// Public proxy for private Vercel Blob images.
// Stored URLs look like /api/blob?src=<encoded-blob-url>
// This route fetches the blob server-side using BLOB_READ_WRITE_TOKEN
// and streams it to the client with aggressive caching.

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) return new NextResponse("Missing src", { status: 400 });

  // Validate the URL is from Vercel Blob to prevent proxy abuse
  let blobUrl: URL;
  try {
    blobUrl = new URL(src);
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }
  if (!blobUrl.hostname.endsWith(".blob.vercel-storage.com")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return new NextResponse("Storage not configured", { status: 503 });

  const upstream = await fetch(src, {
    headers: { Authorization: `Bearer ${token}` },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: { revalidate: 31536000 } as any,
  });

  if (!upstream.ok) {
    return new NextResponse("Blob not found", { status: upstream.status });
  }

  const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
  const body = upstream.body;
  if (!body) return new NextResponse("Empty blob", { status: 502 });

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
