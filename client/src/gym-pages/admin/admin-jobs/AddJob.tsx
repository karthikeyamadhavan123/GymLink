import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';

const AddJob = () => {
  const { gymId } = useParams();
  const navigate = useNavigate();
  const jobUrl = import.meta.env.VITE_DB_URL + `/jobs/${gymId}/new`
  const [formData, setFormData] = useState({
    jobTitle: '',
    requirements: '',
    jobDetails: '',
    experienceRequired: 0,
    salary: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experienceRequired' || name === 'salary' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(jobUrl, formData, { withCredentials: true });
      setLoading(true);
      if (response.status === 201) {
       toast.success('Job created successful')
        navigate('/my-jobs');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      jobTitle: '',
      requirements: '',
      jobDetails: '',
      experienceRequired: 0,
      salary: 0
    })
  }
  return (
    <>
      <Helmet>
        <title>Post a New Job | GymLink</title>
        <meta name="description" content="Create a new job posting for your gym. Find qualified candidates for your fitness center positions." />
        <meta name="keywords" content="job posting, gym jobs, fitness careers, employment" />
      </Helmet>

      <div className="bg-black min-h-screen font-stencil text-white py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Post a New Job</h1>

          {error && (
            <div className="bg-red-800 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="mb-6">
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                Job Title*
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-lime-400 focus:border-lime-400 focus:outline-none focus:ring-2"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                Requirements*
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-lime-400 focus:border-lime-400 focus:outline-none focus:ring-2"
                required
              />
              <p className="text-xs mt-1 text-gray-400">List the key requirements for this position</p>
            </div>

            <div className="mb-6">
              <label htmlFor="jobDetails" className="block text-sm font-medium mb-2">
                Job Details*
              </label>
              <textarea
                id="jobDetails"
                name="jobDetails"
                value={formData.jobDetails}
                onChange={handleChange}
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-lime-400 focus:border-lime-400 focus:outline-none focus:ring-2"
                required
              />
              <p className="text-xs mt-1 text-gray-400">Provide a detailed description of the job responsibilities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="experienceRequired" className="block text-sm font-medium mb-2">
                  Experience Required (years)*
                </label>
                <input
                  type="number"
                  id="experienceRequired"
                  name="experienceRequired"
                  value={formData.experienceRequired}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-lime-400 focus:border-lime-400 focus:outline-none focus:ring-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium mb-2">
                  Salary*
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:ring-lime-400 focus:border-lime-400 focus:outline-none focus:ring-2"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-700 text-white py-3 px-6 rounded-md mr-4 hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-lime-400 text-white py-3 px-6 rounded-md hover:bg-lime-500 transition disabled:bg-lime-400 cursor-pointer"
              >
                {loading ? <HashLoader size={20} color='#fff' /> : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default AddJob;