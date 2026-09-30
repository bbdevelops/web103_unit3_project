const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

// Dates are shown in the event location's own time zone, so a 5:30 AM dawn
// watch in Burketown reads as 5:30 AM for every visitor.
export const formatEventDate = (iso, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone
    }).format(new Date(iso))

export const formatEventTime = (iso, timeZone) =>
    new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
        timeZone
    }).format(new Date(iso))

export const getTimeRemaining = (iso, now = Date.now()) => {
    const diff = new Date(iso).getTime() - now
    const total = Math.abs(diff)

    return {
        isPast: diff <= 0,
        total,
        days: Math.floor(total / DAY),
        hours: Math.floor((total % DAY) / HOUR),
        minutes: Math.floor((total % HOUR) / MINUTE),
        seconds: Math.floor((total % MINUTE) / SECOND)
    }
}

const pad = (n) => String(n).padStart(2, '0')
const relative = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' })

export const formatCountdown = ({ isPast, total, days, hours, minutes, seconds }) => {
    if (isPast) {
        if (days > 0) return `Happened ${relative.format(-days, 'day')}`
        if (hours > 0) return `Happened ${relative.format(-hours, 'hour')}`
        return `Started ${relative.format(-Math.max(minutes, 1), 'minute')}`
    }

    if (total < MINUTE) return `Starting in ${seconds}s`

    const clock = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
    return days > 0 ? `Starts in ${days}d ${clock}` : `Starts in ${clock}`
}
