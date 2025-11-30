import { useState, useEffect } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import { Search, Edit, Trash2, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminJobPostingProps, AdminJobProps } from './admin-jobs-types/types/types';

const AdminJob = () => {
  const [allJobs, setJobs] = useState<AdminJobProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [currentJob, setCurrentJob] = useState<AdminJobPostingProps | null>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    requirements: '',
    jobDetails: '',
    experienceRequired: 0,
    salary: 0
  });
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_DB_URL}/jobs/my-jobs`, { withCredentials: true });
        setJobs(response.data.job);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch jobs');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = allJobs.filter((jobGroup) => {
    return jobGroup.jobs.some((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white font-stencil">
        <HashLoader color="#fff" size={40} />
        <div className="text-xl mt-4">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white font-stencil">
        <div className="bg-red-800 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const handleDeletion = async (id: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_DB_URL}/jobs/${id}/delete`, { withCredentials: true })
      if (response.status === 200) {
        setJobs(allJobs.filter((job) => job.jobs.some((deletejob) => deletejob._id !== id)))
      }
    } catch (error) {
      console.log(error);

    }
  }

  const openModal = (job: AdminJobPostingProps) => {
    setCurrentJob(job);
    setFormData({
      jobTitle: job.jobTitle,
      requirements: job.requirements,
      jobDetails: job.jobDetails,
      experienceRequired: job.experienceRequired,
      salary: job.salary
    })
    setIsModalOpen(true)
    setUpdateSuccess(false);
    setUpdateError('');
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentJob(null)
    setUpdateSuccess(false);
    setUpdateError('');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'experienceRequired' || name === 'salary' ? Number(value) : value
    });
  }
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJob) return;
    setUpdateLoading(true);
    setUpdateError('');
    setUpdateSuccess(false);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_DB_URL}/jobs/${currentJob._id}/edit`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedJobs = allJobs.map(jobGroup => ({
          ...jobGroup,
          jobs: jobGroup.jobs.map(job =>
            job._id === currentJob._id ? { ...job, ...formData } : job
          )
        }));

        setJobs(updatedJobs);
        setUpdateSuccess(true);
        setTimeout(() => {
          closeModal();
        }, 1500);
      }
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || 'Failed to update job');
      console.error('Error updating job:', err);
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>My Jobs | GymLink</title>
        <meta name="description" content="Create a new job posting for your gym. Find qualified candidates for your fitness center positions." />
        <meta name="keywords" content="job posting, gym jobs, fitness careers, employment" />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-stencil p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">My Job Postings</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full sm:w-64 bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              {searchTerm ? (
                <p>No jobs match your search. Try a different keyword.</p>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="mb-4">No jobs found. Create a new job posting to get started.</p>
                  <Link to="/admin-dashboard" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center transition-colors">
                    <Plus size={18} className="mr-2" />
                    Create Your First Job Posting
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredJobs.map((jobGroup) => (
                jobGroup.jobs.map((job) => (
                  <div key={job._id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-r from-lime-800 to-lime-600">
                    <div className="bg-gray-800 p-4">
                      <h2 className="text-xl font-bold text-white truncate ">{job.jobTitle}</h2>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Experience Required:</span>
                          <span className="font-semibold">{job.experienceRequired} years</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Salary:</span>
                          <span className="font-semibold">₹{job.salary.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 text-sm text-gray-400 line-clamp-3">
                        {job.jobDetails}
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center transition-colors" onClick={() => openModal(job)}>
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center transition-colors cursor-pointer" onClick={() => handleDeletion(job._id)}>
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </button>
                        <Link to={`/admin-applications/${job._id}`} className="mt-2 block text-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors">
                        View Applications
                      </Link>
                      </div>  
                    </div>
                  </div>
                ))
              ))}
            </div>
          )}
        </div>
        <div className='flex justify-center items-center mt-4'>
          <Link to='/admin-dashboard' className='text-center flex justify-center items-center hover:text-lime-400 underline transition-all ease-in-out'>Back to Dashboard</Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 font-stencil">
          <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-t-lg">
              <h2 className="text-xl font-bold text-white">Edit Job</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 font-stencil">
              {updateSuccess && (
                <div className="mb-4 p-3 bg-green-800 bg-opacity-30 border border-green-600 rounded text-green-400">
                  Job updated successfully!
                </div>
              )}

              {updateError && (
                <div className="mb-4 p-3 bg-red-800 bg-opacity-30 border border-red-600 rounded text-red-400">
                  {updateError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Experience Required (years)</label>
                <input
                  type="number"
                  name="experienceRequired"
                  value={formData.experienceRequired}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Salary (₹)</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                  min="0"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500 min-h-24"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-400 mb-1">Job Details</label>
                <textarea
                  name="jobDetails"
                  value={formData.jobDetails}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-500 min-h-24"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded flex items-center justify-center transition-colors"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <HashLoader color="#fff" size={20} />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminJob;