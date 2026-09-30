import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const port = Number(process.env.PORT) || 3001

const app = express()
app.disable('x-powered-by')

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(express.static(dist))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, () => {
  console.error(`logName=serverStarted, port=${port}`)
})
