/**
 * Префикс для public-ассетов (audio, video, image вне next/image).
 * Next.js не подмешивает basePath к сырым <audio src="/...">,
 * поэтому собираем путь руками через NEXT_PUBLIC_BASE_PATH.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalized}`;
}
