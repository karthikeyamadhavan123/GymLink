import  { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Path = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })
    
    // Image scale animation - starts at 1 (100%) and decreases to 0.8 (80%)
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

    return (
        <div ref={ref} className='text-white min-h-[60vh] w-full px-4 sm:px-6 md:px-10 lg:px-20 py-12 mx-auto overflow-hidden'>
            <div className='flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-20 md:flex-row'>
                {/* Text section - visible immediately, centered on small screens */}
                <motion.div 
                    className='text flex flex-col space-y-1 sm:space-y-2 md:space-y-3 
                              text-3xl sm:text-5xl md:text-6xl lg:text-8xl 
                              w-full lg:w-1/2
                              text-center md:text-left'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{duration:1}}
                >
                    <h1 className='font-bold'>UNLOCK</h1>
                    <h1 className='font-bold'>CHOOSE</h1>
                    <h1 className='text-[#8fe60f] line-through font-bold'>TRAIN.</h1>
                </motion.div>
                
                {/* Image section with better responsiveness */}
                <motion.div 
                    className='w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0'
                    style={{ scale: imageScale }}
                >
                    <img
                        src='/lift.jpg' 
                        width={400} 
                        height={400} 
                        alt='lift' 
                        className='rounded-lg hover:scale-105 cursor-pointer transition-all ease-in-out
                                  w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96
                                  object-cover' loading='lazy'
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Path