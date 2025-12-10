import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChatModal from "@/gym-pages/chats/ChatModal";
import { GymProps } from "@/gym-pages/gym-related-pages-users/types/types";
import { GYM_ENDPOINTS } from "@/constants/gymApiEndpoints";
import useGyms from "@/hooks/useGyms";
import { Helmet } from "react-helmet-async";
import GymCard from "./components/GymCard";
import Loading from "@/utils/Loading";
import ErrorMessage from "@/utils/Error";
import SearchModal from "./components/SearchModal";
import { Bell } from "lucide-react";
import NotificationModal from "./components/NotificationModal";
import { useNotifications } from "./hooks/useNotifications";


const Gyms = () => {

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { data, loading, error } = useGyms(GYM_ENDPOINTS.GET_ALL_GYMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showsearchModal, setsearchModal] = useState(false);
  const [notificationModal, setnotificationModal] = useState(false);
  const router = useNavigate();
  const { numberOfUnreadMessages } = useNotifications()

  if (loading) return <Loading />;

  if (error) return <ErrorMessage message={error} />;

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === "m") {
      setsearchModal(true);
    } else if (e.key === "Escape") {
      setsearchModal(false);
    }
  };

  const onClose = () => {
    setnotificationModal(false);
  };


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
        <meta property="og:title" content="Find the Best Gyms Near You - GymLink." />
        <meta
          property="og:description"
          content="Discover the best gyms in your locality, explore facilities, and connect with top trainers through GymLink."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-black font-stencil">

        {/* HEADER */}
        <div className="w-full py-4 px-4 sm:px-6 border-b border-gray-800 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between sticky top-0 bg-black/80 backdrop-blur-md z-30">

          <h1 className="text-white text-2xl sm:text-xl font-bold text-center sm:text-left">
            Find the Perfect Gym Around You!
          </h1>

          <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-end">

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search gyms…"
                className="pl-10 pr-16 py-2 bg-gray-900 text-white border border-gray-700
                           rounded-lg focus:ring-2 focus:ring-lime-300 focus:border-transparent
                           w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px]
                            bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700
                            hidden sm:block">
                Ctrl M
              </div>
            </div>

            {/* Notification */}
            <button
              className="relative p-2 rounded-lg bg-gray-900 border border-gray-700 hover:border-lime-400
             transition-all cursor-pointer"
              onClick={() => setnotificationModal(true)}
            >
              <Bell size={24} color="#fff" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold
                     w-5 h-5 flex items-center justify-center rounded-full
                      shadow-lg">
                  {numberOfUnreadMessages()}
                </span>
            </button>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">

          <h2 className="text-white text-lg sm:text-xl font-semibold mb-6">
            {filteredGyms.length} {filteredGyms.length === 1 ? "Gym" : "Gyms"} Available
          </h2>

          {/* GYM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym: GymProps) => (
              <GymCard
                key={gym._id}
                gym={gym}
                onClick={() => handleNavigation(gym._id)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredGyms.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-lg sm:text-xl text-gray-400 mb-2">No gyms found</h3>
              <p className="text-gray-600">Try searching with different terms.</p>
            </div>
          )}

          {showsearchModal && <SearchModal />}
          {notificationModal && <NotificationModal onClose={onClose} />}
          {error && <h1 className="text-red-400 text-3xl font-bold text-center">{error}</h1>}

          <ChatModal />
        </div>
      </div>
    </>
  );
};

export default Gyms;
