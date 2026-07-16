import { NextRequest, NextResponse } from "next/server";
import { createToken, COOKIE_NAME, cookieOptions } from "@/lib/admin/auth";

type AdminUser = { email: string; password: string };

function getAdminUsers(): AdminUser[] {
  const users: AdminUser[] = [];

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    users.push({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  }

  if (process.env.ADMIN_USERS) {
    try {
      const extra = JSON.parse(process.env.ADMIN_USERS) as AdminUser[];
      if (Array.isArray(extra)) users.push(...extra);
    } catch {
      // malformed JSON — ignore
    }
  }

  return users;
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));

  const users = getAdminUsers();

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
