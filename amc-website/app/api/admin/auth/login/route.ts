import { NextRequest, NextResponse } from "next/server";
import { createToken, COOKIE_NAME, cookieOptions } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

type AdminUser = { email: string; password: string };

// Default secondary admins always available (no env var needed)
const EXTRA_ADMINS: AdminUser[] = [
  { email: "marketing@isermat.com", password: "AmcIsermatSecamat73!" },
];

async function getAllAdminUsers(): Promise<AdminUser[]> {
  const users: AdminUser[] = [];

  // Primary admin from env vars
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    users.push({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  }

  // Additional admins from ADMIN_USERS env var (JSON array)
  if (process.env.ADMIN_USERS) {
    try {
      const extra = JSON.parse(process.env.ADMIN_USERS) as AdminUser[];
      if (Array.isArray(extra)) users.push(...extra);
    } catch {
      // malformed JSON — ignore
    }
  }

  // Additional admins stored in KV
  const kvUsers = await kvGet<AdminUser[]>("admin_users");
  if (Array.isArray(kvUsers)) {
    users.push(...kvUsers);
  } else {
    // Seed KV with default extra admins on first run
    await kvSet("admin_users", EXTRA_ADMINS).catch(() => {});
    users.push(...EXTRA_ADMINS);
  }

  return users;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));

  const users = await getAllAdminUsers();

  if (users.length === 0) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  const match = users.find((u) => u.email === email && u.password === password);

  if (!match) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const token = await createToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, cookieOptions());
  return res;
}
