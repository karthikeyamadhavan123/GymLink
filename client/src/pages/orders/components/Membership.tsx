import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Memberships() {
  const router = useNavigate();

  const memberships = [
    {
      title: "Monthly Membership",
      price: "₹999",
      duration: "1 Month",
      description: "Access to all GymLink facilities with flexible short-term commitment.",
      icon: "📅"
    },
    {
      title: "Quarterly Membership",
      price: "₹2499",
      duration: "3 Months",
      description: "Save more with a 3-month package, includes all basic amenities.",
      icon: "📆"
    },
    {
      title: "Annual Membership",
      price: "₹7999",
      duration: "12 Months",
      description: "Best value for regulars. Unlimited gym access for a full year.",
      icon: "🏆"
    }
  ];

  const addOns = [
    {
      title: "Personal Training Plans",
      price: "Starts at ₹4999",
      description: "Tailored 1-on-1 programs designed around your fitness goals.",
      icon: "💪",
      link: "/orders/plan"
    },
    {
      title: "Elite Training",
      price: "Starts at ₹7999",
      description: "Exclusive coaching with certified trainers, nutritionists & performance experts.",
      icon: "🔥",
      link: "/orders/elite"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-lime-400 p-6 sm:p-8 font-stencil">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 
            bg-gradient-to-r from-white via-lime-400 to-white 
            bg-clip-text text-transparent animate-pulse">
            Memberships and Pricing.
          </h1>
          <div className="w-44 h-1 bg-gradient-to-r from-lime-400 to-white mx-auto rounded-full"></div>
        </div>

        {/* GymLink Membership Plans */}
        <h2 className="text-2xl font-semibold text-lime-300 mb-6 text-center">GymLink Membership Plans</h2>
        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {memberships.map((plan, index) => (
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
              <p className="text-lime-400 font-bold mb-4">{plan.price} / {plan.duration}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router("/subscription")}
                className="w-full px-4 py-2 bg-gradient-to-r from-lime-400 to-white 
                  text-black font-semibold rounded-lg 
                  hover:from-white hover:to-lime-300 
                  transition-all duration-300"
              >
                🚀 Join Now
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons */}
        <h2 className="text-2xl font-semibold text-lime-300 mb-6 text-center">Training Add-Ons</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {addOns.map((addon, index) => (
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
                <span className="text-3xl">{addon.icon}</span>
                <h3 className="text-xl font-semibold text-lime-300">{addon.title}</h3>
              </div>
              <p className="text-gray-100/80 mb-2">{addon.description}</p>
              <p className="text-lime-400 font-bold mb-4">{addon.price}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router(addon.link)}
                className="w-full px-4 py-2 bg-gradient-to-r from-lime-400 to-white 
                  text-black font-semibold rounded-lg 
                  hover:from-white hover:to-lime-300 
                  transition-all duration-300"
              >
                🔗 Explore {addon.title}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer Accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-lime-400/60 text-sm">
            <div className="w-8 h-px bg-lime-400/40"></div>
            <span>GymLink Membership Options</span>
            <div className="w-8 h-px bg-lime-400/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
