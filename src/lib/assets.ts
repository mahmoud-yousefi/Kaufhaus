/**
 * Prefix a public asset path with Vite's configured base URL.
 *
 * Vite serves `public/` at the base path, so in development and production an
 * image stored as `public/images/products/p001.jpg` must be requested as
 * `/Kaufhaus/images/products/p001.jpg` (with `base: '/Kaufhaus/'`).
 */
const base = import.meta.env.BASE_URL

export function assetUrl(path?: string): string {
  if (!path) return ''
  // Leave absolute remote/data URLs untouched.
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path
  // Avoid prefixing the same base twice.
  if (path.startsWith(base)) return path
  return `${base}${path.replace(/^\/+/, '')}`
}

export default assetUrl
