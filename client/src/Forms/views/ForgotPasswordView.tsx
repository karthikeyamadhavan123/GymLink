import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { HashLoader } from 'react-spinners';
import Input from '@/Forms/components/Input';
import Form from '@/Forms/components/Form';
import Button from '@/Forms/components/Button';
import Label from '@/Forms/components/Label';
import { ForgotPasswordViewProps } from '../types/FormProps';

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
    email,
    loading,
    onEmailChange,
    onSubmit
}) => {
    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-black text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >

            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center text-black font-stencil">
                    <FaEnvelope className="mr-2 text-black" /> Forgot Password
                </h2>

                <Form handleSubmit={onSubmit}>
                    <>
                        <div className="mb-4 font-stencil">
                            <Label htmlFor="email" labelText="Email" />
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    handleChange={onEmailChange}
                                    placeholder="Enter your email"
                                    required={true}
                                    className='w-full pl-10 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-lime-400  text-black'
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            text={loading ? <HashLoader size={15} color="#fff" /> : 'Send Reset Link'}
                            className="w-full bg-lime-400 text-gray-900 py-2 rounded-lg hover:bg-lime-500 transition duration-300 flex items-center justify-center cursor-pointer font-stencil"
                            disabled={loading}
                        />
                    </>
                </Form>
            </div>
        </motion.div>
    );
};