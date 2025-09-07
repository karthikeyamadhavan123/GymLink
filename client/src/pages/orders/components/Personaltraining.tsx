import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PersonalTraining() {
  const router = useNavigate();

  const plans = [
    {
      title: "Weight Loss Program",
      duration: "12 Weeks",
      description: "Structured workouts and nutrition tips to help you burn fat effectively.",
      icon: "🔥"
    },
    {
      title: "Muscle Gain Program",
      duration: "16 Weeks",
      description: "Progressive strength training plan to build lean muscle mass.",
      icon: "💪"
    },
    {
      title: "General Fitness",
      duration: "Ongoing",
      description: "Balanced routines to improve overall fitness, flexibility, and stamina.",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-lime-400 p-6 sm:p-8 font-stencil">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 
            bg-gradient-to-r from-white via-lime-400 to-white 
            bg-clip-text text-transparent animate-pulse">
            Personal Training Plans
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-400 to-white mx-auto rounded-full"></div>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-100/90 text-center mb-10 sm:text-lg"
        >
          Get <span className="text-lime-300 font-semibold">tailored training plans</span> designed 
          around your fitness goals and schedule.
        </motion.p>

        {/* Plans */}
        <div className="grid gap-6 sm:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(132, 204, 22, 0.4)" }}
              className="bg-gray-900/40 border border-lime-400/30 rounded-xl 
              p-6 transition-all duration-300"
            >
              <div className="flex items-center mb-4 space-x-3">
                <span className="text-3xl">{plan.icon}</span>
                <h3 className="text-xl font-semibold text-lime-300">{plan.title}</h3>
              </div>
              <p className="text-gray-100/80 mb-2">{plan.description}</p>
              <p className="text-sm text-lime-400/80 mb-4">{plan.duration}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router("/subscription")}
                className="w-full px-4 py-2 bg-gradient-to-r from-lime-400 to-white 
                  text-black font-semibold rounded-lg 
                  hover:from-white hover:to-lime-300 
                  transition-all duration-300"
              >
                🚀 Join {plan.title}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer Accent */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-2 text-lime-400/60 text-sm">
            <div className="w-8 h-px bg-lime-400/40"></div>
            <span>GymLink Training</span>
            <div className="w-8 h-px bg-lime-400/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
