"use client";
import { useRef, useState, DragEvent } from "react";

export interface UploadedPhoto {
  id: string;
  preview: string;
  name: string;
}

interface PhotoUploadProps {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
}

const MAX_FILES = 5;
const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function PhotoUpload({ photos, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (fileList: FileList) => {
    const remaining = MAX_FILES - photos.length;
    if (remaining <= 0) return;
    const newPhotos: UploadedPhoto[] = [];
    for (let i = 0; i < fileList.length && newPhotos.length < remaining; i++) {
      const file = fileList[i];
      if (!ACCEPTED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_SIZE_BYTES) continue;
      newPhotos.push({ id: `${Date.now()}-${i}`, preview: URL.createObjectURL(file), name: file.name });
    }
    if (newPhotos.length > 0) onChange([...photos, ...newPhotos]);
  };

  const remove = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.preview);
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-amc-text mb-1.5">
        Photos <span className="font-normal text-gray-400">(optionnel)</span>
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors select-none ${
          isDragging
            ? "border-gray-400 bg-gray-100"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onClick={(e) => { (e.target as HTMLInputElement).value = ""; }}
          onChange={(e) => { if (e.target.files) processFiles(e.target.files); }}
        />

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center pointer-events-none">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm font-medium text-gray-600 mt-2.5">Ajouter des photos</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — 5 photos max, 10 Mo chacune</p>
          </div>
        ) : (
          <div className="p-3 flex flex-wrap gap-2.5">
            {photos.map((photo) => (
              <div key={photo.id} className="relative w-20 h-20 rounded-lg overflow-hidden group flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.preview} alt={photo.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(photo.id); }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-gray-900/70 text-white flex items-center justify-center text-xs leading-none opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-900"
                  aria-label={`Retirer ${photo.name}`}
                >
                  ×
                </button>
              </div>
            ))}
            {photos.length < MAX_FILES && (
              <div className="pointer-events-none w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <p className="text-xs text-gray-400 mt-1.5">
          {photos.length}/{MAX_FILES} photo{photos.length > 1 ? "s" : ""} sélectionnée{photos.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
