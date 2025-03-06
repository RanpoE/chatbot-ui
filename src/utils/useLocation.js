import React, { useState, useEffect} from 'react'

const useLocation = (fn, id) => {
    const [data, setData] = useState(null)

    const fetchData = async () => {
        try {
            const res = await fn(id)
            setData(res)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data }

}

export default useLocation
