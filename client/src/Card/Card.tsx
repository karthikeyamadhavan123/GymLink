import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from "react";

interface FitnessStoryProps {
  storyNumber: string;
  description: string;
  image: string;
}

const FitnessStory: React.FC<FitnessStoryProps> = ({ storyNumber, description, image }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <motion.div 
      className="relative mb-16" 
      ref={ref} 
      style={{ opacity: opacity }} 
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      {/* Large Number - Smaller on xs screens */}
      <motion.div 
        className="absolute left-0  xs:-top-14 text-[80px] xs:text-[100px] sm:text-[120px] md:text-[180px] font-bold text-gray-200 leading-none opacity-90 z-10" 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ amount: 'all' }} 
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        {storyNumber}
      </motion.div>

      {/* Content Container */}
      <div className="relative z-20 mt-12 xs:mt-14 sm:mt-16 xs:flex xs:flex-col xs:items-center xs:justify-center">
        {/* Simple Card for xs to sm screens */}
        <div className="md:hidden bg-gray-100 xs:w-96 p-4 xs:p-6 rounded-lg">
          <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Original Design for md and above */}
        <div className="hidden md:flex flex-row w-full">
          {/* Text Container with Clip Path */}
          <div className="w-[55%] relative">
            <div className="bg-gray-100 min-h-[15rem] h-auto p-8 pr-16 relative">
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
              <div
                className="absolute right-0 top-0 bottom-0 w-32 h-full bg-lime-300 opacity-90"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 60% 50%)"
                }}
              ></div>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-[45%] pl-6">
            <div className="h-60 w-full overflow-hidden relative">
              <img
                src={image}
                alt={`Fitness story ${storyNumber}`}
                className="w-full h-full object-cover rounded-tl-lg"
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FitnessStory;