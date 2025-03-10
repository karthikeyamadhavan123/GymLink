"use client"
import useIndianStates from '@/actions/getStates';
import axios from 'axios';
import { Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

enum STEPS {
  BASIC = 1,
  CONTACT = 2,
  PROFILE = 3,
}
interface FormProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone_number: string,
  location: string,
  age: string,
  gender: string,
  avatar: File | null,
  role: string
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(STEPS.BASIC);
  const [formDetails, setFormDetails] = useState<FormProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone_number: '',
    location: '',
    age: '',
    gender: '',
    avatar: null,
    role: ''
  });
  const [disabled, setDisabled] = useState(true);
  const states = useIndianStates();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const RUrl = formDetails.role === 'admin' ? process.env.NEXT_PUBLIC_DB_URL + '/api/users/register/admin' : process.env.NEXT_PUBLIC_DB_URL + '/api/users/register'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormDetails((prev) => ({
        ...prev,
        avatar: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < STEPS.PROFILE) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > STEPS.BASIC) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('firstName', formDetails.firstName)
    if (formDetails.lastName) {
      submitData.append('lastName', formDetails.lastName)
    }
    submitData.append('email', formDetails.email)
    submitData.append('password', formDetails.password)
    submitData.append('phone_number', formDetails.phone_number)
    submitData.append('role', formDetails.role)
    submitData.append('location', formDetails.location)
    submitData.append('age', formDetails.age)
    submitData.append('gender', formDetails.gender)
    if (formDetails.avatar) {
      submitData.append('avatar', formDetails.avatar)
    }
    try {
      setLoading(true)
      const response = await axios.post(RUrl, submitData)
      if (response.status === 201) {
        toast.success('Register Successful')
        setFormDetails({
          firstName: '',
          lastName: '',
          avatar: null,
          age: '',
          password: '',
          phone_number: '',
          location: '',
          gender: '',
          role: '',
          email: ''
        })
        router.push('/api/auth/login')
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

    // Validate form fields based on the current step
    useEffect(() => {
      switch (currentStep) {
        case STEPS.BASIC:
          setDisabled(
            !formDetails.firstName || !formDetails.email || !formDetails.password
          );
          break;
        case STEPS.CONTACT:
          setDisabled(!formDetails.phone_number || !formDetails.location);
          break;
        case STEPS.PROFILE:
          setDisabled(!formDetails.age || !formDetails.gender);
          break;
        default:
          setDisabled(false);
      }
    }, [currentStep, formDetails]);



    return (
      <>
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
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
                            xmlns="http://www.w3.org/2000/svg"
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
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === STEPS.BASIC && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-200">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-300 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formDetails.firstName}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                          required
                        />

                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formDetails.lastName}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formDetails.email}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-gray-300 mb-1">
                        Password*
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formDetails.password}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === STEPS.CONTACT && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-200">Contact Details</h2>
                    <div>
                      <label htmlFor="phone_number" className="block text-gray-300 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={formDetails.phone_number}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-gray-300 mb-1">
                        Location (State)*
                      </label>
                      {/* <input
                    type="text"
                    id="location"
                    name="location"
                    value={formDetails.location}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                  /> */}
                      <select name="location" className='bg-gray-800 w-full p-3 text-white' onChange={handleChange}>
                        <option value="">Choose your state</option>
                        {states.map((state, index) => (
                          <option value={state.name} key={index} className='focus:outline-none focus:ring-2 focus:ring-lime-400' >{state.code}{" "}{state.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Profile Information */}
                {currentStep === STEPS.PROFILE && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-200">Profile Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="age" className="block text-gray-300 mb-1">
                          Age*
                        </label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formDetails.age}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-gray-300 mb-1">
                          Gender*
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formDetails.gender}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-gray-300 mb-1">
                        Role*
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formDetails.role}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        required
                      >
                        <option value="">Choose your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="avatar" className="block text-gray-300 mb-1">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        accept="image/*"
                      />
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > STEPS.BASIC && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < STEPS.PROFILE ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={disabled}
                      className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-500 ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Continue
                    </button>
                  ) : (

                    <button
                      type="submit"
                      disabled={disabled}
                      className="px-6 py-3 bg-lime-400 text-white rounded-lg  ml-auto transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {
                        loading ? <HashLoader size={15} color='#fff' /> : 'Complete Registration'
                      }
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-gray-500 text-sm">
              <p>
                Already have an account?{' '}
                <a href="/api/auth/login" className="text-lime-400 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
        <Toaster />
      </>
    );

  }
