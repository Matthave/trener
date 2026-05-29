export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
export const MAX_FILES = 10;

export const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
  ".doc",
  ".docx",
] as const;

export const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export function getFileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

export function isAllowedFile(file: File): boolean {
  const ext = getFileExtension(file.name);
  return (
    ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number]) ||
    ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])
  );
}

export function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const ext = getFileExtension(file.name);
  return ext === ".png" || ext === ".jpg" || ext === ".jpeg";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
