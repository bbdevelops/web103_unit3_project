import { useSyncExternalStore } from 'react'

// One shared 1-second clock for every countdown on the page, instead of a
// separate interval per event card. The timer stops when nothing is listening.
const listeners = new Set()
let now = Date.now()
let timer = null

const tick = () => {
    now = Date.now()
    listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
    listeners.add(listener)

    if (!timer) {
        now = Date.now()
        timer = setInterval(tick, 1000)
    }

    return () => {
        listeners.delete(listener)

        if (listeners.size === 0) {
            clearInterval(timer)
            timer = null
        }
    }
}

const getSnapshot = () => now

const useNow = () => useSyncExternalStore(subscribe, getSnapshot)

export default useNow
