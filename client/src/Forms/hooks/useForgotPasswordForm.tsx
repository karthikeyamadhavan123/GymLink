import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const FP_URL = import.meta.env.VITE_DB_URL + '/api/users/forgot-password';

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(FP_URL, { email });

            if (response.status === 200) {
                toast.success('Reset Email sent successfully');
                setEmail('');
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        loading,
        handleEmailChange,
        handleSubmit
    };
};