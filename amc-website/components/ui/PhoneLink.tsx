"use client";

import { useEffect, useRef, useState } from "react";

const PHONE_E164 = "+33426784390";
const PHONE_DISPLAY = "04 26 78 43 90";

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent);
  return uaMobile || window.innerWidth < 768;
}

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function PhoneLink({ className, style, children }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobileDevice()) return;
    e.preventDefault();
    setCopied(false);
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard indisponible — pas critique
    }
  };

  return (
    <span ref={wrapperRef} className="relative inline-block">
      <a href={`tel:${PHONE_E164}`} className={className} style={style} onClick={handleClick}>
        {children}
      </a>
      {open && (
        <div
          role="dialog"
          aria-label="Numéro de téléphone"
          className="absolute z-50 top-full left-0 mt-2 min-w-[200px] bg-white text-amc-text rounded-lg shadow-card border border-gray-100 p-3 animate-fade-in"
        >
          <p className="text-sm font-bold whitespace-nowrap">{PHONE_DISPLAY}</p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amc-yellow-dark hover:underline"
          >
            {copied ? "Copié !" : "Copier le numéro"}
          </button>
        </div>
      )}
    </span>
  );
}
