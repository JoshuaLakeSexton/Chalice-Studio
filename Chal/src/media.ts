export function mediaUrl(path: string) {
  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base) return path; // fallback so the site doesn't crash
  return `${base}/storage/v1/object/public/media/${path.replace(/^\/+/, "")}`;
}
