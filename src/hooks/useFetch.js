import { useState, useEffect } from 'react'

const useFetch = (url) => {
    // defining state variables
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })

            // checking if response has an error and making the json to js
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })

            //  If this is executed we set loading to false and error to false because everything works
            .then(data => {
                setData(data)
                setIsLoading(false)
                setError(null)
            })

            // if the first block gave an error, we catch it here and log it to the console
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setIsLoading(false)
                    setError(err.message) // to show the error on the website
                }
            })

        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch