import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import useNow from '../hooks/useNow'
import { formatEventDate, formatEventTime, getTimeRemaining, formatCountdown } from '../utils/dates'
import '../css/Event.css'

const audienceClass = {
    'All levels': 'badge--all',
    'Amateur': 'badge--amateur',
    'Professional': 'badge--pro'
}

const Event = ({ event, showLocation = false }) => {
    const now = useNow()
    const remaining = getTimeRemaining(event.start_time, now)
    const cardClass = remaining.isPast ? 'event-card event-card--past' : 'event-card'

    return (
        <article className={cardClass}>
            <div className='event-card-image'>
                <img src={event.image_url} alt='' loading='lazy' />
                {remaining.isPast && <span className='event-card-ribbon'>Passed</span>}
            </div>

            <div className='event-card-body'>
                <span className={`badge ${audienceClass[event.audience]}`}>
                    <Icon name='users' /> {event.audience}
                </span>

                <h3 className='event-card-title'>{event.title}</h3>
                <p className='event-card-host'>Hosted by {event.host}</p>

                {showLocation && (
                    <p className='event-card-meta'>
                        <Icon name='pin' />
                        <Link to={`/locations/${event.location_slug}`}>{event.location_name}</Link>
                    </p>
                )}

                <p className='event-card-meta'>
                    <Icon name='calendar' />
                    <time dateTime={event.start_time}>
                        {formatEventDate(event.start_time, event.timezone)} · {formatEventTime(event.start_time, event.timezone)}
                    </time>
                </p>

                <p className='event-card-countdown'>
                    <Icon name='clock' /> {formatCountdown(remaining)}
                </p>

                <p className='event-card-description'>{event.description}</p>
            </div>
        </article>
    )
}

export default Event
