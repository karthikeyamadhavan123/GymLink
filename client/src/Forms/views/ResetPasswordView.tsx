import React from "react";
import { FaLock, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import Form from '@/Forms/components/Form';
import Button from '@/Forms/components/Button';
import Label from '@/Forms/components/Label';
import { ResetPasswordViewProps } from "@/Forms/types/FormProps";
import Input from "@/Forms/components/Input";

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = ({
    password,
    confirmPassword,
    loading,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit
}) => {
    return (
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

                <Form handleSubmit={onSubmit}>
                    <>
                    <div className="mb-4">
                        <Label htmlFor="password" labelText="New Password" />
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                handleChange={onPasswordChange}
                                placeholder="Enter new password"
                                className="w-full pl-10 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400  text-black"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="confirmPassword" labelText="Confirm Password" />
                        <div className="relative">
                            <FaCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                handleChange={onConfirmPasswordChange}
                                placeholder="Confirm new password"
                                className="w-full pl-10 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400  text-black"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        text={loading ? <HashLoader size={15} color="#fff" /> : "Reset Password"}
                        className="w-full bg-lime-400 text-gray-900 py-2 rounded-lg hover:bg-lime-500 transition duration-300 flex items-center justify-center cursor-pointer"
                        disabled={loading}
                    />
                    </>
                </Form>
            </div>
        </motion.div>
    );
};