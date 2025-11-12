import axios from "axios";
import { useEffect, useState } from "react"
const BASE_URL = import.meta.env.VITE_DB_URL;

const useJobs = (URI: string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(BASE_URL + URI, { withCredentials: true })
                if (response.status === 200) setData(response.data.job);
            } catch (err) {
                setError("Failed to fetch data");
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [])
    return { loading, data, error }
}

export default useJobs
