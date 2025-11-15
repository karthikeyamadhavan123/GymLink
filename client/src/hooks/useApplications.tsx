import { ApplicationProps } from "@/types";
import axios from "axios";
import { useState, useEffect } from "react";


const BASE_URL = import.meta.env.VITE_DB_URL


const useApplications = (URI: string) => {
    const [applications, setApplications] = useState<ApplicationProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get(BASE_URL + URI, {
                    withCredentials: true
                });
                console.log(response.data);
                
                setApplications(response.data.applications || []);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch applications');
                console.error('Error fetching applications:', err);
            } finally {
                setLoading(false);
            }
        };

        if (URI) {
            fetchApplications();
        }
    }, [URI]);

    return { applications, loading, error,setApplications };
};
export default useApplications;
