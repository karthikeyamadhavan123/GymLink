import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from "react";
interface FitnessStoryProps {
  storyNumber: string;
  description: string;
  image: string;
}

// work on motion
const FitnessStory: React.FC<FitnessStoryProps> = ({ storyNumber, description, image }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity=useTransform(scrollYProgress,[0,0.2,0.8,1],[0,1,1,0])
  const translateY = useTransform(scrollYProgress,[0,0.5,1],[50,0,-50])
  return (
    <motion.div className="flex flex-row items-center justify-between mb-16 relative" ref={ref} style={{opacity:opacity,y:translateY}} transition={{duration:2,ease:'easeInOut'}}>
      {/* Large Number */}
      <motion.div className="absolute left-0 -top-10 text-[120px] sm:text-[150px] md:text-[180px] font-bold text-gray-200 leading-none opacity-90 z-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 'all' }} transition={{duration:1.5,ease:'easeInOut'}}>
        {storyNumber}
      </motion.div>

      {/* Content Container */}
      <div className="relative flex flex-row w-full z-20 mt-12">
        {/* Text Container with Clip Path */}
        <div className="w-full md:w-[55%] relative">
          <div className="bg-gray-100 min-h-[15rem] h-auto p-4 sm:p-6 md:p-8 pr-12 sm:pr-16 relative">
            <p className="text-gray-700 leading-relaxed z-30 relative">
              {description}
            </p>

            {/* Green clip path element */}
            <div
              className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 h-full bg-lime-300 opacity-90"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 60% 50%)"
              }}
            ></div>
          </div>
        </div>

        {/* Image Container - Hidden on small screens */}
        <div className="hidden md:block w-[35%] pl-6">
          <div className="h-60 overflow-hidden relative">
            <img
              src={image}
              alt={`Fitness story ${storyNumber}`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="rounded-tl-lg"
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FitnessStory;