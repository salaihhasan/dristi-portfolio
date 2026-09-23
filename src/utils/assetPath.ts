/**
 * assetPath — Base-aware image/asset URL resolver
 *
 * Problem: Images stored in /public are referenced with absolute paths
 * like `/assets/profile/img.png`. This works at root (`/`) but breaks
 * when Vite's `base` is set to a subpath like `/dristi-portfolio/`,
 * because the browser looks for `/assets/...` instead of
 * `/dristi-portfolio/assets/...`.
 *
 * Solution: Always prefix the asset path with `import.meta.env.BASE_URL`,
 * which Vite automatically sets to whatever `base` is in vite.config.ts.
 * - At root (`base: '/'`):        BASE_URL = '/'  → '/assets/...'
 * - At subpath (`base: '/x/'`):   BASE_URL = '/x/' → '/x/assets/...'
 *
 * Usage:
 *   import { asset } from '@/utils/assetPath';
 *   <img src={asset('/assets/profile/photo.png')} />
 *   asset('/assets/experience/hospital.jpg')
 */
export function asset(path: string): string {
  // BASE_URL always ends with '/' and path should start with '/'
  // Strip the leading slash from path before joining to avoid double slash
  const base = import.meta.env.BASE_URL ?? '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
