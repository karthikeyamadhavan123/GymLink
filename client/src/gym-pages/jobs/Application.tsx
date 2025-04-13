import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2, FileText, Award, Briefcase } from "lucide-react";
import { HashLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";

const applicationUrl = import.meta.env.VITE_DB_URL + '/applicants/all';

interface ApplicationProps {
    _id: string;
    jobId: string;
    invoiceDays: number;
    previousExperience: number;
    previousWork: string;
    resume: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
}

const Application = () => {
    const [applications, setApplications] = useState<ApplicationProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                setLoading(true);
                const res = await axios.get(applicationUrl, { withCredentials: true });
                setApplications(res.data.applications);
                setLoading(false);
            } catch (err) {
                setError("Failed to load applications");
                setLoading(false);
                console.error(err);
            }
        };

        fetchAllApplications();
    }, []);

    const handleDeletion = async (jobId: string, applicationId: string) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_DB_URL}/applicants/${jobId}/${applicationId}/delete`, { withCredentials: true });
            if (res.status === 200) {
                setApplications(applications.filter((application) => application._id !== applicationId));
            }
        } catch (err) {
            setError("Failed to delete application");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 text-white">
                <HashLoader color="#fff" size={20} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
                {error}
            </div>
        );
    }

    return (
        <>
            <Helmet>
            <title>{`My Applications | Applications`}</title>
                <meta name="description" content={`Manage ${applications.length} job applications`} />
            </Helmet>
            <div className="w-full max-w-6xl mx-auto p-6 font-stencil text-white">
                <h1 className="text-3xl font-bold text-white mb-6">Applications</h1>

                {applications.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-300">
                        No applications found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {applications.map((application) => (
                            <div
                                key={application._id}
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                            >

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                        Status :<span className="font-medium underline text-lime-300"> {" "} {application.status}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Award className="h-5 w-5 text-blue-400" />
                                            <span>
                                                <span className="font-bold">{application.previousExperience}</span> years of experience
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Briefcase className="h-5 w-5 text-purple-400" />
                                            <span>{application.previousWork}</span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-5 w-5 text-green-400" />
                                            <a
                                                href={application.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                View Resume
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-700">
                                        <button
                                            onClick={() => handleDeletion(application.jobId, application._id)}
                                            className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Delete Application</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Application;