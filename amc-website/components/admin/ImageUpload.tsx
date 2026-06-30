"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.match(/^image\/(jpeg|png|webp|avif|heic|heif)$/)) {
        setError("Format invalide — JPG, PNG, WebP ou AVIF uniquement.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Fichier trop lourd — 10 Mo maximum.");
        return;
      }
      setError(null);
      const localUrl = URL.createObjectURL(file);
      setPreview({ url: localUrl, name: file.name });

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (!res.ok) {
          const { error: msg } = await res.json().catch(() => ({ error: "Erreur upload" }));
          throw new Error(msg ?? "Erreur upload");
        }
        const { url } = await res.json();
        onChange(url);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Erreur upload");
        setPreview(null);
        onChange(null);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  function clear() {
    setPreview(null);
    onChange(null);
    setError(null);
    setUrlInput("");
    setShowUrlInput(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function applyUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setError(null);
    setPreview(null);
    onChange(trimmed);
    setShowUrlInput(false);
  }

  const active = dragging || uploading;
  const hasImage = preview || value;

  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>}

      {hasImage ? (
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Image
              src={preview?.url ?? value!}
              alt="Aperçu"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={clear}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow"
            aria-label="Supprimer l'image"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <p className="mt-1.5 text-xs text-gray-500 max-w-[112px] truncate">
            {preview?.name ?? value}
          </p>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
              <svg className="animate-spin w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={[
            "w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 px-4 transition-colors cursor-pointer",
            active
              ? "border-[#F5B800] bg-yellow-50"
              : "border-gray-200 bg-gray-50 hover:border-[#F5B800] hover:bg-yellow-50",
          ].join(" ")}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={active ? "#F5B800" : "#9CA3AF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Glissez une photo ici</span>
          <span className="text-xs text-gray-400">ou cliquez pour sélectionner — JPG, PNG, WebP</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="sr-only"
        onChange={onInputChange}
        tabIndex={-1}
      />

      {/* Fallback : coller une URL ou un chemin /images/… */}
      {!hasImage && (
        <div className="mt-1">
          {showUrlInput ? (
            <div className="flex gap-1.5">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyUrl()}
                placeholder="/images/mon-image.jpg"
                className="flex-1 text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#F5B800]"
                autoFocus
              />
              <button
                type="button"
                onClick={applyUrl}
                className="text-xs px-2.5 py-1.5 bg-[#F5B800] text-gray-900 font-semibold rounded-lg hover:bg-[#e0a800]"
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="text-xs px-2 py-1.5 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
            >
              Coller une URL ou un chemin d&apos;image
            </button>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
