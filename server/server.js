import './config/dotenv.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

// In production, Express serves the Vite build output (generated into
// server/public by `npm run build`). In development, Vite serves the client.
const publicDir = path.resolve(__dirname, 'public')
const clientPublicDir = path.resolve(__dirname, '../client/public')

const app = express()

app.use(express.json())
app.use(favicon(path.join(isProduction ? publicDir : clientPublicDir, 'logo.png')))

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

app.use('/api', (req, res) => {
    res.status(404).json({ error: `No API route for ${req.method} ${req.originalUrl}` })
})

if (isProduction) {
    app.use(express.static(publicDir))

    // Let React Router handle every non-API route
    app.get('*', (req, res) => {
        res.sendFile(path.join(publicDir, 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
