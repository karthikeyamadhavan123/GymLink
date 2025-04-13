import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { HashLoader } from 'react-spinners';

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

const gymUrl = import.meta.env.VITE_DB_URL + '/gym/all'

const Gyms = () => {
    const [gyms, setGyms] = useState<GymProps[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();

    const handleNavigation = (id: string) => {
        router(`/gym/${id}`);
    }

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(gymUrl, { withCredentials: true });
                const { gyms } = response.data;
                setGyms(gyms);
            } catch (error) {
                console.error("Error fetching gyms:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGyms();
    }, []);

    const filteredGyms = gyms.filter(gym => {
        const searchLower = searchTerm.toLowerCase();
        return (
            gym.gymName.toLowerCase().includes(searchLower) ||
            gym.location.city.toLowerCase().includes(searchLower) ||
            gym.location.area.toLowerCase().includes(searchLower) ||
            gym.equipments.some(eq => eq.toLowerCase().includes(searchLower))
    )});

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

            <div className='h-full font-stencil bg-black'>
                {/* Hero Section */}
                <div className=' text-white py-16 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-7xl mx-auto text-center'>
                        <h1 className='text-4xl font-bold mb-6'>Find Your Perfect Gym</h1>
                        <p className='text-xl mb-8'>Discover top-rated fitness centers with the best equipment and trainers in your area</p>
                        
                        {/* Search Bar */}
                        <div className='max-w-2xl mx-auto relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <FiSearch className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type="text"
                                placeholder='Search by gym name, location, or equipment...'
                                className='block w-full pl-10 pr-3 py-4 border  rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent border-white'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                    {isLoading ? (
                        <div className='flex justify-center items-center py-20'>
                            <HashLoader size={20} color='#fff'/>
                        </div>
                    ) : (
                        <>
                            <div className='flex justify-between items-center mb-8'>
                                <h2 className='text-2xl font-semibold text-white'>
                                    {filteredGyms.length} {filteredGyms.length === 1 ? 'Gym' : 'Gyms'} Available
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGyms.map((gym) => (
                                    <div 
                                        key={gym._id} 
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        {/* Gym Image with overlay */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={gym.gymImages[0] || 'https://via.placeholder.com/400x300?text=Gym'} 
                                                alt={gym.gymName}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="text-xl font-bold text-white">{gym.gymName}</h3>
                                            </div>
                                        </div>

                                        {/* Gym Details */}
                                        <div className="p-6">
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <FiMapPin className="mr-2" />
                                                <span>{gym.location.area}, {gym.location.city}</span>
                                            </div>
                                            
                                            {/* Equipment tags */}
                                            <div className="mb-4">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <span className="font-medium">Equipment:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {gym.equipments.slice(0, 3).map((equipment, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                                                        >
                                                            {equipment}
                                                        </span>
                                                    ))}
                                                    {gym.equipments.length > 3 && (
                                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                            +{gym.equipments.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* View Button */}
                                            <button 
                                                onClick={() => handleNavigation(gym._id)}
                                                className="w-full flex items-center justify-center bg-lime-400 hover:bg-lime-500 cursor-pointer text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                            >
                                                View Details
                                                <FiArrowRight className="ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredGyms.length === 0 && (
                                <div className="text-center py-20">
                                    <h3 className="text-xl font-medium text-gray-700 mb-2">No gyms found</h3>
                                    <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Gyms;