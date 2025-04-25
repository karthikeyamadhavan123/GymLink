import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { FiUpload, FiX, FiCheck, FiArrowLeft } from 'react-icons/fi';

const AddGym = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  
  const [formData, setFormData] = useState({
    gymName: '',
    basePrice: '',
    streetName: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    equipments: ''
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;    
    setSelectedFile(file);
    
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const removeImage = () => {
    // Revoke the object URL to prevent memory leaks
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setSelectedFile(null);
    setPreviewImage('');
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    if (!selectedFile) {
      setError('Please upload a gym image');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for multipart/form-data (for files)
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
      }

      // Add file
      formDataToSend.append('gymImages', selectedFile);

      const response = await axios.post(
        `${import.meta.env.VITE_DB_URL}/gym/new`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (response.status===201) {
        setSuccess('Gym created successfully!');
        
        // Reset form
        setFormData({
          gymName: '',
          basePrice: '',
          streetName: '',
          area: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
          equipments: ''
        });
        
        setSelectedFile(null);
        setPreviewImage('');
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      }
    } catch (error) {
      setError('Failed to create gym. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Gym | GymLink</title>
        <meta name="description" content="Add a new gym to the GymLink platform. Register your fitness center and connect with potential customers." />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-stencil py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button 
            onClick={() => navigate('/admin-dashboard')} 
            className="flex items-center text-gray-400 hover:text-lime-400 mb-6 transition-colors duration-300 cursor-pointer"
          >
            <FiArrowLeft className="mr-2" />
            Back to Gyms
          </button>
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Add New Gym</h1>
            <p className="text-gray-400">Create a new fitness center listing on GymLink</p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-900 rounded-2xl p-6 md:p-10 shadow-2xl">
            {error && (
              <div className="mb-6 bg-red-900/40 border border-red-500 text-red-200 rounded-lg p-4 flex items-center">
                <FiX className="text-red-400 mr-2 text-xl" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-900/40 border border-green-500 text-green-200 rounded-lg p-4 flex items-center">
                <FiCheck className="text-green-400 mr-2 text-xl" />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-lime-400">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gymName" className="block text-sm font-medium mb-2">
                      Gym Name*
                    </label>
                    <input
                      type="text"
                      id="gymName"
                      name="gymName"
                      value={formData.gymName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter your gym name"
                    />
                  </div>
                  <div>
                    <label htmlFor="basePrice" className="block text-sm font-medium mb-2">
                      Base Price (₹/month)*
                    </label>
                    <input
                      type="number"
                      id="basePrice"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter base price"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="equipments" className="block text-sm font-medium mb-2">
                      Equipments (comma separated)*
                    </label>
                    <input
                      type="text"
                      id="equipments"
                      name="equipments"
                      value={formData.equipments}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="e.g. Treadmill, Dumbbells, Bench Press, Smith Machine"
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-lime-400">Location Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="streetName" className="block text-sm font-medium mb-2">
                      Street Name*
                    </label>
                    <input
                      type="text"
                      id="streetName"
                      name="streetName"
                      value={formData.streetName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter street name"
                    />
                  </div>
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium mb-2">
                      Area*
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter area name"
                    />
                  </div>
                  <div>
                    <label htmlFor="landmark" className="block text-sm font-medium mb-2">
                      Landmark (optional)
                    </label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter landmark"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter city name"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter state name"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                      Pincode*
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-lime-400">Gym Image</h2>
                
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
                  {!previewImage ? (
                    <div className="text-center">
                      <input
                        type="file"
                        id="gymImage"
                        onChange={handleFileChange}
                        accept="image/jpeg,image/jpg,image/png"
                        className="hidden"
                        required
                      />
                      <label
                        htmlFor="gymImage"
                        className="cursor-pointer flex flex-col items-center justify-center py-6"
                      >
                        <FiUpload className="text-3xl text-gray-400 mb-2" />
                        <span className="text-lg font-medium">Upload Gym Image</span>
                        <p className="text-gray-500 text-sm mt-1">JPG, JPEG, PNG (Max 5MB)</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Gym preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      >
                        <FiX />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-3 px-8 bg-lime-400 hover:bg-lime-500 text-black font-bold rounded-lg shadow-lg transition-colors duration-300 flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Gym'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGym;