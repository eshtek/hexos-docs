#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = process.env.DOCS_DIR || 'docs'

const CATALOG_DIR = process.env.CATALOG_DIR || path.resolve(__dirname, '..', '..', 'hexos-app-catalog')
const APPS_MD = path.resolve(__dirname, '..', DOCS_DIR, 'features/apps/install-scripts/curated', 'index.md')

const START = '<!-- curated:index:start -->'
const END   = '<!-- curated:index:end -->'

function humanFileSize(bytes) {
  const thresh = 1024
  if (Math.abs(bytes) < thresh) return bytes + ' B'
  const units = ['KB', 'MB', 'GB', 'TB']
  let u = -1
  do { bytes /= thresh; ++u } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

function getGitLastModified(filePath) {
  try {
    const gitCommand = `git log -1 --format=%ci "${filePath}"`
    const result = execSync(gitCommand, {
      cwd: path.dirname(filePath),
      encoding: 'utf8'
    }).trim()

    if (result) {
      return new Date(result).toISOString().split('T')[0]
    }
  } catch (error) {
    console.warn(`Could not get git date for ${filePath}, falling back to fs date`)
  }

  try {
    const stat = fs.statSync(filePath)
    return new Date(stat.mtime).toISOString().split('T')[0]
  } catch (error) {
    return 'Unknown'
  }
}

function getScriptVersion(filePath) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return content.version || '?'
  } catch {
    return '?'
  }
}

function hasHooks(filePath) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return Array.isArray(content.hooks) && content.hooks.length > 0
  } catch {
    return false
  }
}

function isInternalApp(filePath) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return content.internal === true
  } catch {
    return false
  }
}

function buildTable(files) {
  const lines = []
  lines.push('| App | Format | Hooks | Size | Last Modified |')
  lines.push('|---|---|---|---:|---|')
  for (const file of files) {
    const p = path.join(CATALOG_DIR, file)
    const stat = fs.statSync(p)
    const size = humanFileSize(stat.size)
    const mtime = getGitLastModified(p)
    const app = path.basename(file, '.json')
    const version = `V${getScriptVersion(p)}`
    const hooks = hasHooks(p) ? 'Yes' : '—'
    const href = `https://github.com/eshtek/hexos-app-catalog/blob/main/${file}`
    lines.push(`| [\`${app}\`](${href}) | ${version} | ${hooks} | ${size} | ${mtime} |`)
  }
  return lines.join('\n')
}

function ensureAppsPage() {
  if (!fs.existsSync(APPS_MD)) {
    fs.mkdirSync(path.dirname(APPS_MD), { recursive: true })
    const boilerplate =
`# Apps (Curated Scripts)

Curated install scripts are maintained in the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repository.

${START}
_No curated scripts yet._
${END}
`
    fs.writeFileSync(APPS_MD, boilerplate)
  }
}

function updateAppsPage() {
  ensureAppsPage()

  if (!fs.existsSync(CATALOG_DIR)) {
    console.error(`Catalog directory not found: ${CATALOG_DIR}`)
    console.error('Clone hexos-app-catalog as a sibling directory or set CATALOG_DIR env var')
    process.exit(1)
  }

  let md = fs.readFileSync(APPS_MD, 'utf8')

  if (!md.includes(START) || !md.includes(END)) {
    md += `\n\n${START}\n${END}\n`
  }

  const files = fs.readdirSync(CATALOG_DIR)
    .filter(f => f.endsWith('.json'))
    .filter(f => {
      const p = path.join(CATALOG_DIR, f)
      return !isInternalApp(p)
    })
    .sort()

  const content = files.length === 0
    ? '_No curated scripts found — add JSON files to the [hexos-app-catalog](https://github.com/eshtek/hexos-app-catalog) repo._'
    : buildTable(files)

  const before = md.slice(0, md.indexOf(START) + START.length)
  const after  = md.slice(md.indexOf(END))
  const next   = `${before}\n${content}\n${after}`

  fs.writeFileSync(APPS_MD, next)
  console.log('Wrote', APPS_MD)
}

updateAppsPage()
