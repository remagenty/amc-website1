import Link from "next/link";
import { IconArrowRight, IconSearch } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-amc-cream">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-black text-amc-yellow mb-4">404</div>
        <h1 className="text-2xl font-bold text-amc-text mb-3">
          Page introuvable
        </h1>
        <p className="text-amc-text-secondary text-sm leading-relaxed mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Utilisez notre catalogue pour trouver le matériel dont vous avez besoin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/catalogue" className="btn-primary rounded-lg">
            <IconSearch size={16} />
            Explorer le catalogue
          </Link>
          <Link href="/" className="btn-secondary rounded-lg">
            Retour à l'accueil <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
