// Fails when a photo is used twice on the site (rule: every picture in one place only). Checks that:
// - each file of static/images is declared once in src/lib/content/photos.ts and never written elsewhere,
// - each PHOTOS key is used by one component only,
// - no two files of static/images hold the same picture (same content under two names),
// - no file of static/images is left unused. The logo, icons and share image (static root) are not concerned.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const photosFile = join(root, 'src/lib/content/photos.ts')
const imagesDir = join(root, 'static/images')
const errors = []

const walk = (dir) => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : /\.(svelte|ts|js|css)$/.test(name) ? [path] : []
})
const sources = walk(join(root, 'src')).map((path) => ({ path: relative(root, path).split(sep).join('/'), text: readFileSync(path, 'utf8') }))
const photos = readFileSync(photosFile, 'utf8')

// Declared paths: once each, and nowhere else in the code
const declared = [...photos.matchAll(/'\/images\/([\w-]+\.webp)'/g)].map((match) => match[1])
for (const name of new Set(declared)) {
    if (declared.filter((item) => item === name).length > 1) errors.push(`${name} déclarée plusieurs fois dans photos.ts`)
}
for (const { path, text } of sources) {
    if (path.endsWith('content/photos.ts')) continue
    for (const match of text.matchAll(/\/images\/([\w-]+\.webp)/g)) errors.push(`${match[1]} écrite en dur dans ${path} (passer par photos.ts)`)
}

// Each PHOTOS key in one component only
const keys = [...photos.slice(photos.indexOf('export const PHOTOS'), photos.indexOf('} as const')).matchAll(/^\s+(\w+): '/gm)].map((match) => match[1])
for (const key of keys) {
    const users = sources.filter(({ text }) => new RegExp(`PHOTOS[.]${key}([^A-Za-z0-9_]|$)`).test(text)).map(({ path }) => path)
    if (users.length > 1) errors.push(`PHOTOS.${key} utilisée à plusieurs endroits : ${users.join(', ')}`)
    if (users.length === 0) errors.push(`PHOTOS.${key} n’est utilisée nulle part`)
}
const categoryUsers = sources.filter(({ text, path }) => !path.endsWith('photos.ts') && /CATEGORY_PHOTOS/.test(text)).map(({ path }) => path)
if (categoryUsers.length > 1) errors.push(`CATEGORY_PHOTOS utilisée à plusieurs endroits : ${categoryUsers.join(', ')}`)

// Files: each one declared (with its -640 copy for the heroes), no same picture under two names
const files = readdirSync(imagesDir).filter((name) => name.endsWith('.webp'))
const hashes = new Map()
for (const name of files) {
    const main = name.replace(/-640\.webp$/, '.webp')
    if (!declared.includes(main)) errors.push(`${name} n’est utilisée nulle part`)
    if (name !== main) continue
    const hash = createHash('sha1').update(readFileSync(join(imagesDir, name))).digest('hex')
    if (hashes.has(hash)) errors.push(`${name} et ${hashes.get(hash)} sont la même image`)
    hashes.set(hash, name)
}
for (const name of declared) if (!files.includes(name)) errors.push(`${name} déclarée mais absente de static/images`)

if (errors.length) {
    console.error(`Images : ${errors.length} problème(s)\n - ${errors.join('\n - ')}`)
    process.exit(1)
}
console.log(`Images : ${declared.length} photos, chacune utilisée à un seul endroit`)
