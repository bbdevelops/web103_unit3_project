import { fetchJSON } from './api'

// Optionally filter by location slug on the server
const getAllEvents = (locationSlug) => {
    const query = locationSlug ? `?location=${encodeURIComponent(locationSlug)}` : ''
    return fetchJSON(`/api/events${query}`)
}

export default {
    getAllEvents
}
