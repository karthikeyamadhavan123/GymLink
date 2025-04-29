import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiMapPin, FiArrowRight, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { HashLoader } from 'react-spinners';
import EditGymForm from './EditForm';
interface GymProps {
    _id: string;
    gymName: string;
    equipments: string[];
    basePrice: number;
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

const gymUrl = import.meta.env.VITE_DB_URL + '/gym/all/admin'
const AdminGyms = () => {
    const [gyms, setGyms] = useState<GymProps[]>([]);
    const [editGymDetails, seteditGymDetails] = useState<GymProps>()
    const [editModal, setEditModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();
    const handleNavigation = (id: string) => {
        router(`/${id}/job/add`);
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
            gym.equipments.some(eq => eq.toLowerCase().includes(searchLower)) || gym.basePrice.toString().includes(searchLower)
        )
    });

    const handleEdit = async (gym: GymProps) => {
        seteditGymDetails(gym)
        setEditModal(true)
    }
    const handleSaveGym = (updatedGym: GymProps) => {
        setGyms(gyms.map(gym => gym._id === updatedGym._id ? updatedGym : gym));
    };
    const handleCloseModal = () => {
        setEditModal(false);
        seteditGymDetails(undefined);
    };

    const handleDeletion = async (id: string) => {
        if (!id) {
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.delete(`${import.meta.env.VITE_DB_URL}/gym/${id}/delete`, { withCredentials: true })
            if (response.status === 200) {
                setGyms(gyms.filter(gym => gym._id !== id));
            }

        } catch (error) {
            console.log(error);

        }
        finally {
            setIsLoading(false);
        }

    }
    const navigateToAddGym = () => {
        router('/add/new-gym');
    }
    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Manage Your Gyms | GymLink</title>
                <meta name="description" content="Admin dashboard to manage your gyms, update information, and monitor performance on GymLink." />
                <meta name="keywords" content="GymLink, admin dashboard, gym management, fitness business" />
                <meta property="og:title" content="Admin Dashboard - Manage Your Gyms | GymLink" />
                <meta property="og:description" content="Efficiently manage your gym listings and operations through the GymLink admin dashboard." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className='h-full font-stencil bg-black'>
                {/* Hero Section */}
                <div className=' text-white py-16 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-7xl mx-auto text-center'>
                        <h1 className='text-4xl font-bold mb-6'>Manage Your Gyms</h1>
                        <p className='text-xl mb-8'>View, edit, and manage all your registered gym listings in one place.</p>

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
                            <HashLoader size={20} color='#fff' />
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
                                            {/* Price Badge */}
                                            <div className="absolute top-4 right-4 bg-lime-400 text-black font-bold py-1 px-3 rounded-full">
                                                ₹{gym.basePrice}/month
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

                                            {/* Admin Action Buttons */}
                                            <div className="flex gap-2 mb-4">
                                                <button
                                                    className="flex-1 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition-colors duration-300 cursor-pointer" onClick={() => handleEdit(gym)}
                                                >
                                                    <FiEdit className="mr-1" /> Edit
                                                </button>
                                                <button
                                                    className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-colors duration-300 cursor-pointer"
                                                    onClick={() => handleDeletion(gym._id)}
                                                >
                                                    <FiTrash2 className="mr-1" /> Delete
                                                </button>
                                            </div>

                                            {/* View Button */}
                                            <button
                                                onClick={() => handleNavigation(gym._id)}
                                                className="w-full flex items-center justify-center bg-lime-400 hover:bg-lime-500 cursor-pointer text-white py-2 px-4 rounded-lg transition-colors duration-300"
                                            >
                                                Add a Job
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
                {
                    editModal && editGymDetails && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">Edit Gym Details</h2>
                                        <button
                                            onClick={handleCloseModal}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <EditGymForm
                                        gym={editGymDetails}
                                        onSave={handleSaveGym}
                                        onClose={handleCloseModal}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
                <div
                    className="fixed bottom-8 right-8 z-30 bg-lime-400 hover:bg-lime-500 text-white rounded-full shadow-lg p-4 cursor-pointer transition-all duration-300 flex items-center justify-center"
                    onClick={navigateToAddGym}
                >
                    <FiPlus className="text-2xl" />
                    <span className="ml-2 font-medium">Add New Gym</span>
                </div>
            </div>
        </>
    );
};

export default AdminGyms;