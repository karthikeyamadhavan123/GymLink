import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Search, Loader2, Filter, User, Plus, X, ArrowRight, ArrowLeft, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import EditTrainerForm from "./EditTrainer";

// Define interfaces for our trainer data
interface Trainer {
    _id: string;
    trainerName: string;
    expertise: string[];
    certifications: string[];
    experience: string;
    contactNumber: string;
    trainerImage: string;
    description: string;
}

interface GymWithTrainers {
    _id: string;
    gymName: string;
    trainers: Trainer[];
}
interface TrainerFormData {
    trainerName: string;
    expertise: string;
    experience: string;
    contactNumber: string;
    description: string;
    trainerImage: File | null;
}
const gymUrl = import.meta.env.VITE_DB_URL + '/trainers/all/admin';

const GetMyTrainers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [gyms, setGyms] = useState<GymWithTrainers[]>([]);
    const [filteredGyms, setFilteredGyms] = useState<GymWithTrainers[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [currentGymId, setCurrentGymId] = useState<string | null>(null);
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>(null);
    const initialFormData: TrainerFormData = {
        trainerName: "",
        expertise: "",
        experience: "",
        contactNumber: "",
        description: "",
        trainerImage: null,
    };

    const [formData, setFormData] = useState<TrainerFormData>(initialFormData);
    const allExpertise = Array.from(
        new Set(
            gyms
                .flatMap(gym => gym.trainers)
                .flatMap(trainer => trainer.expertise)
        )
    );

    useEffect(() => {
        const fetchGyms = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(gymUrl, { withCredentials: true });
                if (response.data.success) {
                    setGyms(response.data.trainer);
                    setFilteredGyms(response.data.trainer);
                } else {
                    setError(response.data.message || "Failed to load trainers");
                }
            } catch (error) {
                console.error("Error fetching gyms:", error);
                setError("Error loading trainers. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchGyms();
    }, []);

    useEffect(() => {
        if (!searchTerm && !selectedExpertise) {
            setFilteredGyms(gyms);
            return;
        }

        const filtered = gyms.map(gym => {
            const filteredTrainers = gym.trainers.filter(trainer => {
                const matchesSearch = searchTerm ?
                    trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    trainer.description.toLowerCase().includes(searchTerm.toLowerCase()) :
                    true;

                const matchesExpertise = selectedExpertise ?
                    trainer.expertise.includes(selectedExpertise) :
                    true;

                return matchesSearch && matchesExpertise;
            });

            return {
                ...gym,
                trainers: filteredTrainers
            };
        }).filter(gym => gym.trainers.length > 0);

        setFilteredGyms(filtered);
    }, [searchTerm, selectedExpertise, gyms]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedExpertise(null);
    };
    const handleShowAddForm = (gymId: string) => {
        setFormData({ ...initialFormData });
        setCurrentGymId(gymId);
        setShowAddForm(true);
        setFormStep(1);
        setImagePreview(null);
        setFormError(null);
        setFormSuccess(null);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
        setCurrentGymId(null);
        setFormData({ ...initialFormData });
        setImagePreview(null);
        setFormError(null);
        setFormSuccess(null);
        setFormStep(1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                trainerImage: file
            });

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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
        if (!formData.contactNumber || !formData.description || !formData.trainerImage) {
            setFormError("All fields are required, including trainer image");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError(null);
            const submitData = new FormData();
            submitData.append("trainerName", formData.trainerName);
            submitData.append("expertise", formData.expertise);
            submitData.append("experience", formData.experience);
            submitData.append("contactNumber", formData.contactNumber);
            submitData.append("description", formData.description);
            if (formData.trainerImage) {
                submitData.append("trainerImage", formData.trainerImage);
            }
            const response = await axios.post(
                `${import.meta.env.VITE_DB_URL}/trainers/${currentGymId}/new`,
                submitData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setFormSuccess("Trainer added successfully!");
                const updatedGymResponse = await axios.get(gymUrl, { withCredentials: true });
                if (updatedGymResponse.data.success) {
                    setGyms(updatedGymResponse.data.trainer);
                    setFilteredGyms(updatedGymResponse.data.trainer);
                }
                setTimeout(() => {
                    handleCloseForm();
                }, 2000);
            } else {
                setFormError(response.data.message || "Failed to add trainer");
            }
        } catch (error: any) {
            console.error("Error adding trainer:", error);
            setFormError(error.response?.data?.message || "Error adding trainer. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleShowEditForm = (trainer: Trainer, gymId: string) => {
        setCurrentTrainer(trainer);
        setCurrentGymId(gymId)
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setCurrentGymId(null)
        setCurrentTrainer(null);
    };

    const handleEditSuccess = (updatedTrainer: Trainer) => {

        setGyms(gyms.map(gym => ({
            ...gym,
            trainers: gym.trainers.map(trainer =>
                trainer._id === updatedTrainer._id ? updatedTrainer : trainer
            )
        })));
        handleCloseEditForm();
    };
    const handleDeletion = async (gymId: string, trainerId: string) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_DB_URL}/trainers/${gymId}/${trainerId}/delete`, { withCredentials: true })
            if (response.status === 200) {
                setGyms(gyms.map((gym: GymWithTrainers) => {
                    return {
                        ...gym,
                        trainers: gym.trainers.filter((trainer: Trainer) => trainer._id !== trainerId)
                    };
                }));
            }
        } catch (error) {
            console.log(error);

        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-lime-400 mx-auto" />
                    <p className="mt-4 text-gray-300 font-medium font-stencil">Loading trainers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Unable to load trainers</h2>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>My Trainers | Gym Management Dashboard</title>
                <meta
                    name="description"
                    content="Manage your gym trainers, view their profiles, and filter by expertise."
                />
            </Helmet>
            <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 font-stencil">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white font-stencil">My Trainers</h1>

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                            {/* Search bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search trainers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Expertise filter */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={selectedExpertise || ""}
                                    onChange={(e) => setSelectedExpertise(e.target.value || null)}
                                    className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                                >
                                    <option value="">All Expertise</option>
                                    {allExpertise.map(expertise => (
                                        <option key={expertise} value={expertise}>{expertise}</option>
                                    ))}
                                </select>
                                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>

                            {(searchTerm || selectedExpertise) && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredGyms.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg p-8 text-center">
                            <User className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-white mb-2">No trainers found</h2>
                            <p className="text-gray-400 mb-4">Try adjusting your filters or add some trainers.</p>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {filteredGyms.map((gym) => (
                                <div key={gym._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                    <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-white">{gym.gymName}</h2>

                                        {/* Add More Trainer button - shows only when trainers exist */}
                                        {gym.trainers.length > 0 && (
                                            <button className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors flex items-center gap-2">
                                                <Plus className="h-4 w-4" />
                                                Add More Trainer
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                        {
                                            gym.trainers.length !== 0 ? (
                                                <>
                                                    {gym.trainers.map((trainer) => (
                                                        <div
                                                            key={trainer._id}
                                                            className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                                                        >
                                                            <div className="h-48 bg-gray-700 relative">
                                                                {trainer.trainerImage ? (
                                                                    <img
                                                                        src={trainer.trainerImage}
                                                                        alt={trainer.trainerName}
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.onerror = null;
                                                                            target.src = "/api/placeholder/400/320";
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center bg-gray-800">
                                                                        <User className="h-16 w-16 text-gray-600" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="p-4">
                                                                <h3 className="text-lg font-bold text-white mb-1">{trainer.trainerName}</h3>
                                                                <p className="text-gray-400 text-sm mb-3">Experience : {trainer.experience} years </p>

                                                                <div className="mb-3">
                                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                                        {trainer.expertise.map((exp, index) => (
                                                                            <span
                                                                                key={index}
                                                                                className="px-2 py-1 bg-lime-500 bg-opacity-20  text-xs rounded-full text-white"
                                                                            >
                                                                                {exp}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <p className="text-gray-300 text-sm line-clamp-2 mb-4">{trainer.description}</p>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors cursor-pointer"
                                                                        onClick={() => handleShowEditForm(trainer, gym._id)}
                                                                    >
                                                                        Edit Profile
                                                                    </button>
                                                                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors cursor-pointer" onClick={() => handleDeletion(gym._id, trainer._id)}>
                                                                        Delete Profile
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-850 rounded-lg border border-dashed border-gray-700">
                                                    <div className="bg-gray-800 rounded-full p-4 mb-4">
                                                        <Plus className="h-8 w-8 text-lime-400" />
                                                    </div>
                                                    <h3 className="text-lg font-medium text-white mb-2">No trainers added yet</h3>
                                                    <p className="text-gray-400 text-center max-w-md mb-4">
                                                        Add trainers to your gym to help manage classes and provide specialized training to your members.
                                                    </p>
                                                    <button className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-md transition-colors flex items-center gap-2" onClick={() => handleShowAddForm(gym._id)} >
                                                        <Plus className="h-4 w-4" />
                                                        Add Trainer
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 font-stencil">
                    <div className="bg-gray-800 rounded-lg w-full max-w-md shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center bg-gray-700 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">
                                {formStep === 1 ? "Add Trainer: Basic Info" : "Add Trainer: Details & Image"}
                            </h2>
                            <button
                                onClick={handleCloseForm}
                                className="text-gray-400 hover:text-white"
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
                                // Step 2: Contact & Image
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

                                    <div className="space-y-2">
                                        <label className="block text-gray-300">Trainer Image*</label>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />

                                        <div
                                            className="border-2 border-dashed border-gray-600 rounded-lg p-3 cursor-pointer hover:border-lime-400 transition-colors"
                                            onClick={triggerFileInput}
                                        >
                                            {imagePreview ? (
                                                <div>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Trainer preview"
                                                        className="h-40 w-full object-cover rounded-md"
                                                    />
                                                    <p className="text-lime-400 text-xs text-center mt-2">Click to change</p>
                                                </div>
                                            ) : (
                                                <div className="text-center py-6">
                                                    <Camera className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                                                    <p className="text-gray-400 text-sm">Click to upload image</p>
                                                </div>
                                            )}
                                        </div>
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
                                                    Submitting...
                                                </>
                                            ) : "Add Trainer"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
            {showEditForm && currentTrainer && (
                <EditTrainerForm
                    trainer={currentTrainer}
                    gymId={currentGymId || ""}
                    onClose={handleCloseEditForm}
                    onSuccess={handleEditSuccess}
                />
            )}
        </>
    );
};

export default GetMyTrainers;