import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";
import { GymProps, SearchModalProps } from "../types/types";
import { Link } from "react-router-dom";

const SearchModal: React.FC<SearchModalProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("")

  //convert this into backend connected component

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-xl rounded-2xl shadow-xl border border-zinc-700 p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <FiSearch className="text-lime-300 text-2xl" />
          <h2 className="text-white text-xl font-semibold">Search Gyms</h2>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by gym name, city, area, or equipment..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white 
                 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300 mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Results */}
        {searchTerm !== "" && searchTerm.trim() !== "" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGyms.map((gym: GymProps) => (
              <div
                key={gym._id}
                className="bg-zinc-800 border border-zinc-700 hover:border-lime-300 
                   transition-all duration-200 rounded-xl p-3 flex flex-col gap-3 cursor-pointer"
              >
                {/* Gym Image */}
                <img
                  src={gym.gymImages[0]}
                  alt={gym.gymName}
                  className="w-full h-28 object-cover rounded-lg"
                />

                {/* Gym Name */}
                <Link to={`/gym/${gym._id}`} target="_blank" className="text-white font-semibold text-sm">{gym.gymName}</Link>

                {/* Location */}
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  📍 {gym.location.area}, {gym.location.city}
                </p>

                {/* Equipments Preview */}
                <p className="text-gray-500 text-xs">
                  {gym.equipments.slice(0, 3).join(", ")}
                  {gym.equipments.length > 3 && " ..."}
                </p>
              </div>
            ))}
          </div>
        )}


        {/* Empty State */}
        {filteredGyms.length === 0 && searchTerm.trim() !== "" && (
          <div className="text-center py-16">
            <h3 className="text-lg text-gray-300 font-medium">No gyms found</h3>
            <p className="text-gray-500 text-sm mt-1">Try searching with different keywords.</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <p className="text-gray-500 text-xs">Press ESC to close</p>
        </div>
      </div>
    </div>

  );
};

export default SearchModal;
