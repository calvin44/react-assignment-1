import { useEffect, useState } from "react";
import axios from 'axios'

const useFetch = (params = '') => {
    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get(`http://hn.algolia.com/api/v1/search?query=${params}`)
            .then(res => setResult(res.data.hits))
            .catch(err => setResult('error'))
    }, [params])
    return [result, setResult]
}

export default useFetch