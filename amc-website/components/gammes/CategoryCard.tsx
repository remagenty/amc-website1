import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@/components/ui/Icons";

interface Props {
  href: string;
  label: string;
  count: number;
  image: string;
}

export function CategoryCard({ href, label, count, image }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-row items-stretch bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-amc-yellow hover:shadow-card transition-all h-32"
    >
      <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
        <div>
          <h3 className="font-bold text-amc-text text-sm leading-snug">{label}</h3>
          <p className="text-xs text-amc-text-secondary mt-1">
            {count} machine{count > 1 ? "s" : ""}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:text-amc-text group-hover:gap-1.5 transition-all">
          Voir la catégorie <IconArrowRight size={12} />
        </span>
      </div>

      {image && (
        <div className="relative w-32 flex-shrink-0 bg-gray-50">
          <Image
            src={image}
            alt={label}
            fill
            sizes="128px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Link>
  );
}
