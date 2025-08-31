// FrequentlyAskedQuestionPresenter.tsx
import { FrequentlyAskedQuestionPresenterProps } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FrequentlyAskedQuestionPresenter = ({
    id,
    icon,
    question,
    answer,
    isOpen,
    toggleOpen
}: FrequentlyAskedQuestionPresenterProps) => {
 
    return (
        <motion.div
            layout
            className="w-full bg-gray-800 rounded-lg overflow-hidden mb-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: id * 0.1 }}
        >
            <motion.button
                layout
                className="flex items-center justify-between w-full p-4 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50"
                onClick={() => toggleOpen(id)}
                aria-expanded={isOpen}
                aria-controls={`answer-${id}`}
            >
                <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="text-lime-400">
                        {React.createElement(icon, { size: 20 })}
                    </div>
                    <span className="text-sm md:text-base font-medium text-white">
                        {question}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white ml-4"
                >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`answer-${id}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                            opacity: 1, 
                            height: "auto",
                            transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.4, delay: 0.1 }
                            }
                        }}
                        exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                                height: { duration: 0.3 },
                                opacity: { duration: 0.2 }
                            }
                        }}
                        className="px-4 pb-4 md:px-6 md:pb-6"
                    >
                        <div className="pt-2 border-t border-gray-700">
                            <p className="text-gray-300 text-sm md:text-base">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FrequentlyAskedQuestionPresenter;