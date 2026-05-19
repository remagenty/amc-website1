import Link from "next/link";
import { SEBadge } from "@/components/ui/SEBadge";
import { FooterNewsletter } from "@/components/ui/FooterNewsletter";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconLinkedIn,
  IconFacebook,
  IconYoutube,
  IconArrowRight,
} from "@/components/ui/Icons";

const FOOTER_LINKS = {
  materiels: [
    { label: "Compacteurs & Rouleaux", href: "/catalogue?categorie=compacteurs" },
    { label: "Dumpers articulés", href: "/catalogue?categorie=dumpers" },
    { label: "Pelles compactes", href: "/catalogue?categorie=pelles" },
    { label: "Télescopiques rotatifs", href: "/catalogue?categorie=telescopiques" },
    { label: "Outils de démolition", href: "/catalogue?categorie=demolition" },
    { label: "Matériel neuf", href: "/catalogue?etat=neuf" },
    { label: "Matériel occasion", href: "/occasion" },
  ],
  services: [
    { label: "Service Après-Vente", href: "/services#sav" },
    { label: "Pièces détachées", href: "/services#pieces" },
    { label: "Maintenance préventive", href: "/services#maintenance" },
    { label: "Devis en ligne", href: "/contact?type=devis" },
    { label: "Financement", href: "/services#financement" },
  ],
  entreprise: [
    { label: "Qui sommes-nous", href: "/a-propos" },
    { label: "Wacker Neuson", href: "/partenaires/wacker-neuson" },
    { label: "Magni", href: "/partenaires/magni" },
    { label: "Promove Demolition", href: "/partenaires/promove-demolition" },
    { label: "Certification SE+", href: "/services#certification" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-amc-gray text-white" role="contentinfo">
      <div className="container-amc pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Col 1: AMC */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5" aria-label="AMC - Alpes Matériel Compact">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amc-yellow flex-shrink-0">
                <span className="text-amc-text font-black text-xl tracking-tight">AMC</span>
              </div>
              <div>
                <div className="font-bold text-white text-sm leading-none">Alpes Matériel</div>
                <div className="font-bold text-white text-sm leading-none">Compact</div>
              </div>
            </Link>

            <address className="not-italic space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-2">
                <IconMapPin size={16} className="mt-0.5 flex-shrink-0 text-amc-yellow" />
                <span>
                  ZAC D&apos;Orsan<br />
                  330 Rue du Mont Blanc<br />
                  74540 Saint-Félix<br />
                  Haute-Savoie
                </span>
              </div>
              <a href="tel:+33450000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <IconPhone size={16} className="text-amc-yellow flex-shrink-0" />
                +33 (0)4 50 00 00 00
              </a>
              <a href="mailto:contact@amc-savoie.fr" className="flex items-center gap-2 hover:text-white transition-colors">
                <IconMail size={16} className="text-amc-yellow flex-shrink-0" />
                contact@amc-savoie.fr
              </a>
              <div className="flex items-start gap-2">
                <IconClock size={16} className="mt-0.5 flex-shrink-0 text-amc-yellow" />
                <span>
                  Lun–Ven: 8h–12h / 14h–18h<br />
                  Sam: 8h–12h
                </span>
              </div>
            </address>

            <div className="mt-5">
              <SEBadge size="sm" />
            </div>
          </div>

          {/* Col 2: Matériels */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Nos matériels
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.materiels.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-amc-yellow transition-colors flex items-center gap-1 group"
                  >
                    <IconArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-amc-yellow" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Nos services
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-amc-yellow transition-colors flex items-center gap-1 group"
                  >
                    <IconArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-amc-yellow" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Entreprise */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
              L'entreprise
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.entreprise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-amc-yellow transition-colors flex items-center gap-1 group"
                  >
                    <IconArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-amc-yellow" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Réseaux sociaux + partenaires */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Suivez-nous
            </h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-amc-yellow hover:text-amc-text text-white/70 transition-all"
                aria-label="LinkedIn AMC"
              >
                <IconLinkedIn size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-amc-yellow hover:text-amc-text text-white/70 transition-all"
                aria-label="Facebook AMC"
              >
                <IconFacebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-amc-yellow hover:text-amc-text text-white/70 transition-all"
                aria-label="YouTube AMC"
              >
                <IconYoutube size={18} />
              </a>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
                Nos partenaires
              </h4>
              <div className="space-y-2 text-sm text-white/70">
                <Link href="/partenaires/wacker-neuson" className="block hover:text-amc-yellow transition-colors">
                  Wacker Neuson
                </Link>
                <Link href="/partenaires/magni" className="block hover:text-amc-yellow transition-colors">
                  Magni
                </Link>
                <Link href="/partenaires/promove-demolition" className="block hover:text-amc-yellow transition-colors">
                  Promove Demolition
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter — masquée sur /partenaires/* (doublon avec le bloc blanc de ces pages) */}
        <FooterNewsletter />

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© 2026 AMC — Alpes Matériel Compact. Tous droits réservés.</p>
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
