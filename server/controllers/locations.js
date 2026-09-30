import { pool } from '../config/database.js'
import { EVENT_COLUMNS } from './events.js'

const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Unable to load locations' })
    }
}

const getLocationBySlug = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations WHERE slug = $1', [req.params.slug])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: `Location "${req.params.slug}" not found` })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Unable to load location' })
    }
}

const getLocationEvents = async (req, res) => {
    try {
        const location = await pool.query('SELECT id FROM locations WHERE slug = $1', [req.params.slug])

        if (location.rows.length === 0) {
            return res.status(404).json({ error: `Location "${req.params.slug}" not found` })
        }

        const results = await pool.query(
            `SELECT ${EVENT_COLUMNS}
             FROM events e JOIN locations l ON l.id = e.location_id
             WHERE e.location_id = $1
             ORDER BY e.start_time ASC`,
            [location.rows[0].id]
        )
        res.status(200).json(results.rows)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Unable to load events for this location' })
    }
}

export default {
    getLocations,
    getLocationBySlug,
    getLocationEvents
}
