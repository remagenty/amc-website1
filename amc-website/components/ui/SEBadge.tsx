import { IconBadgeCheck } from "./Icons";

interface SEBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SEBadge({ size = "md", className = "" }: SEBadgeProps) {
  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full bg-amc-yellow text-amc-text ${sizes[size]} ${className}`}
      title="Service Après-Vente certifié"
    >
      <IconBadgeCheck size={size === "sm" ? 12 : size === "md" ? 14 : 18} />
      SE+
    </span>
  );
}
