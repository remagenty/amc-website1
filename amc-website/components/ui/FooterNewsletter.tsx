"use client";

import { usePathname } from "next/navigation";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function FooterNewsletter() {
  const pathname = usePathname();
  if (pathname.startsWith("/partenaires/")) return null;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="bg-white/5 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="font-bold text-white">Restez informé des nouveaux matériels</p>
          <p className="text-sm text-white/60 mt-1">Recevez nos actualités et nouveautés en avant-première</p>
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}
