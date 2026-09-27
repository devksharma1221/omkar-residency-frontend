/** Builds an optimised Unsplash CDN URL for a photo id. */
export function unsplash(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
