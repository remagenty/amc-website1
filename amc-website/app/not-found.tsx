import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-amc-cream px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo-amc.png"
            alt="AMC — Alpes Matériel Compact"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl font-black text-amc-text mb-3">
          Page introuvable
        </h1>

        {/* Sous-titre */}
        <p className="text-amc-text-secondary text-base leading-relaxed mb-10">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-outline rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2 justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour à l&apos;accueil
          </Link>
          <Link href="/catalogue" className="btn-primary rounded-xl px-6 py-3 inline-flex items-center gap-2 justify-center">
            Voir le catalogue
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
