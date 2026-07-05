"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV = [
  {
    href: "/admin/machines",
    label: "Machines",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    href: "/admin/equipe",
    label: "Équipe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    href: "/admin/actualites",
    label: "Actualités & Expertise",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    href: "/admin/avis",
    label: "Avis clients",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
  },
  {
    href: "/admin/partenaires",
    label: "Partenaires",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 11l-4 4-2-2"/>
      </svg>
    ),
  },
  {
    href: "/admin/contenus",
    label: "Textes & Contenus",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
  },
  {
    href: "/admin/import",
    label: "Import données",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <aside className="flex flex-col h-full bg-[#1a1a1a] text-white w-56 flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <Image src="/images/LOGO-AMC-ORANGE-site-web.png" alt="AMC" width={100} height={19} className="object-contain brightness-0 invert" />
        <p className="text-xs text-white/40 mt-1">Administration</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-0.5 px-2">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#ffd500] text-gray-900"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={active ? "text-gray-900" : "text-white/50"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-white/10">
        <button
          onClick={logout}
          disabled={loggingOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {loggingOut ? "Déconnexion…" : "Déconnexion"}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex h-screen sticky top-0">{sidebar}</div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-[#1a1a1a] text-white rounded-lg shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-56 flex flex-col">
              {sidebar}
            </div>
          </>
        )}
      </div>
    </>
  );
}
