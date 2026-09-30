import { useState, useEffect } from 'react'

// Runs an async loader and tracks { data, error, loading }. Responses that
// arrive after the inputs change (or the component unmounts) are ignored.
const useApi = (loader, deps) => {
    const [state, setState] = useState({ data: null, error: null, loading: true })

    useEffect(() => {
        let ignore = false
        setState((previous) => ({ ...previous, error: null, loading: true }))

        loader()
            .then((data) => {
                if (!ignore) setState({ data, error: null, loading: false })
            })
            .catch((error) => {
                if (!ignore) setState({ data: null, error, loading: false })
            })

        return () => {
            ignore = true
        }
    }, deps)

    return state
}

export default useApi
