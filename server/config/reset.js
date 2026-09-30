import { pool } from './database.js'
import locationData from '../data/locations.js'
import eventData from '../data/events.js'

const createTablesQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
        id               SERIAL PRIMARY KEY,
        slug             VARCHAR(60)   UNIQUE NOT NULL,
        name             VARCHAR(100)  NOT NULL,
        region           VARCHAR(100)  NOT NULL,
        description      TEXT          NOT NULL,
        signature_clouds TEXT          NOT NULL,
        image_url        TEXT          NOT NULL,
        latitude         NUMERIC(8, 5) NOT NULL,
        longitude        NUMERIC(8, 5) NOT NULL,
        timezone         VARCHAR(60)   NOT NULL
    );

    CREATE TABLE events (
        id          SERIAL PRIMARY KEY,
        location_id INTEGER       NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
        title       VARCHAR(150)  NOT NULL,
        description TEXT          NOT NULL,
        host        VARCHAR(100)  NOT NULL,
        audience    VARCHAR(30)   NOT NULL CHECK (audience IN ('All levels', 'Amateur', 'Professional')),
        start_time  TIMESTAMPTZ   NOT NULL,
        image_url   TEXT          NOT NULL
    );

    CREATE INDEX events_location_id_idx ON events (location_id);
`

const insertLocationQuery = `
    INSERT INTO locations (slug, name, region, description, signature_clouds, image_url, latitude, longitude, timezone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, slug
`

const insertEventQuery = `
    INSERT INTO events (location_id, title, description, host, audience, start_time, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
`

const resetDatabase = async () => {
    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        await client.query(createTablesQuery)
        console.log('✅ Tables "locations" and "events" created')

        const locationIds = {}
        for (const location of locationData) {
            const result = await client.query(insertLocationQuery, [
                location.slug,
                location.name,
                location.region,
                location.description,
                location.signature_clouds,
                location.image_url,
                location.latitude,
                location.longitude,
                location.timezone
            ])
            locationIds[result.rows[0].slug] = result.rows[0].id
        }
        console.log(`✅ ${locationData.length} locations seeded`)

        for (const event of eventData) {
            const locationId = locationIds[event.location_slug]
            if (!locationId) {
                throw new Error(`Event "${event.title}" references unknown location "${event.location_slug}"`)
            }

            await client.query(insertEventQuery, [
                locationId,
                event.title,
                event.description,
                event.host,
                event.audience,
                event.start_time,
                event.image_url
            ])
        }
        console.log(`✅ ${eventData.length} events seeded`)

        await client.query('COMMIT')
    }
    catch (error) {
        await client.query('ROLLBACK')
        console.error('❌ Error resetting database:', error.message)
        process.exitCode = 1
    }
    finally {
        client.release()
        await pool.end()
    }
}

resetDatabase()
