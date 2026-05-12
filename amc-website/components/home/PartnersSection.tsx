import Link from "next/link";
import { BRANDS } from "@/lib/data";
import { IconArrowRight, IconExternalLink } from "@/components/ui/Icons";

export function PartnersSection() {
  return (
    <section
      className="bg-amc-gray section-padding"
      aria-labelledby="partners-title"
    >
      <div className="container-amc">
        <div className="text-center mb-12">
          <h2 id="partners-title" className="section-title text-white">
            Nos partenaires officiels
          </h2>
          <p className="section-subtitle text-white/70 mx-auto mt-4">
            AMC est distributeur agréé des plus grandes marques de matériels de chantier.
            Garantie constructeur, support technique et gammes complètes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amc-yellow/40 transition-all duration-300 group"
            >
              {/* Brand logo placeholder */}
              <div className="h-16 flex items-center mb-6">
                <div className="text-2xl font-black text-amc-yellow tracking-tight">
                  {brand.name}
                </div>
              </div>

              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amc-yellow text-amc-text">
                  Partenaire officiel
                </span>
              </div>

              <p className="text-white/70 text-sm leading-relaxed mt-3 mb-6">
                {brand.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">
                  {brand.productCount} références disponibles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label={`Site officiel ${brand.name}`}
                  >
                    <IconExternalLink size={14} />
                  </a>
                  <Link
                    href={`/partenaires/${brand.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amc-yellow hover:text-white transition-colors group-hover:gap-2"
                  >
                    Découvrir
                    <IconArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/catalogue" className="btn-outline rounded-lg">
            Voir tout le catalogue <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
