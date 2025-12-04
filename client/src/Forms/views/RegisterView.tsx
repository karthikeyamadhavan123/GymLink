import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Input from "@/Forms/components/Input";
import Form from "@/Forms/components/Form";
import Button from "@/Forms/components/Button";
import Label from "@/Forms/components/Label";
import Select from "@/Forms/components/Select";
import { RegisterViewProps } from "../types/FormProps";
import { STEPS } from "@/enums";
import useCheckPassword from "@/hooks/useCheckPassword";

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
}) => {
  const genderOptions = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  const { success, error } = useCheckPassword(formDetails.password)
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-stencil">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-green-900/10 to-gray-900 opacity-70"></div>

      <div className="w-full max-w-4xl z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 text-lime-400">
            <Dumbbell size={48} color="#A7F3D0" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
            Welcome, <span className="text-lime-400">Athlete</span>
          </h1>
          <p className="text-gray-400">
            Join our community and start your fitness journey today
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow-inner">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded-full bg-gray-700">
              <div
                className="bg-lime-400 transition-all duration-500 ease-in-out rounded-full shadow-lg shadow-lime-400/50"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              {[STEPS.BASIC, STEPS.CONTACT, STEPS.PROFILE].map((step) => (
                <div key={step} className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition duration-300 ${currentStep >= step
                        ? 'bg-lime-400 border-lime-400 shadow-md shadow-lime-400/40'
                        : 'bg-gray-800 border-gray-600'
                      }`}
                  >
                    {currentStep > step ? (
                      <svg
                        className="w-5 h-5 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`text-sm font-bold ${currentStep === step ? 'text-gray-900' : 'text-gray-400'
                          }`}
                      >
                        {step}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 transition duration-300 font-medium ${currentStep >= step ? 'text-lime-400' : 'text-gray-500'
                      }`}
                  >
                    {step === STEPS.BASIC
                      ? 'Account'
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
        <div className="bg-gray-900 shadow-2xl rounded-xl border border-gray-800 p-6 md:p-10">
          <Form handleSubmit={onSubmit}>
            <>
              {/* Step 1: Basic Account Information (Email & Password first) */}
              {currentStep === STEPS.BASIC && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Create Your Account
                  </h2>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" labelText="Email Address*" />
                    <Input
                      type="email"
                      name="email"
                      value={formDetails.email}
                      handleChange={onInputChange}
                      placeholder="john@fitlife.com"
                      required={true}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <Label htmlFor="password" labelText="Password*" />
                    <Input
                      type="password"
                      name="password"
                      value={formDetails.password}
                      handleChange={onInputChange}
                      placeholder="••••••••"
                      required={true}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
                    />
                    {/* Password Strength Feedback */}
                    {formDetails.password && (
                      <div className="mt-2 text-sm">
                        {error && <p className="text-red-400">{error}</p>}
                        {success && <p className="text-lime-400">{success}</p>}
                      </div>
                    )}
                  </div>

                  {/* First Name / Last Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label htmlFor="firstName" labelText="First Name*" />
                      <Input
                        type="text"
                        name="firstName"
                        value={formDetails.firstName}
                        handleChange={onInputChange}
                        placeholder="John"
                        required={true}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" labelText="Last Name" />
                      <Input
                        type="text"
                        name="lastName"
                        value={formDetails.lastName}
                        handleChange={onInputChange}
                        placeholder="Doe (Optional)"
                        required={false}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === STEPS.CONTACT && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Contact Details
                  </h2>
                  <div>
                    <Label htmlFor="phone_number" labelText="Phone Number*" />
                    <Input
                      type="tel"
                      name="phone_number"
                      value={formDetails.phone_number}
                      handleChange={onInputChange}
                      placeholder="+91 98765 43210"
                      required={true}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Profile Information */}
              {currentStep === STEPS.PROFILE && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Profile Details
                  </h2>
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200 shadow-md"
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="avatar" labelText="Profile Picture" />
                    <input
                      type="file"
                      name="avatar"
                      onChange={onFileChange}
                      accept="image/*"
                      className="w-full block text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-lime-500/20 file:text-lime-400
                        hover:file:bg-lime-500/30 transition duration-200 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-4 border-t border-gray-800">
                {currentStep > STEPS.BASIC && (
                  <Button
                    type="button"
                    handleClick={onPrevStep}
                    text="← Back"
                    className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300 shadow-md"
                  />
                )}
                {currentStep < STEPS.PROFILE ? (
                  <Button
                    type="button"
                    handleClick={onNextStep}
                    text="Continue →"
                    disabled={disabled || (currentStep === STEPS.BASIC && !success)}
                    className="px-6 py-3 bg-lime-600 text-white rounded-full hover:bg-lime-500 ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-lime-600/40"
                  />
                ) : (
                  <Button
                    type="submit"
                    text={
                      loading ? (
                        <HashLoader size={20} color="#fff" />
                      ) : (
                        'Complete Registration'
                      )
                    }
                    disabled={disabled}
                    className="px-6 py-3 bg-lime-400 text-gray-900 font-bold rounded-full ml-auto transition duration-300 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-lime-400/50"
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
            <Link
              to="/login"
              className="text-lime-400 hover:text-lime-300 hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
