import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';

interface GymProps {
    _id: string;
    gymName: string;
    equipments: string[];
    location: {
        area: string;
        city: string;
        landmark: string;
        pincode: string;
        state: string;
        streetName: string;
    };
    gymImages: string[];
}

const Gyms = () => {
    const [gyms, setGyms] = useState<GymProps[]>([]);
    const router = useNavigate()
    const handleNavigation = (id: string) => {
        router(`/gym/${id}`)
    }
    useEffect(() => {
        const fetchGyms = async () => {
            const response = await axios.get('http://localhost:8080/gym/all', { withCredentials: true });
            const { gyms } = response.data;
            setGyms(gyms);
        };
        fetchGyms();
    }, []);


    return (
        <>
            <Helmet>
                <title>Find the Best Gyms Near You | GymLink</title>
                <meta name="description" content="Explore top gyms in your area, find the best trainers, and start your fitness journey with GymLink." />
                <meta name="keywords" content="GymLink, gyms near me, fitness, workout, best gyms, personal trainers" />
                <meta property="og:title" content="Find the Best Gyms Near You - GymLink" />
                <meta property="og:description" content="Discover the best gyms in your locality, explore facilities, and connect with top trainers through GymLink." />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className='bg-black'>
                <div className="flex flex-col gap-4 p-4">
                    {gyms.map((gym, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden w-full flex">
                            {/* Gym Image */}
                            <img src={gym.gymImages[0]} alt="gym" className="w-48 h-48 object-cover" />

                            {/* Gym Details */}
                            <div className="p-4 flex-grow">
                                <h1 className="text-xl font-bold mb-2 text-black">{gym.gymName}</h1>
                                <h2 className="text-gray-600">{gym.location.area}, {gym.location.city}</h2>
                            </div>

                            {/* View Button */}
                            <div className="p-4 flex items-center">
                                <button className="bg-lime-300 text-black py-2 px-4 rounded hover:bg-lime-400 cursor-pointer transition duration-300" onClick={() => handleNavigation(gym._id)}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gyms;

