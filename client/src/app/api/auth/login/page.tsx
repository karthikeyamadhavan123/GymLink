"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "../../../../zustand"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginUrl = process.env.NEXT_PUBLIC_DB_URL + '/api/users/login';
  
  const setUserDetails = useUserStore((state) => state.setUserDetails);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(loginUrl,{email,password},{withCredentials:true})
     
      if(response.status===200){
        const userData = response.data.details;
        setUserDetails({
          firstName: userData.firstName,
          avatar: userData.avatar || "/user.png",
          role: userData.role || "user",
          location: userData.location || "",
          phone_number: userData.phone_number || "",
          email: userData.email
        });
        toast.success('Login Successful')
        setEmail('')
        setPassword('')
        
       if(userData.role==='admin'){
         router.push('/admin-dashboard');
       }
       else{
        router.push('/dashboard');
       }
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
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/women.jpg"
          alt="Login background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-8">
        <motion.div
          className="max-w-md w-full border-2 p-4 bg-white flex flex-col rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="text-center  flex space-x-3 items-center justify-center">
            <Dumbbell size={25} color="#000" />
            <h1 className="text-black text-3xl font-bold mb-2 underline text-center">
              Welcome{" "}
              <span className="text-lime-400 underline text-3xl">Back!!</span>
            </h1>
          </div>
          <p className="text-gray-400 text-center">
            Please enter your details to log in
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent text-black border border-gray-700 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-gray-400 text-sm font-medium"
                >
                  Password
                </label>
                <Link
                  href="/api/auth/forgot-password"
                  className="text-sm text-lime-400 hover:text-lime-300 underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent text-black border border-gray-700  focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              {
                !loading ? <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 cursor-pointer text-white font-medium py-3 rounded-lg transition duration-200"
              >
                Log in
              </button> :<button
                className="w-full bg-lime-400 hover:bg-lime-500 cursor-pointer text-white font-medium py-3 rounded-lg transition duration-200"
              >
                <HashLoader size={15} color="#fff"/>
              </button>
              }
              
            </div>

            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/api/auth/register"
                className="text-lime-400 hover:text-lime-300 font-medium underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
    <Toaster/>
    </>
  );
};

export default LoginForm;