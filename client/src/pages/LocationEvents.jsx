import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Event from '../components/Event'
import Icon from '../components/Icon'
import StatusMessage from '../components/StatusMessage'
import LocationsAPI from '../services/LocationsAPI'
import useApi from '../hooks/useApi'
import '../css/LocationEvents.css'

const loadLocationWithEvents = (slug) =>
    Promise.all([LocationsAPI.getLocationBySlug(slug), LocationsAPI.getLocationEvents(slug)])
        .then(([location, events]) => ({ location, events }))

const LocationEvents = () => {
    const { slug } = useParams()
    const { data, error, loading } = useApi(() => loadLocationWithEvents(slug), [slug])

    if (loading) {
        return <StatusMessage type='loading'>Loading location…</StatusMessage>
    }

    if (error) {
        return (
            <StatusMessage type='error'>
                <p>{error.status === 404 ? `We couldn't find a location called "${slug}".` : error.message}</p>
                <Link to='/'>Back to the map</Link>
            </StatusMessage>
        )
    }

    const { location, events } = data

    return (
        <div className='location-events'>
            <Link to='/' className='back-link'><Icon name='arrowLeft' /> All locations</Link>

            <header className='location-header'>
                <img className='location-header-image' src={location.image_url} alt={`Clouds at ${location.name}`} />

                <div className='location-header-info'>
                    <h2>{location.name}</h2>
                    <p className='location-region'><Icon name='pin' /> {location.region}</p>
                    <p>{location.description}</p>
                    <p className='location-signature'><strong>Look for:</strong> {location.signature_clouds}</p>
                    <Link to={`/events?location=${location.slug}`} role='button' className='secondary outline'>
                        Compare with all events
                    </Link>
                </div>
            </header>

            <section aria-labelledby='location-events-heading'>
                <h3 id='location-events-heading' className='section-heading'>
                    Events at {location.name} <span className='count'>({events.length})</span>
                </h3>

                {events.length > 0 ? (
                    <div className='event-grid'>
                        {events.map((event) => <Event key={event.id} event={event} />)}
                    </div>
                ) : (
                    <StatusMessage>No events scheduled here yet. Check back soon!</StatusMessage>
                )}
            </section>
        </div>
    )
}

export default LocationEvents
