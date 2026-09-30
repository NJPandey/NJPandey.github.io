export async function fetchManifest() {
  const res = await fetch('/blog/manifest.json')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
