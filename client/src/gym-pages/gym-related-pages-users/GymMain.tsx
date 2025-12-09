import Sidebar from "@/components/Sidebar";
import Gyms from "@/gym-pages/gym-related-pages-users/Gyms";
import useUserStore from "@/zustand";

const GymMain = () => {
  const role = useUserStore((state) => state.details?.role);

  return (
    <div className="h-screen w-full flex bg-black overflow-hidden">
      <div className="h-full">
        <Sidebar role={role} />
      </div>
      <div className="flex-1 h-full overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <Gyms />
      </div>

    </div>
  );
};

export default GymMain;
