import { Dumbbell, User, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Input from "@/Forms/components/Input";
import Form from "@/Forms/components/Form";
import Button from "@/Forms/components/Button";
import Label from "@/Forms/components/Label";
import Select from "@/Forms/components/Select";
import { RegisterViewProps } from "../types/FormProps";
import useCheckPassword from "@/hooks/useCheckPassword";
import { STEPS } from "@/enums";
import useGenders from "@/actions/getGender";
import useRoles from "@/actions/getRoles";

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
  const genderOptions = useGenders()
  const roleOptions = useRoles()

  const { success, error } = useCheckPassword(formDetails.password);

  const totalSteps = 7;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const getStepLabel = (step: number) => {
    switch (step) {
      case STEPS.BASIC_1:
        return "Email";
      case STEPS.BASIC_2:
        return "Name";
      case STEPS.CONTACT_1:
        return "Phone";
      case STEPS.CONTACT_2:
        return "Location";
      case STEPS.PROFILE_1:
        return "Age";
      case STEPS.ROLE:
        return "Role";
      case STEPS.PROFILE_2:
        return "Avatar";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-stencil">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-green-900/10 to-gray-900 opacity-70"></div>

      <div className="w-full max-w-2xl z-10">
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
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-center">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div key={step} className="relative flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition duration-300 ${currentStep >= step
                      ? "bg-lime-400 border-lime-400 shadow-md shadow-lime-400/40"
                      : "bg-gray-800 border-gray-600"
                      }`}
                  >
                    {currentStep > step ? (
                      <svg
                        className="w-4 h-4 text-gray-900"
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
                        className={`text-xs font-bold ${currentStep === step ? "text-gray-900" : "text-gray-400"
                          }`}
                      >
                        {step}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 transition duration-300 font-medium ${currentStep >= step ? "text-lime-400" : "text-gray-500"
                      }`}
                  >
                    {getStepLabel(step)}
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
              {/* Step 1: Email & Password */}
              {currentStep === STEPS.BASIC_1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Create Your Account
                  </h2>

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
                    {formDetails.password && (
                      <div className="mt-2 text-sm">
                        {error && <p className="text-red-400">{error}</p>}
                        {success && <p className="text-lime-400">{success}</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: First Name & Last Name */}
              {currentStep === STEPS.BASIC_2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    What's Your Name?
                  </h2>

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
              )}

              {/* Step 3: Phone Number */}
              {currentStep === STEPS.CONTACT_1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Contact Information
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
                </div>
              )}

              {/* Step 4: Location */}
              {currentStep === STEPS.CONTACT_2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Where Are You Located?
                  </h2>

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

              {/* Step 5: Age & Gender */}
              {currentStep === STEPS.PROFILE_1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Profile Details
                  </h2>

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
              )}

              {currentStep === STEPS.ROLE && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Choose Your Role
                  </h2>

                  <div className="space-y-4">
                    <p className="text-gray-400 mb-4">
                      Select how you want to use our platform
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div
                        className={`transition duration-300 ${formDetails.role.toLowerCase() === "user"
                          ? "bg-lime-600/20 border-lime-400"
                          : "bg-gray-800 border-gray-700"
                          } border-2 rounded-lg p-6`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <User
                            size={48}
                            className={`mb-3 ${formDetails.role.toLowerCase() === "user"
                              ? "text-lime-400"
                              : "text-gray-400"
                              }`}
                          />
                          <h3
                            className={`font-bold text-lg mb-2 ${formDetails.role.toLowerCase() === "user"
                              ? "text-lime-400"
                              : "text-gray-300"
                              }`}
                          >
                            User
                          </h3>
                          <p className="text-sm text-gray-400">
                            I want to track my fitness and find trainers
                          </p>
                        </div>
                      </div>

                      <div
                        className={`transition duration-300 ${formDetails.role.toLowerCase() === "trainer"
                          ? "bg-lime-600/20 border-lime-400"
                          : "bg-gray-800 border-gray-700"
                          } border-2 rounded-lg p-6`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <UserCog
                            size={48}
                            className={`mb-3 ${formDetails.role.toLowerCase() === "trainer"
                              ? "text-lime-400"
                              : "text-gray-400"
                              }`}
                          />
                          <h3
                            className={`font-bold text-lg mb-2 ${formDetails.role.toLowerCase() === "trainer"
                              ? "text-lime-400"
                              : "text-gray-300"
                              }`}
                          >
                            Trainer
                          </h3>
                          <p className="text-sm text-gray-400">
                            I want to coach clients and grow my business
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actual Select Component */}
                    <div>
                      <Label htmlFor="role" labelText="Select Your Role*" />
                      <Select
                        name="role"
                        value={formDetails.role}
                        handleChange={onInputChange}
                        data={roleOptions}
                        id="role"
                        required={true}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Profile Picture */}
              {currentStep === STEPS.PROFILE_2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-200 border-b border-gray-700 pb-3 mb-4">
                    Add Your Photo
                  </h2>

                  <div>
                    <Label htmlFor="avatar" labelText="Profile Picture (Optional)" />
                    <Input
                      type="file"
                      placeholder="choose file"
                      name="avatar"
                      handleChange={onFileChange}
                      accept="image/*"
                      className="w-full block text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-lime-500/20 file:text-lime-400
                        hover:file:bg-lime-500/30 transition duration-200 cursor-pointer"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Upload a profile picture to personalize your account
                    </p>
                  </div>
                </div>
              )}


              {/* Form Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-4 border-t border-gray-800">
                {currentStep > STEPS.BASIC_1 && (
                  <Button
                    type="button"
                    handleClick={onPrevStep}
                    text="← Back"
                    className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300 shadow-md"
                  />
                )}
                {currentStep < STEPS.PROFILE_2 ? (
                  <Button
                    type="button"
                    handleClick={onNextStep}
                    text="Continue →"
                    disabled={
                      disabled ||
                      (currentStep === STEPS.BASIC_1 && !success)
                    }
                    className="px-6 py-3 bg-lime-600 text-white rounded-full hover:bg-lime-500 ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-lime-600/40"
                  />
                ) : (
                  <Button
                    type="submit"
                    text={
                      loading ? (
                        <HashLoader size={20} color="#fff" />
                      ) : (
                        "Complete Registration"
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
            Already have an account?{" "}
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