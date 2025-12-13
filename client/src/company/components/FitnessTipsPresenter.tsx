import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Dumbbell, Heart, Moon, Star, Utensils } from 'lucide-react';
import { FitnessTipPropsPresenter } from '@/types'; 
import type { Variants } from "framer-motion";

const FitnessTipsPresenter = ({
  categories,
  selectedCategory,
  filteredTips,
  hoveredTip,
  onCategoryChange,
  onHoverStart,
  onHoverEnd,
  onGetStarted
}: FitnessTipPropsPresenter) => {
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1
        delayChildren: 0.1
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { y: 10, opacity: 0 }, // Reduced from y: 20
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150, // Increased for faster animation
        damping: 20
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Dumbbell': return Dumbbell;
      case 'Heart': return Heart;
      case 'Moon': return Moon;
      case 'Star': return Star;
      case 'Utensils': return Utensils;
      default: return Star;
    }
  };

  return (
    <div 
      className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-stencil"
      style={{ scrollBehavior: 'auto' }} // Fix 3: Disable smooth scrolling
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Reduced from y: -30
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} // Reduced from 0.8
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3, // Increased from 2
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 1 // Add delay between rotations
              }}
              className="mr-4"
            >
              <Dumbbell className="w-12 h-12 text-lime-400" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Fitness Tips
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your fitness journey with expert advice and proven strategies for success
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} // Reduced from y: 20
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }} // Reduced delay and duration
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-lime-400 border-blue-500 text-black shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.03 }} // Reduced from 1.05
                whileTap={{ scale: 0.97 }} // Reduced from 0.95
                layout={false} // Fix 4: Disable layout animations on buttons
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tips Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout={false} // Fix 5: Disable layout animations on grid
          >
            {filteredTips.map((tip) => {
              const TipIconComponent = getIconComponent(
                typeof tip.icon === "string" ? tip.icon : (tip.icon.name ?? "")
              );
              return (
                <motion.div
                  key={tip.id}
                  variants={itemVariants}
                  className={`relative group cursor-pointer bg-linear-to-br ${tip.bgGradient} backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-300`}
                  onHoverStart={() => onHoverStart(tip.id)}
                  onHoverEnd={onHoverEnd}
                  whileHover={{ 
                    scale: 1.01, // Reduced from 1.02
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  layout={false} // Fix 6: Disable layout animations on cards
                  style={{ 
                    minHeight: '300px', // Fix 7: Set consistent minimum height
                    willChange: 'transform' // Optimize for animations
                  }}
                >
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gray-800/50 ${tip.color}`}>
                        <TipIconComponent className="w-6 h-6" />
                      </div>
                      <motion.div
                        animate={{ x: hoveredTip === tip.id ? 3 : 0 }} // Reduced from 5
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6">
                      {tip.description}
                    </p>

                    {/* Tips List */}
                    <div className="space-y-3">
                      {tip.tips.map((individualTip, tipIndex) => (
                        <motion.div
                          key={tipIndex}
                          initial={{ opacity: 0, x: -5 }} // Reduced from x: -10
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: Math.min(tipIndex * 0.05, 0.3), // Cap delay at 0.3s
                            duration: 0.3
                          }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-2 h-2 rounded-full ${tip.color.replace('text', 'bg')} mt-2 shrink-0`} />
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {individualTip}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Reduced from y: 30
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }} // Reduced delay and duration
          className="text-center mt-20"
        >
          <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Remember, consistency is key. Start small, stay committed, and celebrate your progress along the way.
            </p>
            <motion.button
              className="bg-lime-400 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              whileHover={{ scale: 1.03 }} // Reduced from 1.05
              whileTap={{ scale: 0.97 }} // Reduced from 0.95
              onClick={onGetStarted}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FitnessTipsPresenter;