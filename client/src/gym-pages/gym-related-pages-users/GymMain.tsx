import Sidebar from "@/components/Sidebar";
import Gyms from "@/gym-pages/gym-related-pages-users/Gyms";
import { motion } from "framer-motion";

const GymMain = () => {
  return (
    <div className="flex bg-black h-screen overflow-hidden">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <Sidebar />
      </motion.div>
      <motion.div
        className="flex-1 overflow-auto"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        <Gyms />
      </motion.div>

    </div>
  );
};

export default GymMain;
