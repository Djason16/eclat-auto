// Fails when a font size or a space is written by hand instead of a design token (rule of the sites): font-size,
// line spacing (margin, padding, gap) and positions (inset, top, right, bottom, left) must use var(--font-*) or
// var(--space-*) (or another variable of src/lib/assets/css/utils/variables.css). A value like 12px, 1.5rem or 0.8em
// is refused there; 0, auto, percentages, numbers without unit and calc() made of variables are fine.
// Borders, sizes (width, height), radii and media queries are not checked. Usage: node scripts/tokens.mjs [--list]
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const TOKENS_FILE = join('src', 'lib', 'assets', 'css', 'utils', 'variables.css')
const PROPERTIES = /^\s*(font-size|margin(-[a-z-]+)?|padding(-[a-z-]+)?|gap|row-gap|column-gap|inset(-[a-z-]+)?|top|right|bottom|left|scroll-margin(-[a-z-]+)?)\s*:\s*([^;]+);/
const RAW = /(?<![\w-])-?\d*\.?\d+(px|rem|em)\b/

const walk = (dir) => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : /\.(svelte|css)$/.test(name) ? [path] : []
})

// Only the CSS: whole .css files, and the <style> blocks of the components
const cssLines = (path, text) => {
    if (path.endsWith('.css')) return text.split('\n').map((line, index) => ({ line, number: index + 1 }))
    const lines = text.split('\n')
    const start = lines.findIndex((line) => line.trim().startsWith('<style'))
    if (start < 0) return []
    return lines.slice(start).map((line, index) => ({ line, number: start + index + 1 }))
}

const problems = []
for (const path of walk(join(root, 'src'))) {
    const file = relative(root, path)
    if (file === TOKENS_FILE) continue
    for (const { line, number } of cssLines(path, readFileSync(path, 'utf8'))) {
        const match = line.match(PROPERTIES)
        if (!match) continue
        // The values inside var(...) are fallbacks of variables: removed before the check
        const value = (match[6] ?? '').replace(/var\([^()]*\)/g, '')
        if (RAW.test(value)) problems.push(`${file.split(sep).join('/')}:${number}  ${line.trim()}`)
    }
}

if (process.argv.includes('--list')) console.log(problems.join('\n'))
if (problems.length) {
    console.error(`Tokens : ${problems.length} valeur(s) écrite(s) à la main au lieu d’un jeton (node scripts/tokens.mjs --list)`)
    process.exit(1)
}
console.log('Tokens : toutes les tailles de texte et tous les espacements passent par les jetons')
