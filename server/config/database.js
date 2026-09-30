import pg from 'pg'
import './dotenv.js'

// pg returns NUMERIC as strings to avoid precision loss; latitude/longitude
// fit comfortably in a JS number, so parse them for the client.
pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat)

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)
