// TopTrainerContainer.tsx
import { useEffect, useState } from "react";
import TopTrainerPresenter from "./TopTrainerPresenter";
import { trainers } from "@/utils/TrainerDetails";
import { Award, TrendingUp, Users } from "lucide-react";

const TopTrainerContainer = () => {
  const [activeTrainer, setActiveTrainer] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTrainer((prev) => (prev + 1) % trainers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-stencil">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-lime-300/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-lime-300/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
        {/* Header Section */}
        <div className={`text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-lime-300 mb-2 sm:mb-3 md:mb-4 lg:mb-6 tracking-tight px-2">
            Top Trainers
          </h1>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 h-1 bg-gradient-to-r from-lime-300 to-emerald-400 mx-auto mb-2 sm:mb-3 md:mb-4 lg:mb-6 rounded-full"></div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Meet our elite fitness professionals who transform lives through expertise, dedication, and results
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 transform transition-all duration-1000 delay-300 px-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { icon: Users, label: "Active Students", value: "8K+", color: "text-lime-300" },
            { icon: Award, label: "Certifications", value: "150+", color: "text-emerald-400" },
            { icon: TrendingUp, label: "Success Rate", value: "96%", color: "text-green-400" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg md:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 text-center">
              <div className="flex justify-center mb-1 sm:mb-2 md:mb-3">
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 ${stat.color}`} />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <TopTrainerPresenter
          trainers={trainers} 
          activeTrainer={activeTrainer}
          setActiveTrainer={setActiveTrainer}
        />
      </div>
    </div>
  );
};

export default TopTrainerContainer;