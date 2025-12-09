import { FiSearch } from "react-icons/fi";

const SearchModal = () => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-xl rounded-2xl shadow-lg border border-zinc-700 p-6">

        <div className="flex items-center gap-3 mb-4">
          <FiSearch className="text-lime-300 text-xl" />
          <h2 className="text-white text-lg font-semibold">Search Gyms</h2>
        </div>

        <input
          type="text"
          placeholder="Search by gym name, city, area, or equipment..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-300"
        />

        <div className="flex justify-end mt-4">
          <p className="text-gray-400 text-xs">Press ESC to close</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
