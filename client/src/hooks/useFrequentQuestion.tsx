import { useState, useEffect } from "react";
import type { QuestionBase } from "@/types";
import { faqData } from "@/utils/question"

// Data fetching hook - separates concerns
const useFrequentQuestion = () => {
    const [questions, setQuestions] = useState<QuestionBase[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFrequentQuestion =() => {
            try {
                // In a real app, this would be an API call
                // Simulating API fetch with timeout
                setLoading(true);
                setQuestions(faqData);
            } catch (err) {
                setError("Failed to load questions");
                setLoading(false);
            }
            finally{
                setLoading(false)
            }
        };

        fetchFrequentQuestion();
    }, []);

    return { questions, loading, error };
};
export default useFrequentQuestion ;
