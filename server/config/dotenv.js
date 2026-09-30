import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve server/.env relative to this file so it loads no matter the cwd
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, '../.env') })
