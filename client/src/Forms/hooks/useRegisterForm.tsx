import useIndianStates from "@/actions/getStates";
import { STEPS } from "@/enums";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProps } from "../types/FormProps";
import axios from "axios";
import toast from "react-hot-toast";

export const useRegisterForm = () => {
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
    });
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const states = useIndianStates();
    const router = useNavigate();
    const RUrl = import.meta.env.VITE_DB_URL + '/api/users/register';

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
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

   


    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('firstName', formDetails.firstName);
    if (formDetails.lastName) {
        submitData.append('lastName', formDetails.lastName);
    }
    submitData.append('email', formDetails.email);
    submitData.append('password', formDetails.password);
    submitData.append('phone_number', formDetails.phone_number);
    submitData.append('location', formDetails.location);
    submitData.append('age', formDetails.age);
    submitData.append('gender', formDetails.gender);
    if (formDetails.avatar) {
        submitData.append('avatar', formDetails.avatar);
    }

    try {
        setLoading(true);
        const response = await axios.post(RUrl, submitData);
        if (response.status === 201) {
            toast.success('Register Successful');
            setFormDetails({
                firstName: '',
                lastName: '',
                avatar: null,
                age: '',
                password: '',
                phone_number: '',
                location: '',
                gender: '',
                email: '',
            });
            router('/api/auth/login');
        }
    } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
        setLoading(false);
    }
    };

    const handleGoogleSignIn = async () => {
    try {
        // Implement Google OAuth flow here
        // Example: Redirect to backend Google OAuth endpoint
        const googleAuthUrl = import.meta.env.VITE_DB_URL + '/api/auth/google';
        window.location.href = googleAuthUrl;
    } catch (error: any) {
        toast.error('Google Sign-In failed');
    }
    };
    
    useEffect(() => {
    switch (currentStep) {
        case STEPS.BASIC:
            setDisabled(!formDetails.firstName || !formDetails.email || !formDetails.password);
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

    return {
        currentStep,
        formDetails,
        disabled,
        loading,
        states,
        STEPS,
        handleChange,
        handleFileChange,
        nextStep,
        prevStep,
        handleSubmit,
        handleGoogleSignIn,
    };
};

export default useRegisterForm