import React from 'react'

// Small inline stroke icons (no icon-font dependency)
const paths = {
    cloud: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z',
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    pin: 'M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    arrowLeft: 'M19 12H5M12 19l-7-7 7-7'
}

const Icon = ({ name, className = '' }) => (
    <svg className={`icon ${className}`} viewBox='0 0 24 24' fill='none' stroke='currentColor'
        strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
        <path d={paths[name]} />
    </svg>
)

export default Icon
