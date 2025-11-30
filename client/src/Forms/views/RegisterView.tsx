import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Input from '@/Forms/components/Input';
import Form from '@/Forms/components/Form';
import Button from '@/Forms/components/Button';
import Label from '@/Forms/components/Label';
import Select from '@/Forms/components/Select';
import { RegisterViewProps } from '../types/FormProps';
import { STEPS } from '@/enums';



export const RegisterView: React.FC<RegisterViewProps> = ({
    currentStep,
    formDetails,
    disabled,
    loading,
    states,
    onInputChange,
    onFileChange,
    onNextStep,
    onPrevStep,
    onSubmit,
    onGoogleSignIn,
}) => {
    const genderOptions = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0D0D0C] via-[#43872a] to-[#0D0D0C] flex flex-col items-center justify-center p-4 font-stencil">
            <div className="w-full max-w-4xl">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative w-16 h-16">
                            <Dumbbell size={30} color="#fff" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        Welcome, <span className="text-lime-400">Athlete</span>
                    </h1>
                    <p className="text-gray-400">
                        Join our community and start your fitness journey today
                    </p>
                </div>

                {/* Progress Tracker */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-800">
                            <div
                                className="bg-lime-400 transition-all duration-500 ease-in-out"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between">
                            {[STEPS.BASIC, STEPS.CONTACT, STEPS.PROFILE].map((step) => (
                                <div key={step} className="relative flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${currentStep >= step
                                            ? 'bg-lime-400 border-lime-400'
                                            : 'bg-gray-800 border-gray-600'
                                            }`}
                                    >
                                        {currentStep > step ? (
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        ) : (
                                            <span
                                                className={`text-sm font-bold ${currentStep === step ? 'text-white' : 'text-gray-400'
                                                    }`}
                                            >
                                                {step}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className={`text-xs mt-2 ${currentStep >= step ? 'text-white' : 'text-gray-500'
                                            }`}
                                    >
                                        {step === STEPS.BASIC
                                            ? 'Basic'
                                            : step === STEPS.CONTACT
                                                ? 'Contact'
                                                : 'Profile'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-gray-900 shadow-xl rounded-xl border border-gray-800 p-6 md:p-8">
                    <Form handleSubmit={onSubmit}>
                        <>

                            {currentStep === STEPS.BASIC && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-200">Personal Information</h2>

                                    {/* Google Sign In Button */}
                                    <Button
                                        type="button"
                                        handleClick={onGoogleSignIn}
                                        text={
                                            <div className="flex items-center justify-center gap-3">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path
                                                        fill="#4285F4"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    />
                                                    <path
                                                        fill="#34A853"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="#FBBC05"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="#EA4335"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                                Sign in with Google
                                            </div>
                                        }
                                        className="w-full px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 font-medium"
                                    />

                                    <div className="relative flex items-center gap-2 py-4">
                                        <div className="flex-1 border-t border-gray-700"></div>
                                        <span className="text-gray-400 text-sm">OR</span>
                                        <div className="flex-1 border-t border-gray-700"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName" labelText="First Name*" />
                                            <Input
                                                type="text"
                                                name="firstName"
                                                value={formDetails.firstName}
                                                handleChange={onInputChange}
                                                placeholder="John"
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName" labelText="Last Name" />
                                            <Input
                                                type="text"
                                                name="lastName"
                                                value={formDetails.lastName}
                                                handleChange={onInputChange}
                                                placeholder="Doe"
                                                required={false}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" labelText="Email Address*" />
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formDetails.email}
                                            handleChange={onInputChange}
                                            placeholder="john@example.com"
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password" labelText="Password*" />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formDetails.password}
                                            handleChange={onInputChange}
                                            placeholder="••••••••"
                                            required={true}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Contact Information */}
                            {currentStep === STEPS.CONTACT && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-200">Contact Details</h2>
                                    <div>
                                        <Label htmlFor="phone_number" labelText="Phone Number*" />
                                        <Input
                                            type="tel"
                                            name="phone_number"
                                            value={formDetails.phone_number}
                                            handleChange={onInputChange}
                                            placeholder="+91 98765 43210"
                                            required={true}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="location" labelText="Location (State)*" />
                                        <Select
                                            name="location"
                                            value={formDetails.location}
                                            handleChange={onInputChange}
                                            data={states}
                                            id="location"
                                            required={true}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Profile Information */}
                            {currentStep === STEPS.PROFILE && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-200">Profile Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="age" labelText="Age*" />
                                            <Input
                                                type="number"
                                                name="age"
                                                value={formDetails.age}
                                                handleChange={onInputChange}
                                                placeholder="25"
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="gender" labelText="Gender*" />
                                            <Select
                                                name="gender"
                                                value={formDetails.gender}
                                                handleChange={onInputChange}
                                                data={genderOptions}
                                                id="gender"
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="avatar" labelText="Profile Picture" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            onChange={onFileChange}
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-lime-400 file:text-gray-900 hover:file:bg-lime-500 file:cursor-pointer"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Form Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {currentStep > STEPS.BASIC && (
                                    <Button
                                        type="button"
                                        handleClick={onPrevStep}
                                        text="Back"
                                        className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
                                    />
                                )}
                                {currentStep < STEPS.PROFILE ? (
                                    <Button
                                        type="button"
                                        handleClick={onNextStep}
                                        text="Continue"
                                        disabled={disabled}
                                        className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-500 ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        text={loading ? <HashLoader size={15} color="#fff" /> : 'Complete Registration'}
                                        disabled={disabled}
                                        className="px-6 py-3 bg-lime-400 text-white rounded-lg ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    />
                                )}
                            </div>
                        </>
                    </Form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-gray-500 text-sm">
                    <p>
                        Already have an account?{' '}
                        <Link to="/api/auth/login" className="text-lime-400 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};