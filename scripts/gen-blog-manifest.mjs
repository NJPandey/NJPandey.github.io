import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const blogDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'blog')
const manifestPath = path.join(blogDir, 'manifest.json')

function parseFrontmatter(raw, file) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    throw new Error(`logName=blogFrontmatterMissing, file=${file}`)
  }
  const meta = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((t) => t.trim()).filter(Boolean)
    }
    meta[key] = value
  }
  for (const required of ['title', 'date', 'excerpt']) {
    if (!meta[required]) throw new Error(`logName=blogFrontmatterFieldMissing, file=${file}, field=${required}`)
  }
  return { meta, body: match[2] }
}

await mkdir(blogDir, { recursive: true })
const files = (await readdir(blogDir)).filter((f) => f.endsWith('.md'))

const posts = []
for (const file of files) {
  const raw = await readFile(path.join(blogDir, file), 'utf8')
  const { meta, body } = parseFrontmatter(raw, file)
  const words = body.trim().split(/\s+/).length
  posts.push({
    slug: file.replace(/\.md$/, ''),
    title: meta.title,
    date: meta.date,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    excerpt: meta.excerpt,
    readingMinutes: Math.max(1, Math.round(words / 200))
  })
}

posts.sort((a, b) => (a.date < b.date ? 1 : -1))
await writeFile(manifestPath, JSON.stringify({ posts }, null, 2) + '\n')
console.error(`logName=blogManifestGenerated, postCount=${posts.length}`)
