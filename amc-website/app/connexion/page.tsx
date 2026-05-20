"use client";

import { useState } from "react";
import Link from "next/link";
import { IconEye, IconEyeOff, IconLock, IconMail } from "@/components/ui/Icons";

export default function ConnexionPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Conteneur principal */}
      <div className="flex-1 flex items-start justify-center px-4 pt-10 pb-8">
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-card-hover flex flex-col lg:flex-row">

          {/* ── COLONNE GAUCHE : CONNEXION ── */}
          <div className="flex-1 bg-white p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-amc-text mb-8">Se connecter</h1>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-amc-text mb-1.5">
                  Email professionnel
                </label>
                <div className="relative">
                  <IconMail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-amc-text placeholder:text-gray-400 focus:outline-none focus:border-amc-yellow focus:ring-2 focus:ring-amc-yellow/20 transition-all"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-amc-text mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <IconLock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg text-sm text-amc-text placeholder:text-gray-400 focus:outline-none focus:border-amc-yellow focus:ring-2 focus:ring-amc-yellow/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Rester connecté + Mot de passe oublié */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-amc-yellow"
                  />
                  <span className="text-sm text-amc-text-secondary">Rester connecté</span>
                </label>
                <Link href="#" className="text-sm text-amc-text-secondary hover:text-amc-text transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton Se connecter */}
              <button
                type="submit"
                className="w-full py-3 rounded-full text-sm font-bold transition-all hover:brightness-95 active:scale-[0.99]"
                style={{ backgroundColor: "#FFD500", color: "#000000" }}
              >
                Se connecter
              </button>
            </form>
          </div>

          {/* ── COLONNE DROITE : INSCRIPTION ── */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col" style={{ backgroundColor: "#F5F5F5" }}>
            <div>
              <h2 className="text-2xl font-bold text-amc-text mb-1">Créer un compte</h2>
              <p className="text-sm text-amc-text-secondary mb-8">Nouveau client professionnel ?</p>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Accédez à votre espace chantier",
                "Suivez vos devis et commandes",
                "Historique de vos machines",
                "Demandes SAV simplifiées",
                "Documentation certifiée SE+",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD500", color: "#000000" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm text-amc-text">{item}</span>
                </li>
              ))}
            </ul>

            {/* Bouton Créer un compte */}
            <button
              type="button"
              className="w-full py-3 rounded-full text-sm font-bold border-2 transition-all hover:bg-amc-yellow/10 active:scale-[0.99]"
              style={{ borderColor: "#FFD500", color: "#000000", backgroundColor: "transparent" }}
            >
              Créer mon compte
            </button>
          </div>
        </div>
      </div>

      {/* Logo centré — sous le bloc de connexion */}
      <div className="flex justify-center pb-8">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-amc.png"
            alt="AMC - Alpes Matériel Compact"
            className="h-16 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-amc-text-secondary border-t border-gray-200">
        © 2026 Alpes Matériel Compact — Tous droits réservés
      </footer>
    </div>
  );
}
