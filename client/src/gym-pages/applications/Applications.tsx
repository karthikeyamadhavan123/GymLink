import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import { Search, FileText, Check, X, ArrowLeft } from 'lucide-react';

interface ApplicationProps {
    _id: string;
    appliedUser: {
        firstName: string,
        email: string
        gender: string
        phone_number: string
    }
    gym: {
        gymName: string
        location: {
            state: string
        }
    }
    invoiceDays: number
    jobId: string
    previousExperience: string
    previousWork: string
    status: string
    resume: string
}

const Applications = () => {
    const { id } = useParams<{ id: string }>();
    const [applications, setApplications] = useState<ApplicationProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                // Fetch applications for the specific job ID
                const response = await axios.get(`${import.meta.env.VITE_DB_URL}/applicants/${id}/all/admins`, {
                    withCredentials: true
                });
                setApplications(response.data.applications || []);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch applications');
                console.error('Error fetching applications:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchApplications();
        }
    }, [id]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application.appliedUser.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.appliedUser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.gym.gymName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleAccept = async (applicationId: string, jobId: string) => {
        try {
            await axios.put(`${import.meta.env.VITE_DB_URL}/applicants/accept/${jobId}/${applicationId}`,
                { status: 'accepted' },
                { withCredentials: true }
            );

            // Update local state
            setApplications(applications.map(app =>
                app._id === applicationId ? { ...app, status: 'accepted' } : app
            ));
        } catch (err) {
            console.error('Error accepting application:', err);
        }
    };

    const handleReject = async (applicationId: string, jobId: string) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_DB_URL}/reject/${jobId}/${applicationId}`,
                { status: 'rejected' },
                { withCredentials: true }
            );
            if (res.status === 200) {
                setApplications(applications.map(app =>
                    app._id === applicationId ? { ...app, status: 'rejected' } : app
                ));

            }
        } catch (err) {
            console.error('Error rejecting application:', err);
        }
    };

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Job Applications | GymLink</title>
                    <meta name="description" content="View applications for your job posting" />
                </Helmet>
                <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white font-stencil">
                    <HashLoader color="#fff" size={40} />
                    <div className="text-xl mt-4">Loading applications...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Helmet>
                    <title>Error | GymLink</title>
                    <meta name="description" content="Error loading applications" />
                </Helmet>
                <div className="flex justify-center items-center min-h-screen bg-black text-white font-stencil">
                    <div className="bg-red-800 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-2">Error</h2>
                        <p className="text-gray-300">{error}</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Job Applications | GymLink</title>
                <meta name="description" content="View and manage job applications" />
            </Helmet>

            <div className="min-h-screen bg-black text-white font-stencil p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center mb-6">
                        <Link to="/my-jobs" className="mr-4">
                            <ArrowLeft className="text-gray-400 hover:text-lime-400 transition-colors" />
                        </Link>
                        <h1 className="text-2xl md:text-3xl font-bold">Applications</h1>
                    </div>

                    {/* Search and filters */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search applicants..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-lime-500"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            <div className="md:w-48">
                                <select
                                    value={statusFilter}
                                    onChange={handleStatusChange}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-transparent focus:ring-2 focus:ring-lime-500 appearance-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredApplications.length === 0 ? (
                        <div className="bg-gray-900 rounded-lg p-8 text-center">
                            {searchTerm || statusFilter !== 'all' ? (
                                <p>No applications match your search criteria.</p>
                            ) : (
                                <p>No applications have been submitted for this job posting yet.</p>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredApplications.map((application) => (
                                <div
                                    key={application._id}
                                    className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 flex justify-between items-center">
                                        <h2 className="font-bold text-white truncate">{application.appliedUser.firstName}</h2>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${application.status === 'pending' ? 'bg-yellow-800 text-yellow-200' :
                                            application.status === 'accepted' ? 'bg-green-800 text-green-200' :
                                                'bg-red-800 text-red-200'
                                            }`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <div className="text-sm mb-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-400">Email:</span>
                                                <span className="font-medium text-right">{application.appliedUser.email}</span>
                                            </div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-400">Gym:</span>
                                                <span className="font-medium text-right">{application.gym.gymName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Experience:</span>
                                                <span className="font-medium">{application.previousExperience}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            {application.resume && (
                                                <a
                                                    href={application.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded flex items-center justify-center text-sm transition-colors"
                                                >
                                                    <FileText size={14} className="mr-1" />
                                                    Resume
                                                </a>
                                            )}

                                            <button
                                                onClick={() => handleAccept(application._id, application.jobId)}
                                                disabled={application.status === 'accepted'}
                                                className={`flex-1 py-1.5 px-2 rounded flex items-center justify-center text-sm transition-colors ${application.status === 'accepted'
                                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                                    }`}
                                            >
                                                <Check size={14} className="mr-1" />
                                                Accept
                                            </button>

                                            <button
                                                onClick={() => handleReject(application._id, application.jobId)}
                                                disabled={application.status === 'rejected'}
                                                className={`flex-1 py-1.5 px-2 rounded flex items-center justify-center text-sm transition-colors ${application.status === 'rejected'
                                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                                    }`}
                                            >
                                                <X size={14} className="mr-1" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-center mt-8">
                        <Link
                            to="/my-jobs"
                            className="text-center flex items-center hover:text-lime-400 transition-all ease-in-out"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Job Listings
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Applications;