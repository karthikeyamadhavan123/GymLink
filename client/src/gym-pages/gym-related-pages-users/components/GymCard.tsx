import { FiMapPin, FiArrowRight } from "react-icons/fi";
import GymCardProps from "@/gym-pages/gym-related-pages-users/types/types";



const GymCard = ({ gym, onClick }: GymCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={
                        gym.gymImages[0] ||
                        "https://via.placeholder.com/400x300?text=Gym"
                    }
                    alt={gym.gymName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{gym.gymName}</h3>
                </div>
            </div>

            {/* Details */}
            <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="mr-2" />
                    <span>
                        {gym.location.area}, {gym.location.city}
                    </span>
                </div>

                {/* Equipments */}
                <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                        <span className="font-medium">Equipment:</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {gym.equipments.slice(0, 3).map((eq, idx) => (
                            <span
                                key={idx}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                            >
                                {eq}
                            </span>
                        ))}

                        {gym.equipments.length > 3 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                +{gym.equipments.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={onClick}
                    className="w-full flex items-center justify-center bg-lime-400 hover:bg-lime-500 cursor-pointer text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    View Details <FiArrowRight className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default GymCard;
