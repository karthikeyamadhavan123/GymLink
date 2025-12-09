import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch} from "react-icons/fi";
import { HashLoader } from "react-spinners";
import ChatModal from "@/gym-pages/chats/ChatModal";
import { GymProps } from "@/gym-pages/gym-related-pages-users/types/types";
import { GYM_ENDPOINTS } from "@/constants/gymApiEndpoints";
import useGyms from "@/hooks/useGyms";
import { Helmet } from "react-helmet-async";
import GymCard from "./components/GymCard";

const Gyms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useNavigate();

  const { data, loading, error } = useGyms(GYM_ENDPOINTS.GET_ALL_GYMS);

  const handleNavigation = (id: string) => {
    router(GYM_ENDPOINTS.GET_GYM_BY_ID(id));
  };

  const filteredGyms = data.filter((gym: GymProps) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      gym.gymName.toLowerCase().includes(searchLower) ||
      gym.location.city.toLowerCase().includes(searchLower) ||
      gym.location.area.toLowerCase().includes(searchLower) ||
      gym.equipments.some((eq) => eq.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <Helmet>
        <title>Find the Best Gyms Near You | GymLink</title>
        <meta
          name="description"
          content="Explore top gyms in your area, find the best trainers, and start your fitness journey with GymLink."
        />
        <meta
          name="keywords"
          content="GymLink, gyms near me, fitness, workout, best gyms, personal trainers."
        />
        <meta
          property="og:title"
          content="Find the Best Gyms Near You - GymLink."
        />
        <meta
          property="og:description"
          content="Discover the best gyms in your locality, explore facilities, and connect with top trainers through GymLink."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="h-full font-stencil bg-black">
        {/* Hero Section */}
        <div className=" text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Find Your Perfect Gym</h1>
            <p className="text-xl mb-8">
              Discover top-rated fitness centers with the best equipment and
              trainers in your area
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by gym name, location, or equipment..."
                className="block w-full pl-10 pr-3 py-4 border  rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent border-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <HashLoader size={20} color="#fff" />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  {filteredGyms.length}{" "}
                  {filteredGyms.length === 1 ? "Gym" : "Gyms"} Available
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGyms.map((gym: GymProps) => (
                  <GymCard
                    key={gym._id}
                    gym={gym}
                    onClick={() => handleNavigation(gym._id)}
                  />
                ))}
              </div>

              {filteredGyms.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No gyms found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {error && (
          <h1 className="text-red-400 font-bold text-3xl text-center">
            {error}
          </h1>
        )}
        <ChatModal />
      </div>
    </>
  );
};

export default Gyms;
