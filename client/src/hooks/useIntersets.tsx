import axios from "axios";
import { useState, useEffect } from "react";


const BASE_URL = import.meta.env.VITE_DB_URL

const useInterests = (URI: string) => {
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchIntrests = async () => {
            try {
                setLoading(true);
                const response = await axios.get(BASE_URL + URI, {
                    withCredentials: true
                });
                setInterests(response.data.allInterests[0].interests || []);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch intrests.');
                console.error('Error fetching intrests:', err);
            } finally {
                setLoading(false);
            }
        };

        if (URI) {
            fetchIntrests();
        }
    }, [URI]);

    return { interests, loading, error };
};
export default useInterests;