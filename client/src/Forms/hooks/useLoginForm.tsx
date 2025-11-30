import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import useUserStore from "@/zustand";

export const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useNavigate();
    const loginUrl = import.meta.env.VITE_DB_URL + '/api/users/login';
    const setUserDetails = useUserStore((state: any) => state.setUserDetails);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(loginUrl, { email, password }, { withCredentials: true });         
            if (response.status === 200) {
                const userData = response.data.details;
                setUserDetails({
                    firstName: userData.firstName,
                    avatar: userData.avatar,
                    role: userData.role || "user",
                    location: userData.location || "",
                    phone_number: userData.phone_number || "",
                    email: userData.email,
                    userId: userData.userId,
                    gender: userData.gender
                });

                toast.success('Login Successful');
                setEmail('');
                setPassword('');

                setTimeout(() => {
                    if (userData.role === 'admin') {
                        router('/admin-dashboard');
                    } else {
                        router('/dashboard/gyms');
                    }
                }, 1000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        loading,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit
    };
};

