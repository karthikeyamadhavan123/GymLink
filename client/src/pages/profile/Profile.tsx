import React from "react";
import { Helmet } from "react-helmet-async";

interface ProfileSectionProps {
    name?: string;
    email?: string;
    role?: "user" | "trainer" | "admin";
    avatar?: string;
}

const Profile: React.FC<ProfileSectionProps> = ({
    name = "John Doe",
    email = "example@gmail.com",
    role = "user",
    avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
}) => {
    return (
        <>
            <Helmet>
                <title>Profile | GymLink</title>
                <meta
                    name="description"
                    content="View and manage your GymLink profile, personal information, and fitness preferences."
                />
                <meta
                    name="keywords"
                    content="GymLink profile, user profile, fitness profile, gym app profile"
                />

                <meta property="og:title" content="Profile - GymLink" />
                <meta
                    property="og:description"
                    content="Access your GymLink profile and manage your fitness information easily."
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="w-full max-w-4xl mx-auto mt-10 font-stencil">
                {/* Banner */}
                <div className="h-48 rounded-xl bg-linear-to-br from-lime-500 via-emerald-600 to-teal-700 
                      relative shadow-2xl overflow-hidden">
                    {/* Decorative overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

                    {/* Avatar */}
                    <div className="absolute -bottom-16 left-8">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full ring-4 ring-zinc-900 shadow-2xl object-cover"
                        />
                    </div>
                </div>

                {/* Profile Info Card */}
                <div className="bg-linear-to-br from-zinc-900 to-zinc-950 backdrop-blur-lg border border-zinc-800 
                      rounded-2xl p-8 mt-20 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white tracking-tight">{name}</h1>
                            <p className="text-zinc-400 text-base mt-1">{email}</p>
                            <div className="inline-flex items-center mt-3 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
                                <span className="text-lime-400 text-sm font-semibold capitalize">{role}</span>
                            </div>
                        </div>
                        <button className="mt-6 sm:mt-0 px-6 py-2.5 rounded-lg bg-lime-500 
                             text-black font-medium hover:bg-lime-400 
                             transform hover:scale-105 transition-all shadow-lg shadow-lime-500/20">
                            Edit Profile
                        </button>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent my-8" />

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700/50 hover:border-lime-500/30 transition-all hover:shadow-lg hover:shadow-lime-500/10 group">
                            <h2 className="text-white text-2xl font-bold group-hover:text-lime-400 transition-colors">125</h2>
                            <p className="text-zinc-400 text-sm mt-1">Followers</p>
                        </div>
                        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700/50 hover:border-lime-500/30 transition-all hover:shadow-lg hover:shadow-lime-500/10 group">
                            <h2 className="text-white text-2xl font-bold group-hover:text-lime-400 transition-colors">89</h2>
                            <p className="text-zinc-400 text-sm mt-1">Following</p>
                        </div>
                        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700/50 hover:border-lime-500/30 transition-all hover:shadow-lg hover:shadow-lime-500/10 group">
                            <h2 className="text-white text-2xl font-bold group-hover:text-lime-400 transition-colors">34</h2>
                            <p className="text-zinc-400 text-sm mt-1">Posts</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-8 border-b border-zinc-800">
                        {["About", "Stats", "Activity"].map((tab) => (
                            <button
                                key={tab}
                                className="px-6 py-3 text-zinc-400 text-sm font-medium hover:text-lime-400 
                         transition-all relative group"
                            >
                                {tab}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-lime-400 
                               group-hover:w-full transition-all duration-300"></span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;