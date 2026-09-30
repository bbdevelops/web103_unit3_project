import { pool } from '../config/database.js'

// Every event response includes the location fields the client needs to
// label, link, and format it in the location's local time.
export const EVENT_COLUMNS = `
    e.id, e.title, e.description, e.host, e.audience, e.start_time, e.image_url,
    e.location_id, l.name AS location_name, l.slug AS location_slug, l.timezone
`

const getEvents = async (req, res) => {
    const { location } = req.query
    const params = []
    let query = `SELECT ${EVENT_COLUMNS} FROM events e JOIN locations l ON l.id = e.location_id`

    if (location) {
        params.push(location)
        query += ` WHERE l.slug = $${params.length}`
    }

    query += ' ORDER BY e.start_time ASC'

    try {
        const results = await pool.query(query, params)
        res.status(200).json(results.rows)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Unable to load events' })
    }
}

export default {
    getEvents
}
