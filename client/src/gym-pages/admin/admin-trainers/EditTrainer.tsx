import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { EditTrainerFormProps, TrainerFormData } from "./admin-trainers-types/types/types";



const EditTrainerForm = ({ trainer, gymId, onClose, onSuccess }: EditTrainerFormProps) => {
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    // Parse expertise array into comma-separated string for form
    const expertiseString = Array.isArray(trainer.expertise)
        ? trainer.expertise.join(", ")
        : String(trainer.expertise);

    const [formData, setFormData] = useState<TrainerFormData>({
        trainerName: trainer.trainerName || "",
        expertise: expertiseString || "",
        experience: trainer.experience || "",
        contactNumber: trainer.contactNumber || "",
        description: trainer.description || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNextStep = () => {
        // Validate first step
        if (!formData.trainerName || !formData.expertise || !formData.experience) {
            setFormError("Please fill all required fields in step 1");
            return;
        }
        setFormError(null);
        setFormStep(2);
    };

    const handlePrevStep = () => {
        setFormStep(1);
        setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.contactNumber || !formData.description) {
            setFormError("Contact number and description are required");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError(null);
            const expertiseArray = formData.expertise.split(",").map(e => e.trim());
            const submitData = {
                trainerName: formData.trainerName,
                expertise: expertiseArray.join(","),
                experience: formData.experience,
                contactNumber: formData.contactNumber,
                description: formData.description
            };
            const response = await axios.put(
                `${import.meta.env.VITE_DB_URL}/trainers/${gymId}/${trainer._id}/edit`,
                submitData,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setFormSuccess("Trainer updated successfully!");

                // Notify parent component about the success
                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess(response.data.trainer);
                    }, 1500);
                }
            } else {
                setFormError(response.data.message || "Failed to update trainer");
            }
        } catch (error: any) {
            console.error("Error updating trainer:", error);
            setFormError(error.response?.data?.message || "Error updating trainer. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 font-stencil">
            <div className="bg-gray-800 rounded-lg w-full max-w-md shadow-xl overflow-hidden">
                <div className="flex justify-between items-center bg-gray-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                        {formStep === 1 ? "Edit Trainer: Basic Info" : "Edit Trainer: Details"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                        type="button"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="px-6 pt-4">
                    <div className="flex items-center mb-4">
                        <div className={`h-2 flex-1 rounded-full ${formStep === 1 ? 'bg-lime-500' : 'bg-gray-600'}`}></div>
                        <div className="mx-2 w-2"></div>
                        <div className={`h-2 flex-1 rounded-full ${formStep === 2 ? 'bg-lime-500' : 'bg-gray-600'}`}></div>
                    </div>
                </div>

                {formError && (
                    <div className="mx-6 mb-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-3 rounded">
                        {formError}
                    </div>
                )}

                {formSuccess && (
                    <div className="mx-6 mb-4 bg-green-500 bg-opacity-20 border border-green-500 text-green-100 px-4 py-3 rounded">
                        {formSuccess}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 pt-2">
                    {formStep === 1 ? (
                        // Step 1: Basic Information
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="trainerName" className="block text-gray-300">Trainer Name*</label>
                                <input
                                    type="text"
                                    id="trainerName"
                                    name="trainerName"
                                    value={formData.trainerName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="expertise" className="block text-gray-300">Areas of Expertise*</label>
                                <input
                                    type="text"
                                    id="expertise"
                                    name="expertise"
                                    value={formData.expertise}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="e.g. Weightlifting, Cardio, Yoga"
                                />
                                <p className="text-gray-400 text-xs">Separate multiple areas with commas</p>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="experience" className="block text-gray-300">Years of Experience*</label>
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="e.g. 5"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors flex items-center gap-2"
                                >
                                    Next Step
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Step 2: Contact Details
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="contactNumber" className="block text-gray-300">Contact Number*</label>
                                <input
                                    type="text"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="e.g. +1234567890"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-gray-300">Description*</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                    placeholder="Brief description of trainer's background"
                                ></textarea>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : "Update Trainer"}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditTrainerForm;