import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const useResetPasswordForm = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const RP_URL = import.meta.env.VITE_DB_URL + `/api/users/reset-password/${token}`;

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(RP_URL, { password });
            if (response.status === 200) {
                toast.success("Password reset successfully");
                setPassword("");
                setConfirmPassword("");

                setTimeout(() => {
                    navigate('/api/auth/login');
                }, 1000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return {
        password,
        confirmPassword,
        loading,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleSubmit
    };
};