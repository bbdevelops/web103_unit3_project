import React from 'react'
import { Link } from 'react-router-dom'
import { geoEquirectangular, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import land from 'world-atlas/land-110m.json'
import Icon from './Icon'
import '../css/WorldMap.css'

// Crop the equirectangular map to the latitudes people actually live at
const WIDTH = 1000
const NORTH = 84
const SOUTH = -58
const PX_PER_DEGREE = WIDTH / 360
const HEIGHT = (NORTH - SOUTH) * PX_PER_DEGREE

// The same projection draws the coastlines AND places the markers, so
// markers always line up with the map.
const projection = geoEquirectangular()
    .scale(WIDTH / (2 * Math.PI))
    .translate([WIDTH / 2, NORTH * PX_PER_DEGREE])

const toPath = geoPath(projection)
const landPath = toPath(feature(land, land.objects.land))
const graticulePath = toPath(geoGraticule10())

const WorldMap = ({ locations, activeSlug, onActivate }) => (
    <div className='world-map'>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden='true' focusable='false'>
            <path className='world-map-graticule' d={graticulePath} />
            <path className='world-map-land' d={landPath} />
        </svg>

        <nav aria-label='Cloud-watching locations'>
            {locations.map((location) => {
                const [x, y] = projection([location.longitude, location.latitude])
                const classes = ['map-marker']
                if (activeSlug === location.slug) classes.push('is-active')
                if (x > WIDTH * 0.7) classes.push('map-marker--label-left')

                return (
                    <Link
                        key={location.id}
                        to={`/locations/${location.slug}`}
                        className={classes.join(' ')}
                        // Data-driven position, exposed to CSS as custom properties
                        style={{ '--x': `${(x / WIDTH) * 100}%`, '--y': `${(y / HEIGHT) * 100}%` }}
                        aria-label={`${location.name}, ${location.region}. View events`}
                        onMouseEnter={() => onActivate(location.slug)}
                        onMouseLeave={() => onActivate(null)}
                        onFocus={() => onActivate(location.slug)}
                        onBlur={() => onActivate(null)}
                    >
                        <span className='map-marker-pin'><Icon name='cloud' /></span>
                        <span className='map-marker-label'>
                            <strong>{location.name}</strong>
                            <small>{location.signature_clouds}</small>
                        </span>
                    </Link>
                )
            })}
        </nav>
    </div>
)

export default WorldMap
