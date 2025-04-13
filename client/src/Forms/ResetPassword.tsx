import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ResetPassword = () => {

    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()
    const RP_URL =
        import.meta.env.VITE_DB_URL + `/api/users/reset-password/${token}`;
    const [loading, setLoading] = useState(false);

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
            }
            setTimeout(() => {
                navigate('/api/auth/login')
            }, 1000)

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Reset Password | GymLink</title>
                <meta name="description" content="Enter a new password for your GymLink account and get back to your workouts." />
                <meta name="keywords" content="GymLink, reset password, fitness account, security" />
                <meta property="og:title" content="Reset Password - GymLink" />
                <meta property="og:description" content="Set a new password and regain access to your GymLink account." />
            </Helmet>
            <motion.div
                className="min-h-screen flex items-center justify-center bg-black text-black font-stencil"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
                        <FaLock className="mr-2" /> Reset Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 px-3 py-2 bg-transparent  border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400"
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <FaCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-lime-400 text-gray-900 py-2 rounded-lg hover:bg-lime-500 transition duration-300 flex items-center justify-center cursor-pointer"
                        >
                            {loading ? <HashLoader size={15} color="#fff" /> : "Reset Password"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </>
    );
};

export default ResetPassword;
