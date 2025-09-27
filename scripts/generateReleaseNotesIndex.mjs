#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = process.env.DOCS_DIR || 'docs'

const RELEASE_NOTES_DIR = path.resolve(__dirname, '..', DOCS_DIR, 'release-notes/command-deck')
const INDEX_MD = path.resolve(RELEASE_NOTES_DIR, 'index.md')
const SIDEBAR_TS = path.resolve(__dirname, '..', DOCS_DIR, '.vitepress/sidebar.ts')

// Sidebar automation markers
const SIDEBAR_START = '// auto-generated-release-notes-start'
const SIDEBAR_END = '// auto-generated-release-notes-end'

// Dynamic year section markers
const YEAR_SECTIONS_START = '<!-- auto-generated-year-sections-start -->'
const YEAR_SECTIONS_END = '<!-- auto-generated-year-sections-end -->'

function parseReleaseNote(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')

    // Get title from first heading
    const titleLine = lines.find(line => line.startsWith('# '))
    const title = titleLine ? titleLine.replace('# ', '') : 'Unknown'

    // Extract date from filename (YYYY-MM-DD.md)
    const filename = path.basename(filePath, '.md')
    const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/)

    if (!dateMatch) return null

    const [, year, month, day] = dateMatch
    const date = new Date(year, month - 1, day)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Generate description from content (look for key features or main points)
    let description = ''
    let inKeyFeatures = false
    let features = []

    for (const line of lines) {
      if (line.startsWith('## Key Features') || line.startsWith('## Additional Apps')) {
        inKeyFeatures = true
        continue
      }
      if (line.startsWith('##') && inKeyFeatures) {
        break
      }
      if (inKeyFeatures && line.startsWith('- ') || line.startsWith('### ')) {
        const feature = line.replace(/^- \*\*|^### |\*\*.*?:\s*/g, '').split(' - ')[0].split(':')[0]
        if (feature && !features.includes(feature)) {
          features.push(feature)
        }
      }
    }

    description = features.length > 0 ? features.slice(0, 3).join(', ') : 'Updates and improvements'

    return {
      filename,
      title,
      formattedDate,
      description,
      year: parseInt(year),
      sortDate: date
    }
  } catch (error) {
    console.warn(`Could not parse ${filePath}:`, error.message)
    return null
  }
}

function buildReleaseList(releases) {
  if (!releases.length) return '_No releases found._'

  // Sort by date descending (newest first)
  releases.sort((a, b) => b.sortDate - a.sortDate)

  return releases.map(release =>
    `- [**${release.formattedDate}**](./${release.filename}) - ${release.description}`
  ).join('\n')
}

function ensureIndexPage() {
  if (!fs.existsSync(INDEX_MD)) {
    fs.mkdirSync(path.dirname(INDEX_MD), { recursive: true })
    const boilerplate = `# Command Deck Release Notes

Stay up to date with HexOS Command Deck updates, new features, and improvements.

## How Updates Work

Command Deck updates are automatically deployed by the HexOS development team. You don't need to take any action to receive these updates - they will appear automatically when you next visit the Command Deck.

For users who are actively connected during an update, there may be a brief downtime of a minute or two as the new version is deployed.

${YEAR_SECTIONS_START}
${YEAR_SECTIONS_END}

## Need Help?

If you encounter any issues after an update:
- Try [clearing your browser cache](/troubleshooting/common-issues/ClearCache) first
- Check the [troubleshooting guide](/troubleshooting/) for common solutions
- Visit the [HexOS Community](https://hub.hexos.com/) for additional support
`
    fs.writeFileSync(INDEX_MD, boilerplate)
  }
}

function updateIndexPage() {
  ensureIndexPage()
  let md = fs.readFileSync(INDEX_MD, 'utf8')

  // Ensure year sections markers exist
  if (!md.includes(YEAR_SECTIONS_START)) {
    // If no markers, add them after "How Updates Work" section
    const insertPoint = md.indexOf('## Need Help?')
    if (insertPoint !== -1) {
      const before = md.slice(0, insertPoint)
      const after = md.slice(insertPoint)
      md = `${before}${YEAR_SECTIONS_START}\n${YEAR_SECTIONS_END}\n\n${after}`
    }
  }

  // Get all release note files
  const files = fs.readdirSync(RELEASE_NOTES_DIR)
    .filter(f => f.endsWith('.md') && f !== 'index.md' && f.match(/^\d{4}-\d{2}-\d{2}\.md$/))

  const releases = files
    .map(f => parseReleaseNote(path.join(RELEASE_NOTES_DIR, f)))
    .filter(r => r !== null)

  // Group by year and sort years descending (newest first)
  const releasesByYear = releases.reduce((acc, release) => {
    if (!acc[release.year]) acc[release.year] = []
    acc[release.year].push(release)
    return acc
  }, {})

  const years = Object.keys(releasesByYear).map(Number).sort((a, b) => b - a)

  // Generate year sections
  const yearSections = years.map(year => {
    const yearReleases = releasesByYear[year]
    const content = buildReleaseList(yearReleases)
    return `## ${year} Releases\n\n${content}`
  }).join('\n\n')

  // Update the year sections
  if (md.includes(YEAR_SECTIONS_START) && md.includes(YEAR_SECTIONS_END)) {
    const before = md.slice(0, md.indexOf(YEAR_SECTIONS_START) + YEAR_SECTIONS_START.length)
    const after = md.slice(md.indexOf(YEAR_SECTIONS_END))
    md = `${before}\n${yearSections}\n${after}`

    fs.writeFileSync(INDEX_MD, md)
    console.log('Wrote', INDEX_MD)

    const yearCounts = years.map(year => `${releasesByYear[year].length} releases for ${year}`).join(', ')
    console.log(`Found ${yearCounts}`)
  } else {
    console.warn('Could not find year section markers in index.md')
  }
}

function generateSidebarItems(releases) {
  if (!releases.length) return ''

  // Sort by date descending (newest first)
  releases.sort((a, b) => b.sortDate - a.sortDate)

  return releases.map(release =>
    `            { text: '${release.formattedDate}', link: '/release-notes/command-deck/${release.filename}' },`
  ).join('\n')
}

function updateSidebar() {
  if (!fs.existsSync(SIDEBAR_TS)) {
    console.warn('Sidebar file not found, skipping sidebar update')
    return
  }

  let sidebarContent = fs.readFileSync(SIDEBAR_TS, 'utf8')

  // Get all release note files
  const files = fs.readdirSync(RELEASE_NOTES_DIR)
    .filter(f => f.endsWith('.md') && f !== 'index.md' && f.match(/^\d{4}-\d{2}-\d{2}\.md$/))

  const releases = files
    .map(f => parseReleaseNote(path.join(RELEASE_NOTES_DIR, f)))
    .filter(r => r !== null)

  const sidebarItems = generateSidebarItems(releases)

  // Add markers if they don't exist
  if (!sidebarContent.includes(SIDEBAR_START)) {
    // Find the Command Deck items section and add markers
    const commandDeckMatch = sidebarContent.match(/({\s*text:\s*'Command Deck',\s*link:\s*'\/release-notes\/command-deck\/',\s*items:\s*\[)([\s\S]*?)(\]\s*},)/m)

    if (commandDeckMatch) {
      const before = commandDeckMatch[1]
      const after = commandDeckMatch[3]
      const replacement = `${before}\n            ${SIDEBAR_START}\n            ${SIDEBAR_END}\n          ${after}`
      sidebarContent = sidebarContent.replace(commandDeckMatch[0], replacement)
    }
  }

  // Update the sidebar items between markers
  if (sidebarContent.includes(SIDEBAR_START) && sidebarContent.includes(SIDEBAR_END)) {
    const before = sidebarContent.slice(0, sidebarContent.indexOf(SIDEBAR_START) + SIDEBAR_START.length)
    const after = sidebarContent.slice(sidebarContent.indexOf(SIDEBAR_END))
    sidebarContent = `${before}\n${sidebarItems}\n            ${after}`

    fs.writeFileSync(SIDEBAR_TS, sidebarContent)
    console.log('Updated sidebar.ts with', releases.length, 'release notes')
  } else {
    console.warn('Could not find sidebar markers, manual update required')
  }
}

updateIndexPage()
updateSidebar()