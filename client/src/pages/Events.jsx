import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Event from '../components/Event'
import StatusMessage from '../components/StatusMessage'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import useApi from '../hooks/useApi'
import useNow from '../hooks/useNow'
import '../css/Events.css'

// Filters live in the URL (e.g. /events?location=burketown&sort=latest)
// so filtered views can be bookmarked and shared.
const Events = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const locationSlug = searchParams.get('location') || ''
    const sort = searchParams.get('sort') === 'latest' ? 'latest' : 'soonest'
    const hidePast = searchParams.get('upcoming') === 'true'

    const locations = useApi(LocationsAPI.getAllLocations, [])
    const events = useApi(() => EventsAPI.getAllEvents(locationSlug), [locationSlug])
    const now = useNow()

    const updateParam = (key, value) => {
        const next = new URLSearchParams(searchParams)
        if (value) next.set(key, value)
        else next.delete(key)
        setSearchParams(next, { replace: true })
    }

    const visibleEvents = (events.data || [])
        .filter((event) => !hidePast || new Date(event.start_time).getTime() > now)
        .sort((a, b) => {
            const diff = new Date(a.start_time) - new Date(b.start_time)
            return sort === 'latest' ? -diff : diff
        })

    return (
        <div className='events-page'>
            <header className='events-header'>
                <h2>All Events</h2>
                <p>Every gathering in the community, from first-time skywatchers to research seminars.</p>
            </header>

            <form className='events-filters' onSubmit={(e) => e.preventDefault()}>
                <label>
                    Location
                    <select
                        value={locationSlug}
                        onChange={(e) => updateParam('location', e.target.value)}
                        disabled={!locations.data}
                    >
                        <option value=''>All locations</option>
                        {(locations.data || []).map((location) => (
                            <option key={location.id} value={location.slug}>{location.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Sort by date
                    <select value={sort} onChange={(e) => updateParam('sort', e.target.value === 'latest' ? 'latest' : '')}>
                        <option value='soonest'>Earliest first</option>
                        <option value='latest'>Latest first</option>
                    </select>
                </label>

                <label className='events-filters-toggle'>
                    <input
                        type='checkbox'
                        role='switch'
                        checked={hidePast}
                        onChange={(e) => updateParam('upcoming', e.target.checked ? 'true' : '')}
                    />
                    Hide past events
                </label>
            </form>

            {locations.error && <StatusMessage type='error'>Couldn't load the location filter: {locations.error.message}</StatusMessage>}

            {events.loading && <StatusMessage type='loading'>Loading events…</StatusMessage>}
            {events.error && <StatusMessage type='error'>{events.error.message}</StatusMessage>}

            {events.data && (
                <>
                    <p className='events-count' aria-live='polite'>
                        Showing {visibleEvents.length} of {events.data.length} event{events.data.length === 1 ? '' : 's'}
                    </p>

                    {visibleEvents.length > 0 ? (
                        <div className='event-grid'>
                            {visibleEvents.map((event) => <Event key={event.id} event={event} showLocation />)}
                        </div>
                    ) : (
                        <StatusMessage>No events match these filters.</StatusMessage>
                    )}
                </>
            )}
        </div>
    )
}

export default Events
