import React from 'react'
import { Link } from 'react-router-dom'
import '../css/LocationCard.css'

const LocationCard = ({ location, isActive, onActivate }) => (
    <Link
        to={`/locations/${location.slug}`}
        className={isActive ? 'location-card is-active' : 'location-card'}
        onMouseEnter={() => onActivate(location.slug)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(location.slug)}
        onBlur={() => onActivate(null)}
    >
        <img src={location.image_url} alt='' loading='lazy' />
        <div className='location-card-text'>
            <h3>{location.name}</h3>
            <p>{location.region}</p>
            <small>{location.signature_clouds}</small>
        </div>
    </Link>
)

export default LocationCard
