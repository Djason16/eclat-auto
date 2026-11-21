/**
 * Strict Content Security Policy for the static build, run after "npm run build" (postbuild), like Élan Solidaire.
 * SvelteKit writes a small inline bootstrap script in each page: instead of allowing every inline script
 * ('unsafe-inline'), this script hashes the inline scripts of the built pages and writes their SHA-256 in the
 * Content-Security-Policy of build/_headers (Cloudflare Pages). JSON scripts (JSON-LD) are not run: no hash needed.
 * It also copies the fallback page to 404.html, the page Cloudflare Pages shows (with a 404 status) for an unknown address.
 *
 *   node scripts/csp.mjs build
 */
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = process.argv[2] ?? 'build'
const headersFile = join(outDir, '_headers')
if (!existsSync(headersFile)) {
    console.error(`csp: ${headersFile} not found`)
    process.exit(1)
}

const fallback = join(outDir, '200.html')
if (existsSync(fallback)) copyFileSync(fallback, join(outDir, '404.html'))

const walk = (dir) => readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]))

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g
const hashes = new Set()
for (const file of walk(outDir).filter((path) => path.endsWith('.html'))) {
    for (const [, attributes, body] of readFileSync(file, 'utf8').matchAll(INLINE_SCRIPT)) {
        if (/type="application\/(ld\+)?json"/.test(attributes) || !body.trim()) continue
        hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
    }
}

const headers = readFileSync(headersFile, 'utf8')
const updated = headers.replace(/script-src 'self' 'unsafe-inline'/, `script-src 'self' ${[...hashes].join(' ')}`)
writeFileSync(headersFile, updated)
console.log(`csp: ${hashes.size} inline script hash(es) -> ${headersFile}, 404.html ready`)
