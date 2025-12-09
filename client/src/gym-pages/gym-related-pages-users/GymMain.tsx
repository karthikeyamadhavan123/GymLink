import Sidebar from "@/components/Sidebar";
import Gyms from "@/gym-pages/gym-related-pages-users/Gyms";
import useUserStore from "@/zustand";

const GymMain = () => {
  const role = useUserStore((state) => state.details?.role)
  return (
    <div className="flex bg-black h-screen overflow-hidden">
      <div
      >
        <Sidebar role={role} />
      </div>
      <div
      >
        <Gyms />
      </div>

    </div>
  );
};

export default GymMain;
