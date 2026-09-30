// Shared fetch wrapper: every request checks response.ok and surfaces a
// readable error (with HTTP status) instead of failing silently.
export class ApiError extends Error {
    constructor(message, status) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

export const fetchJSON = async (url) => {
    let response

    try {
        response = await fetch(url)
    }
    catch {
        throw new ApiError('Could not reach the server. Check your connection and try again.', 0)
    }

    if (!response.ok) {
        let message = response.status >= 500
            ? `The server ran into a problem (${response.status}). Please try again shortly.`
            : `Request failed (${response.status})`

        try {
            const body = await response.json()
            if (body.error) message = body.error
        }
        catch {
            // Non-JSON error body: keep the generic message
        }

        throw new ApiError(message, response.status)
    }

    return response.json()
}
