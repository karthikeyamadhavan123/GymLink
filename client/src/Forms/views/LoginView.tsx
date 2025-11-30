import React from "react";
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import Input from '@/Forms/components/Input';
import Form from '@/Forms/components/Form';
import Button from '@/Forms/components/Button';
import Label from '@/Forms/components/Label';
import { LoginViewProps } from "../types/FormProps";

export const LoginView: React.FC<LoginViewProps> = ({
    email,
    password,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit
}) => {
    return (
        <div className="flex h-screen font-stencil">
            {/* Left side - Image */}
            <div className="hidden md:block md:w-1/2 relative h-screen">
                <img
                    src="/assets/images/gym/login.avif"
                    alt="Login background"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 w-1/2 bg-black opacity-35 sm:hidden lg:block xs:hidden"></div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-8">
                <motion.div
                    className="max-w-md w-full border-2 p-4 bg-white flex flex-col rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                >
                    <div className="text-center flex space-x-3 items-center justify-center">
                        <Dumbbell size={25} color="#000" />
                        <h1 className="text-black text-3xl font-bold mb-2 underline text-center">
                            Welcome{" "}
                            <span className="text-lime-400 underline text-3xl">Back!!</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 text-center mb-6">
                        Please enter your details to log in
                    </p>

                    <Form handleSubmit={onSubmit}>
                        <>
                        <div className="mb-6">
                            <Label htmlFor="email" labelText="Email" />
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                handleChange={onEmailChange}
                                placeholder="Enter your email"
                                required={true}
                            />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <Label htmlFor="password" labelText="Password" />
                                <Link
                                    to="/api/auth/forgot-password"
                                    className="text-sm text-lime-400 hover:text-lime-300 underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                handleChange={onPasswordChange}
                                placeholder="Enter your password"
                                required={true}
                            />
                        </div>

                        <div className="mb-6">
                            <Button
                                type="submit"
                                text={loading ? <HashLoader size={15} color="#fff" /> : "Log in"}
                                className="w-full bg-lime-400 hover:bg-lime-500 cursor-pointer text-white font-medium py-3 rounded-lg transition duration-200"
                                disabled={loading}
                            />
                        </div>

                        <p className="text-center text-gray-400 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/api/auth/register"
                                className="text-lime-400 hover:text-lime-300 font-medium underline"
                            >
                                Sign up
                            </Link>
                        </p>
                        </>
                    </Form>
                </motion.div>
            </div>
        </div>
    );
};