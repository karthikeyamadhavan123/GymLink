"use client"
import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const FP_URL= process.env.NEXT_PUBLIC_DB_URL + '/api/users/forgot-password'
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response=await axios.post(FP_URL,{email})
            if(response.status===200){
                toast.success('Reset Email sent successfully')
                setEmail('')
            }

        } catch (error:any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
       
    };

    return (
        <>
        <motion.div className="min-h-screen flex items-center justify-center bg-black text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1, duration: 1.5 }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center text-black">
                    <FaEnvelope className="mr-2 text-black"  /> Forgot Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                            Email
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400  text-black"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-lime-400 text-gray-900 py-2 rounded-lg hover:bg-lime-500 transition duration-300 flex items-center justify-center cursor-pointer"
                    >
                         {loading ? <HashLoader size={15} color='#fff'/>:'Send Reset Link'}
                    </button>
                </form>
               
            </div>
        </motion.div>
        <Toaster/>
        </>
    );
};

export default ForgotPassword;