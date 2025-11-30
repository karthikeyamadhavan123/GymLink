import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CommentPresenterProps } from './types/types'
const CommentPresenter: React.FC<CommentPresenterProps> = ({ comment }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <div className='relative' ref={ref}>
            <motion.div
                className="relative mb-8 sm:mb-12 lg:mb-16"
                style={{ opacity }}
                transition={{ duration: 2, ease: 'easeInOut' }}
            >
                {/* Large Number Background */}
                <motion.div
                    className="absolute left-2 -top-2 sm:left-0 sm:-top-8 md:-top-12 lg:-top-16 
                          text-[45px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[200px] 
                          font-bold text-gray-200 leading-none opacity-90 z-10 select-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3, once: true }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                    {comment.storyNumber}
                </motion.div>

                {/* Content Container */}
                <div className="relative z-20 mt-6 sm:mt-12 md:mt-16 lg:mt-20">

                    {/* Mobile & Tablet Layout (xs to lg) */}
                    <div className="xl:hidden">
                        <motion.div
                            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl lg:rounded-2xl 
                                  p-3 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300
                                  max-w-full overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3, once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Image for mobile/tablet - made smaller */}
                            <div className="mb-3 sm:mb-6 w-full">
                                <div className="aspect-[4/3] sm:aspect-video overflow-hidden rounded-md sm:rounded-lg lg:rounded-xl">
                                    <img
                                        src={comment.image}
                                        alt={`Fitness transformation story ${comment.storyNumber}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="space-y-1 sm:space-y-2">
                                <div className="text-xs sm:text-sm font-medium text-lime-600 uppercase tracking-wide">
                                    Story #{comment.storyNumber}
                                </div>
                                <p className="text-gray-700 text-xs sm:text-base lg:text-lg leading-relaxed">
                                    {comment.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop Layout (xl and above) */}
                    <div className="hidden xl:block">
                        <motion.div
                            className="flex flex-row w-full gap-6" /* Added gap for spacing */
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.3, once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            {/* Text Container with Clip Path - made smaller */}
                            <div className="w-[52%] relative"> {/* Reduced width */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-[16rem] h-auto 
                                          p-6 xl:p-8 pr-16 relative overflow-hidden rounded-l-2xl 
                                          shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="space-y-3">
                                        <div className="text-sm font-medium text-lime-600 uppercase tracking-wide">
                                            Story #{comment.storyNumber}
                                        </div>
                                        <p className="text-gray-700 text-base xl:text-lg leading-relaxed">
                                            {comment.description}
                                        </p>
                                    </div>

                                    {/* Animated Clip Path Element */}
                                    <motion.div
                                        className="absolute right-0 top-0 bottom-0 w-24 h-full bg-gradient-to-r 
                                             from-lime-400 to-lime-300 opacity-15"
                                        style={{
                                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 60% 50%)"
                                        }}
                                        initial={{ x: 20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 0.9 }}
                                        viewport={{ amount: 0.3, once: true }}
                                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                                    />
                                </div>
                            </div>

                            {/* Image Container - made smaller */}
                            <motion.div
                                className="w-[42%] pl-0" /* Reduced width */
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ amount: 0.3, once: true }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            >
                                <div className="h-64 xl:h-72 w-full overflow-hidden relative rounded-r-2xl 
                                          shadow-lg hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={comment.image}
                                        alt={`Fitness transformation story ${comment.storyNumber}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Subtle overlay for better text contrast if needed */}
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CommentPresenter;