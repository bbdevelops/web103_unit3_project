import React, { useState } from 'react'
import WorldMap from '../components/WorldMap'
import LocationCard from '../components/LocationCard'
import StatusMessage from '../components/StatusMessage'
import LocationsAPI from '../services/LocationsAPI'
import useApi from '../hooks/useApi'
import '../css/Locations.css'

const Locations = () => {
    const { data: locations, error, loading } = useApi(LocationsAPI.getAllLocations, [])

    // Hovering a map marker highlights its card, and vice versa
    const [activeSlug, setActiveSlug] = useState(null)

    return (
        <div className='locations-page'>
            <section className='hero'>
                <h2>Where will you look up next?</h2>
                <p>
                    A gathering place for cloud watchers of every kind: backyard skygazers, storm spotters,
                    meteorologists, and atmospheric scientists. Pick a spot on the map to see what the
                    community is doing under its sky.
                </p>
            </section>

            {loading && <StatusMessage type='loading'>Loading cloud-watching spots…</StatusMessage>}
            {error && <StatusMessage type='error'>{error.message}</StatusMessage>}

            {locations && (
                <>
                    <WorldMap locations={locations} activeSlug={activeSlug} onActivate={setActiveSlug} />

                    <section className='location-grid' aria-label='All locations'>
                        {locations.map((location) => (
                            <LocationCard
                                key={location.id}
                                location={location}
                                isActive={activeSlug === location.slug}
                                onActivate={setActiveSlug}
                            />
                        ))}
                    </section>
                </>
            )}
        </div>
    )
}

export default Locations
