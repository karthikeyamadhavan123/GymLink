import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Settings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <Helmet>
                <title>Settings | GymLink</title>
                <meta
                    name="description"
                    content="Update your GymLink account settings, privacy options, and app preferences."
                />
                <meta
                    name="keywords"
                    content="GymLink settings, account settings, fitness app settings, profile settings"
                />

                <meta property="og:title" content="Settings - GymLink" />
                <meta
                    property="og:description"
                    content="Manage your GymLink account settings and customize your fitness experience."
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="min-h-screen bg-black p-6 font-stencil">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-zinc-400">Manage your account settings and preferences</p>
                    </div>

                    {/* Profile Settings */}
                    <div className="bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                            Profile Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="example@gmail.com"
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Bio</label>
                                <textarea
                                    rows={3}
                                    defaultValue="Fitness enthusiast and health coach"
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>

                        <button className="mt-6 px-6 py-2.5 rounded-lg bg-lime-500 text-black font-medium hover:bg-lime-400 transform hover:scale-105 transition-all shadow-lg shadow-lime-500/20">
                            Save Changes
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                            Notifications
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all">
                                <div>
                                    <h3 className="text-white font-medium">Email Notifications</h3>
                                    <p className="text-zinc-400 text-sm">Receive notifications via email</p>
                                </div>
                                <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={`relative w-14 h-7 rounded-full transition-all ${emailNotifications ? "bg-lime-500" : "bg-zinc-700"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${emailNotifications ? "translate-x-7" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all">
                                <div>
                                    <h3 className="text-white font-medium">Push Notifications</h3>
                                    <p className="text-zinc-400 text-sm">Receive push notifications on your device</p>
                                </div>
                                <button
                                    onClick={() => setPushNotifications(!pushNotifications)}
                                    className={`relative w-14 h-7 rounded-full transition-all ${pushNotifications ? "bg-lime-500" : "bg-zinc-700"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${pushNotifications ? "translate-x-7" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                            Security
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all">
                                <div>
                                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                                    <p className="text-zinc-400 text-sm">Add an extra layer of security</p>
                                </div>
                                <button
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`relative w-14 h-7 rounded-full transition-all ${twoFactor ? "bg-lime-500" : "bg-zinc-700"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${twoFactor ? "translate-x-7" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            <button className="w-full p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all text-left">
                                <h3 className="text-white font-medium">Change Password</h3>
                                <p className="text-zinc-400 text-sm">Update your password regularly</p>
                            </button>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className="bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-lime-500 rounded-full"></span>
                            Appearance
                        </h2>

                        <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all">
                            <div>
                                <h3 className="text-white font-medium">Dark Mode</h3>
                                <p className="text-zinc-400 text-sm">Toggle dark mode theme</p>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`relative w-14 h-7 rounded-full transition-all ${darkMode ? "bg-lime-500" : "bg-zinc-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? "translate-x-7" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-linear-to-br from-red-950 to-zinc-950 border border-red-900/50 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                            Danger Zone
                        </h2>

                        <div className="space-y-3">
                            <button className="w-full p-4 bg-zinc-900/50 rounded-xl border border-red-900/50 hover:border-red-700 transition-all text-left group">
                                <h3 className="text-red-400 font-medium group-hover:text-red-300">Deactivate Account</h3>
                                <p className="text-zinc-400 text-sm">Temporarily disable your account</p>
                            </button>

                            <button className="w-full p-4 bg-zinc-900/50 rounded-xl border border-red-900/50 hover:border-red-700 transition-all text-left group">
                                <h3 className="text-red-400 font-medium group-hover:text-red-300">Delete Account</h3>
                                <p className="text-zinc-400 text-sm">Permanently delete your account and data</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;