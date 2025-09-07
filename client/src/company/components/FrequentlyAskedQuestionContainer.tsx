// FrequentlyAskedQuestion.tsx
import useFrequentQuestion from "@/hooks/useFrequentQuestion";
import { HashLoader } from "react-spinners";
import FrequentlyAskedQuestionPresenter from "./FrequentlyAskedQuestionPresenter";
import { useState } from "react";

const FrequentlyAskedQuestion = () => {
    const { loading, questions, error } = useFrequentQuestion();
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setOpenQuestionId(prevId => prevId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="bg-white py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
                        <div className="flex flex-col items-center space-y-4">
                            <HashLoader size={20} color="#10b981" />
                            <p className="text-gray-500 text-sm sm:text-base animate-pulse">
                                Loading questions...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-sm sm:text-base mb-2">
                                Failed to load questions.
                            </div>
                            <div className="text-gray-600 text-xs sm:text-sm">
                                {error}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black font-stencil py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-lime-300 underline mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-100 text-lg">
                        Find answers to common questions below
                    </p>
                </div>
                {questions.map((question) => (
                    <FrequentlyAskedQuestionPresenter 
                        {...question} 
                        key={question.id} 
                        isOpen={openQuestionId === question.id} 
                        toggleOpen={toggleQuestion} 
                    />
                ))}
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestion;