import axios from "axios";
import React, {useState } from "react";
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiBell } from "react-icons/fi";
import { HashLoader } from "react-spinners";
import Notifications from "./Notifications";
import toast from "react-hot-toast";
import useJobs from "@/hooks/useJobs";
import { JOB_ENDPOINTS } from "@/constants/jobApiEndpoints";
import { JobProps } from "./types/types";
import TitleHelmet from "@/Forms/components/TitleHelmet";

const Jobs = () => {
    const[isLoading,setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [jobModal, setjobModal] = useState(false)
    const [individualJob, setIndividualJob] = useState({
        jobId: "",
        gymId: ""
    })
    const [jobForm, setJobForm] = useState({
        previousWork: "",
        previousExperience: "",
        invoiceDays: "",
        userResume: null as File | null
    });
    const [notificationModal, setNotificationModal] = useState(false)

    const { data, loading, error } = useJobs(JOB_ENDPOINTS.GET_ALL_JOBS)

    const filteredJobs = data.filter((job:JobProps) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            job.jobTitle.toLowerCase().includes(searchLower) ||
            job.postedBy.gymName.toLowerCase().includes(searchLower) ||
            job.postedBy.location.city.toLowerCase().includes(searchLower)
        );
    });

    const handleApply = (jobId: string, gymId: string) => {
        setjobModal(true)
        setIndividualJob((prev) => ({
            ...prev,
            jobId: jobId,
            gymId: gymId
        }))
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === "userResume" && files && files.length > 0) {
            setJobForm(prev => ({
                ...prev,
                userResume: files[0]
            }));
        } else {
            setJobForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true)
            const formData = new FormData();
            formData.append("previousWork", jobForm.previousWork);
            formData.append("previousExperience", jobForm.previousExperience);
            formData.append("invoiceDays", jobForm.invoiceDays);

            if (jobForm.userResume instanceof File) {
                formData.append("userResume", jobForm.userResume);
            }
            const response = await axios.post(import.meta.env.VITE_DB_URL + `/applicants/${individualJob.gymId}/${individualJob.jobId}/apply`, formData, { withCredentials: true })
            if (response.status === 200) {
                toast.success('Job Applied success')
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
            setjobModal(false)
            setIndividualJob({
                gymId: "",
                jobId: ""
            })
        }
    }
    const handleNotificationClick = () => {
        setNotificationModal(true);
    }
    if(loading) {
        return <HashLoader color="#fff"/>
    }

    return (
        <div className="min-h-screen bg-black text-white font-stencil">
            <TitleHelmet title="All Fitness Jobs & Careers | GymLink" description_content="Find the best fitness jobs and career opportunities in the wellness industry. Apply to trainer, instructor, and management positions at top gyms." keywords_content="fitness jobs, gym careers, personal trainer jobs, fitness instructor" og_title="All Fitness Jobs & Careers | GymLink" og_description="Find the best fitness jobs and career opportunities in the wellness industry. Apply to trainer, instructor, and management positions at top gyms." og_type="website"/>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6">Find Your Dream Fitness Career</h1>
                    <p className="text-xl mb-8">Discover opportunities at top gyms and fitness centers</p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiBriefcase className="h-5 w-5 text-gray-400" />
                            </div>

                            <input
                                type="text"
                                placeholder="Search jobs by title, gym name, or location..."
                                className="block w-full pl-10 pr-3 py-4 border rounded-lg bg-black bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent border-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="bg-lime-500 hover:bg-lime-600 text-black py-4 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
                            >
                                <FiBell className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs Listing */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-white">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <HashLoader size={50} color="#fff" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job:JobProps) => (
                            <div key={job._id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-lime-900/20 transition-all duration-300">
                                {/* Job Header */}
                                <div className="bg-gradient-to-r from-lime-800 to-lime-600 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white truncate">{job.jobTitle}</h3>
                                    <p className="text-white/80">{job.postedBy.gymName}</p>
                                </div>

                                {/* Job Details */}
                                <div className="p-6">
                                    {/* Location */}
                                    <div className="flex items-center mb-4">
                                        <FiMapPin className="text-gray-400 mr-2" />
                                        <span className="text-gray-300">
                                            {job.postedBy.location.area}, {job.postedBy.location.city}
                                        </span>
                                    </div>

                                    {/* Experience */}
                                    <div className="flex items-center mb-4">
                                        <FiClock className="text-gray-400 mr-2" />
                                        <span className="text-gray-300">
                                            {job.experienceRequired} {job.experienceRequired === 1 ? 'year' : 'years'} experience required
                                        </span>
                                    </div>

                                    {/* Salary */}
                                    <div className="flex items-center mb-4">
                                        <FiDollarSign className="text-gray-400 mr-2" />
                                        <span className="text-lime-400 font-bold">
                                            ₹{job.salary} per month
                                        </span>
                                    </div>

                                    {/* Job Details */}
                                    <div className="mb-4">
                                        <h4 className="text-white font-semibold mb-2">Job Description:</h4>
                                        <p className="text-gray-400 line-clamp-3">
                                            {job.jobDetails}
                                        </p>
                                    </div>

                                    {/* Requirements */}
                                    <div className="mb-6">
                                        <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                                        <p className="text-gray-400 line-clamp-2">
                                            {job.requirements}
                                        </p>
                                    </div>

                                    {/* Apply Button */}
                                    <button
                                        onClick={() => handleApply(job._id, job.postedBy._id)}
                                        className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center cursor-pointer"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isLoading && filteredJobs.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-white mb-2">No jobs found</h3>
                        <p className="text-gray-400">Try adjusting your search to find more opportunities.</p>
                    </div>
                )}
            </div>
            {
                jobModal && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center ">Job Application</h2>

                            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                                {/* Previous Work */}
                                <div>
                                    <label htmlFor="previousWork" className="block text-sm font-medium text-white mb-1 ">
                                        Previous Work
                                    </label>
                                    <input
                                        type="text"
                                        id="previousWork"
                                        name="previousWork"
                                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-lime-300  border-gray-200 focus:border-transparent"
                                        placeholder="Where have you worked before?"
                                        required
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Previous Experience */}
                                <div>
                                    <label htmlFor="previousExperience" className="block text-sm font-medium text-white mb-1">
                                        Previous Experience (years)
                                    </label>
                                    <input
                                        type="number"
                                        id="previousExperience"
                                        name="previousExperience"
                                        min="0"
                                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-lime-300  border-gray-200 focus:border-transparent"
                                        required
                                        placeholder="No of years in experience in previous work.."
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Invoice Days */}
                                <div>
                                    <label htmlFor="invoiceDays" className="block text-sm font-medium text-white mb-1">
                                        Invoice Days
                                    </label>
                                    <input
                                        type="number"
                                        id="invoiceDays"
                                        name="invoiceDays"
                                        min="0"
                                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-lime-300  border-gray-200 focus:border-transparent"
                                        placeholder="How soon you can join?"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-white mb-1">
                                        Resume
                                    </label>
                                    <input
                                        type="file"
                                        id="resume"
                                        name="userResume"
                                        className="w-full px-3 py-2  rounded-md border focus:outline-none focus:ring-2 focus:ring-lime-300  border-gray-200 focus:border-transparent"
                                        required
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Only docx(document) file is allowed"
                                    />
                                </div>


                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-lime-400 text-white py-2 px-4 rounded-md hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-300 cursor-pointer"
                                    >
                                        Submit Application
                                    </button>
                                </div>

                                {/* Cancel Button */}
                                <div>
                                    <button
                                        type="button"
                                        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
                                        onClick={() => setjobModal(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                notificationModal && (
                    <Notifications setstate={setNotificationModal} />
                )
            }
            {
                error && (<h1 className='text-red-400 font-bold text-3xl text-center'>{error}</h1>)
            }
        </div>
    );
};

export default Jobs;