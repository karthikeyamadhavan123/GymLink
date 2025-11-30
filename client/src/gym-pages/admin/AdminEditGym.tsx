import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { HashLoader } from "react-spinners";
import { AdminGymEditFormData, AdminGymProps, EditGymProps } from "./admin-gym-types/types";

const EditGymForm: React.FC<EditGymProps> = ({ gym, onClose,onSave }) => {
    const [formData, setFormData] = useState<AdminGymEditFormData>({
        editedgymName: gym.gymName,
        editedbasePrice: gym.basePrice,
        editedequipments: gym.equipments.join(', '),
        editedarea: gym.location.area,
        editedcity: gym.location.city,
        editedlandmark: gym.location.landmark || '',
        editedpincode: gym.location.pincode,
        editedstate: gym.location.state,
        editedstreetName: gym.location.streetName || ''
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            // Parse equipments from comma-separated string back to array
            const equipmentsArray = formData.editedequipments.split(',').map(item => item.trim()).filter(item => item);
            
            // Prepare data for API with the "edited" prefix naming convention
            const updatedData = {
                editedgymName: formData.editedgymName,
                editedbasePrice: Number(formData.editedbasePrice),
                editedequipments: equipmentsArray,
                editedarea: formData.editedarea,
                editedcity: formData.editedcity,
                editedlandmark: formData.editedlandmark,
                editedpincode: formData.editedpincode,
                editedstate: formData.editedstate,
                editedstreetName: formData.editedstreetName
            };
            
            // Call the API to update gym
            const response = await axios.put<{gym: AdminGymProps}>(`${import.meta.env.VITE_DB_URL}/gym/${gym._id}/edit`, updatedData, { 
                withCredentials: true 
            });
            if (response.status === 200) {
                onSave(response.data.gym)
                onClose();
            }
        } catch (error) {
            console.error("Error updating gym:", error);
            setError('Failed to update gym. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            
            {/* Gym Name */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedgymName">
                    Gym Name
                </label>
                <input
                    type="text"
                    id="editedgymName"
                    name="editedgymName"
                    value={formData.editedgymName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                    required
                />
            </div>

            {/* Base Price */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedbasePrice">
                    Base Price (₹/month)
                </label>
                <input
                    type="number"
                    id="editedbasePrice"
                    name="editedbasePrice"
                    value={formData.editedbasePrice}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                    required
                    min="0"
                />
            </div>

            {/* Equipments */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedequipments">
                    Equipments (comma-separated)
                </label>
                <textarea
                    id="editedequipments"
                    name="editedequipments"
                    value={formData.editedequipments}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300 h-20"
                    required
                />
            </div>

            {/* Location Details */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedarea">
                            Area
                        </label>
                        <input
                            type="text"
                            id="editedarea"
                            name="editedarea"
                            value={formData.editedarea}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedcity">
                            City
                        </label>
                        <input
                            type="text"
                            id="editedcity"
                            name="editedcity"
                            value={formData.editedcity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedstate">
                            State
                        </label>
                        <input
                            type="text"
                            id="editedstate"
                            name="editedstate"
                            value={formData.editedstate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedpincode">
                            Pincode
                        </label>
                        <input
                            type="text"
                            id="editedpincode"
                            name="editedpincode"
                            value={formData.editedpincode}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedstreetName">
                            Street Name
                        </label>
                        <input
                            type="text"
                            id="editedstreetName"
                            name="editedstreetName"
                            value={formData.editedstreetName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="editedlandmark">
                            Landmark
                        </label>
                        <input
                            type="text"
                            id="editedlandmark"
                            name="editedlandmark"
                            value={formData.editedlandmark}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-300"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2 px-4 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center cursor-pointer"
                >
                    {isSubmitting ? (
                        <>
                            <HashLoader size={15} color='#ffffff' className="mr-2" />
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </form>
    );
};

export default EditGymForm;