"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  formatFileSize,
  isAllowedFile,
  isImageFile,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
} from "@/lib/formularz/file-upload-config";
import { useFormularzFilesStore } from "@/lib/stores/formularz-files-store";

const ACCEPT = ".png,.jpg,.jpeg,.pdf,.doc,.docx";

function getTotalBytes(files: File[]): number {
  return files.reduce((sum, f) => sum + f.size, 0);
}

function useImagePreviewUrls(files: File[]): Map<number, string> {
  const previewUrls = useMemo(() => {
    const map = new Map<number, string>();
    files.forEach((file, index) => {
      if (isImageFile(file)) {
        map.set(index, URL.createObjectURL(file));
      }
    });
    return map;
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return previewUrls;
}

interface ImagePreviewOverlayProps {
  src: string;
  alt: string;
  onClose: () => void;
}

function ImagePreviewOverlay({ src, alt, onClose }: ImagePreviewOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Podgląd: ${alt}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 cursor-pointer font-heading text-xs uppercase tracking-widest text-foreground/70 transition-colors hover:text-foreground"
      >
        Zamknij
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

interface FileListItemProps {
  file: File;
  previewUrl?: string;
  onRemove: () => void;
  onPreview: () => void;
}

function FileListItem({
  file,
  previewUrl,
  onRemove,
  onPreview,
}: FileListItemProps) {
  const isImage = isImageFile(file);

  return (
    <li className="flex items-center gap-4 py-1">
      {isImage && previewUrl ? (
        <button
          type="button"
          onClick={onPreview}
          className="h-16 w-12 shrink-0 cursor-pointer overflow-hidden bg-foreground/15 transition-opacity hover:opacity-80"
          aria-label={`Podgląd pliku ${file.name}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="" className="h-full w-full object-cover" />
        </button>
      ) : (
        <div
          className="h-16 w-12 shrink-0 bg-foreground/15"
          aria-hidden="true"
        />
      )}

      <span className="min-w-0 flex-1 truncate text-sm text-foreground/80">
        {file.name}{" "}
        <span className="text-foreground/50">
          ({formatFileSize(file.size)})
        </span>
      </span>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 cursor-pointer text-xs uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground"
      >
        Usuń
      </button>
    </li>
  );
}

export function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(
    null,
  );

  const files = useFormularzFilesStore((s) => s.files);
  const addFiles = useFormularzFilesStore((s) => s.addFiles);
  const removeFile = useFormularzFilesStore((s) => s.removeFile);

  const previewUrls = useImagePreviewUrls(files);

  const closePreview = useCallback(() => setPreview(null), []);

  const validateAndAdd = useCallback(
    (incoming: File[]) => {
      setError(null);

      if (incoming.length === 0) return;

      const accepted: File[] = [];
      const currentTotal = getTotalBytes(files);

      for (const file of incoming) {
        if (files.length + accepted.length >= MAX_FILES) {
          setError(`Możesz dodać maksymalnie ${MAX_FILES} plików.`);
          break;
        }

        if (!isAllowedFile(file)) {
          setError("Dozwolone formaty: PNG, JPEG, PDF, DOC, DOCX.");
          continue;
        }

        if (file.size > MAX_FILE_BYTES) {
          setError(
            `Plik „${file.name}” przekracza limit ${formatFileSize(MAX_FILE_BYTES)}.`,
          );
          continue;
        }

        const newTotal =
          currentTotal + accepted.reduce((s, f) => s + f.size, 0) + file.size;

        if (newTotal > MAX_TOTAL_BYTES) {
          setError(
            `Łączny rozmiar plików nie może przekroczyć ${formatFileSize(MAX_TOTAL_BYTES)}.`,
          );
          break;
        }

        accepted.push(file);
      }

      if (accepted.length > 0) {
        addFiles(accepted);
      }
    },
    [addFiles, files],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndAdd(Array.from(e.dataTransfer.files));
    },
    [validateAndAdd],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndAdd(Array.from(e.target.files ?? []));
      e.target.value = "";
    },
    [validateAndAdd],
  );

  const handleRemove = useCallback(
    (index: number) => {
      if (preview && files[index]?.name === preview.alt) {
        setPreview(null);
      }
      removeFile(index);
    },
    [preview, files, removeFile],
  );

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-[2px] border-dashed px-6 py-8 transition-colors ${
          isDragging
            ? "border-accent bg-accent/15"
            : "border-accent/70 hover:border-accent hover:bg-accent/15"
        }`}
        aria-label="Dodaj zdjęcie lub plik"
      >
        {!isDragging ? (
          <>
            <span className="text-center font-heading text-sm uppercase tracking-[0.2em] text-accent md:text-base">
              Dodaj zdjęcie lub plik
            </span>
            <span className="text-center font-heading text-[8px] uppercase tracking-[0.2em] text-accent">
              przeciągnij plik lub kliknij
            </span>
          </>
        ) : (
          <span className="text-center font-heading text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            Upuść plik
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="sr-only"
        onChange={handleInputChange}
      />

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-4">
          {files.map((file, index) => (
            <FileListItem
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              file={file}
              previewUrl={previewUrls.get(index)}
              onRemove={() => handleRemove(index)}
              onPreview={() => {
                const url = previewUrls.get(index);
                if (url) {
                  setPreview({ src: url, alt: file.name });
                }
              }}
            />
          ))}
        </ul>
      )}

      {preview && (
        <ImagePreviewOverlay
          src={preview.src}
          alt={preview.alt}
          onClose={closePreview}
        />
      )}
    </div>
  );
}
