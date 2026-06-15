import type { Metadata } from "next";
import Link from "next/link";
import { getWnCategories } from "@/lib/wn-catalogue";
import { getMagniCategories } from "@/lib/magni-catalogue";
import { getPromoveCategories } from "@/lib/promove-catalogue";
import { IconArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Nos matériels",
  description:
    "Découvrez la gamme complète des matériels AMC : Wacker Neuson (mini-pelles, dumpers, compacteurs), Magni (téléhandlers) et Promove Demolition (brise-roches, cisailles, pinces). Distributeur officiel Rhône-Alpes.",
};

const WN_ICONS: Record<string, string> = {
  "mini-pelles": "⛏️", "dumpers": "🚛", "chargeuses": "🏗️", "compacteurs": "⚫",
  "plaques-vibrantes": "📳", "pilonneuses": "🔨", "marteaux-piqueurs": "🪛",
  "outillage": "🔧", "telescopiques": "🏢",
};
const MAGNI_ICONS: Record<string, string> = {
  "telehandlers-rotatifs": "🔄", "telehandlers-fixes": "🏗️", "telehandlers-agricoles": "🌾",
};
const PROMOVE_ICONS: Record<string, string> = {
  "brise-roches": "💥", "pinces-multiprocesseurs": "🦾", "pulverisateurs": "🧱",
  "cisailles": "✂️", "pinces-de-tri": "🗂️",
};

interface CategoryCardProps {
  slug: string;
  label: string;
  count: number;
  icon: string;
  description: string;
}

function CategoryCard({ slug, label, count, icon, description }: CategoryCardProps) {
  return (
    <Link
      href={`/materiels/${slug}`}
      className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-amc-yellow/10 flex items-center justify-center text-2xl group-hover:bg-amc-yellow/20 transition-colors">
          {icon}
        </div>
        <span className="text-xs text-amc-text-secondary bg-gray-100 px-2.5 py-1 rounded-full">
          {count} {count > 1 ? "machines" : "machine"}
        </span>
      </div>
      <h3 className="font-bold text-amc-text text-lg mb-1 group-hover:text-amc-yellow-dark transition-colors">
        {label}
      </h3>
      <p className="text-sm text-amc-text-secondary flex-1 mb-4">{description}</p>
      <div className="flex items-center gap-1 text-sm font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all">
        Voir la gamme <IconArrowRight size={14} />
      </div>
    </Link>
  );
}

interface BrandSectionProps {
  brand: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  partnerHref: string;
  categories: Array<{ slug: string; label: string; count: number }>;
  icons: Record<string, string>;
  categoryDesc: (slug: string) => string;
}

function BrandSection({ brand, badge, badgeColor, title, description, partnerHref, categories, icons, categoryDesc }: BrandSectionProps) {
  return (
    <section className="mb-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary bg-white px-3 py-1 rounded-full border border-gray-200">
              Distributeur officiel
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-amc-text">{title}</h2>
          <p className="text-amc-text-secondary text-sm mt-1 max-w-xl">{description}</p>
        </div>
        <Link href={partnerHref} className="shrink-0 text-sm font-semibold text-amc-yellow-dark hover:underline flex items-center gap-1">
          En savoir plus <IconArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.slug}
            slug={cat.slug}
            label={cat.label}
            count={cat.count}
            icon={icons[cat.slug] ?? "🔧"}
            description={categoryDesc(cat.slug)}
          />
        ))}
      </div>
    </section>
  );
}

export default function MaterielHubPage() {
  const wnCategories = getWnCategories();
  const magniCategories = getMagniCategories();
  const promoveCategories = getPromoveCategories();

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Nos matériels</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12">
        {/* Page header */}
        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black text-amc-text mb-4">
            Nos matériels de chantier
          </h1>
          <p className="text-amc-text-secondary leading-relaxed">
            AMC est distributeur officiel de trois marques complémentaires pour couvrir tous vos besoins en matériels de chantier : équipements compacts Wacker Neuson, téléhandlers Magni et outils de démolition Promove Demolition.
          </p>
          <div className="mt-4">
            <Link href="/catalogue" className="btn-secondary text-sm rounded-lg gap-2">
              <IconArrowRight size={14} />
              Voir tout le catalogue ({wnCategories.reduce((s, c) => s + c.count, 0) + magniCategories.reduce((s, c) => s + c.count, 0) + promoveCategories.reduce((s, c) => s + c.count, 0)} machines)
            </Link>
          </div>
        </div>

        {/* Wacker Neuson */}
        <BrandSection
          brand="wacker-neuson"
          badge="Wacker Neuson"
          badgeColor="bg-red-100 text-red-700"
          title="Équipements compacts Wacker Neuson"
          description="Leader mondial des équipements compacts de construction. Mini-pelles, dumpers, compacteurs, chargeuses et outillage — gamme complète avec SAV certifié SE+."
          partnerHref="/partenaires/wacker-neuson"
          categories={wnCategories}
          icons={WN_ICONS}
          categoryDesc={(slug) => {
            const descs: Record<string, string> = {
              "mini-pelles": "Gamme Wacker Neuson — matériels neufs, SAV certifié SE+",
              "dumpers": "Dumpers articulés — transport de matériaux sur chantier",
              "chargeuses": "Chargeuses compactes polyvalentes",
              "compacteurs": "Compacteurs tandem et à plaques",
              "plaques-vibrantes": "Plaques vibrantes tous terrains",
              "pilonneuses": "Pilonneuses pour compactage en profondeur",
              "marteaux-piqueurs": "Marteaux piqueurs et démolition",
              "outillage": "Outillage de sol et accessoires",
              "telescopiques": "Chariots télescopiques compacts",
            };
            return descs[slug] ?? "Gamme Wacker Neuson — matériels neufs, SAV certifié SE+";
          }}
        />

        {/* Magni */}
        <BrandSection
          brand="magni"
          badge="Magni"
          badgeColor="bg-blue-100 text-blue-700"
          title="Téléhandlers Magni"
          description="Spécialiste des chariots télescopiques rotatifs haute performance. Rotation 360°, grande hauteur et portée maximale pour les chantiers BTP et industriels."
          partnerHref="/partenaires/magni"
          categories={magniCategories}
          icons={MAGNI_ICONS}
          categoryDesc={(slug) => {
            const descs: Record<string, string> = {
              "telehandlers-rotatifs": "Téléhandlers rotatifs 360° — BTP et industrie",
              "telehandlers-fixes": "Téléhandlers fixes — manutention et chantier",
              "telehandlers-agricoles": "Téléhandlers agricoles — élevage et agriculture",
            };
            return descs[slug] ?? "Gamme Magni — téléhandlers haute performance";
          }}
        />

        {/* Promove Demolition */}
        <BrandSection
          brand="promove-demolition"
          badge="Promove Demolition"
          badgeColor="bg-orange-100 text-orange-700"
          title="Outils de démolition Promove"
          description="Expert en hydraulique de démolition depuis 1989. Brise-roches, pinces multiprocesseurs, pulvérisateurs, cisailles à ferraille — pour toutes les tailles de pelles."
          partnerHref="/partenaires/promove-demolition"
          categories={promoveCategories}
          icons={PROMOVE_ICONS}
          categoryDesc={(slug) => {
            const descs: Record<string, string> = {
              "brise-roches": "Marteaux hydrauliques série xP — 60 kg à 7 t",
              "pinces-multiprocesseurs": "Pinces CP avec mâchoires interchangeables",
              "pulverisateurs": "Pulvérisateurs béton CF/CR pour déconstruction",
              "cisailles": "Cisailles à ferraille SC — recyclage et démolition",
              "pinces-de-tri": "Pinces de tri SG/HG+ — démolition et recyclage",
            };
            return descs[slug] ?? "Gamme Promove Demolition — outils hydrauliques";
          }}
        />

        {/* Reassurance */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "🛡️", title: "Garantie constructeur", desc: "Tous les matériels neufs couverts par la garantie complète constructeur" },
            { icon: "🔧", title: "SAV certifié SE+", desc: "Atelier agréé et techniciens certifiés pour la maintenance et les réparations" },
            { icon: "🚚", title: "Livraison Rhône-Alpes", desc: "Nous livrons votre matériel partout en région Rhône-Alpes" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 flex gap-4 shadow-card">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-amc-text text-sm mb-1">{item.title}</p>
                <p className="text-xs text-amc-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-amc-gray rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-3">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-white/70 mb-6 text-sm">
            Contactez nos experts — nous avons accès à l'ensemble des catalogues constructeurs.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-primary rounded-lg">
              Contacter un expert <IconArrowRight size={16} />
            </Link>
            <Link href="/devis" className="btn-outline rounded-lg">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
