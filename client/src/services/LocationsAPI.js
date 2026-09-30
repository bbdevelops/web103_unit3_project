import { fetchJSON } from './api'

const getAllLocations = () => fetchJSON('/api/locations')

const getLocationBySlug = (slug) => fetchJSON(`/api/locations/${encodeURIComponent(slug)}`)

const getLocationEvents = (slug) => fetchJSON(`/api/locations/${encodeURIComponent(slug)}/events`)

export default {
    getAllLocations,
    getLocationBySlug,
    getLocationEvents
}
