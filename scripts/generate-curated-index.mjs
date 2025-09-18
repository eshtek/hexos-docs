#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = process.env.DOCS_DIR || 'docs'

const PUBLIC_DIR = path.resolve(__dirname, '..', DOCS_DIR, 'public', 'install-scripts')
const APPS_MD   = path.resolve(__dirname, '..', DOCS_DIR, 'install-scripts/curated', 'index.md')

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
    // Get the last commit date for the specific file
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
  
  // Fallback to filesystem date if git fails
  try {
    const stat = fs.statSync(filePath)
    return new Date(stat.mtime).toISOString().split('T')[0]
  } catch (error) {
    return 'Unknown'
  }
}

function buildTable(files) {
  const lines = []
  lines.push('| App | Download | Size | Last Modified |')
  lines.push('|---|---|---:|---|')
  for (const file of files) {
    const p = path.join(PUBLIC_DIR, file)
    const stat = fs.statSync(p)
    const size = humanFileSize(stat.size)
    const mtime = getGitLastModified(p)
    const app = path.basename(file, '.json')
    const href = `/install-scripts/${file}`
    lines.push(`| \`${app}\` | [${file}](${href}) | ${size} | ${mtime} |`)
  }
  return lines.join('\n')
}

function ensureAppsPage() {
  if (!fs.existsSync(APPS_MD)) {
    fs.mkdirSync(path.dirname(APPS_MD), { recursive: true })
    const boilerplate =
`# Apps (Curated Scripts)

${START}
_No curated scripts yet._
${END}
`
    fs.writeFileSync(APPS_MD, boilerplate)
  }
}

function updateAppsPage() {
  ensureAppsPage()
  let md = fs.readFileSync(APPS_MD, 'utf8')

  if (!md.includes(START) || !md.includes(END)) {
    // If markers missing, append a fresh block to the end
    md += `\n\n${START}\n${END}\n`
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.json')).sort()

  const content = files.length === 0
    ? '_No curated scripts found yet — add JSON files under `docs/public/install-scripts/` and run `npm run gen:curated`._'
    : buildTable(files)

  const before = md.slice(0, md.indexOf(START) + START.length)
  const after  = md.slice(md.indexOf(END))
  const next   = `${before}\n${content}\n${after}`

  fs.writeFileSync(APPS_MD, next)
  console.log('Wrote', APPS_MD)
}

updateAppsPage()
