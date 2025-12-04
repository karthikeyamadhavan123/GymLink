import { useEffect, useState } from "react";
import axios from "axios";
import { SingleGymProps } from "@/gym-pages/gym-related-pages-users/types/types";

export const useSingleGym = (gymId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(true);
    const [singleGym, setSingleGym] = useState<SingleGymProps | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const gymUrl =
        import.meta.env.VITE_DB_URL + `/gym/${gymId}`;

    // Fetch gym
    useEffect(() => {
        const fetchGym = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(gymUrl, { withCredentials: true });

                if (response.status === 200) {
                    setSingleGym(response.data.gym);
                }
            } catch (error) {
                console.error("Error fetching gym:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (gymId) fetchGym();
    }, [gymUrl, gymId]);

    // Image navigation
    const nextImage = () => {
        if (!singleGym?.gymImages) return;
        setCurrentImageIndex((prev) =>
            prev === singleGym.gymImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        if (!singleGym?.gymImages) return;
        setCurrentImageIndex((prev) =>
            prev === 0 ? singleGym.gymImages.length - 1 : prev - 1
        );
    };

    return {
        isLoading,
        singleGym,
        currentImageIndex,
        nextImage,
        prevImage,
        setCurrentImageIndex,
    };
};
