import React from 'react';
import { FaUser, FaEnvelope, FaIdBadge, FaBuilding, FaCamera } from 'react-icons/fa6';

const Profile = () => {
    const user = {
        name: "Alex Waiter",
        email: "alex.w@demo-bistro.com",
        role: "Senior Waitstaff",
        id: "EMP-9821",
        restaurant: "Demo Bistro",
        joined: "January 2024"
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content">My Profile</h1>
                <p className="text-base-content/60 mt-1">Manage your account information and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-8 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        <div className="avatar placeholder mb-4 mt-2">
                            <div className="bg-primary text-primary-content rounded-3xl w-24 h-24 text-3xl font-black shadow-xl shadow-primary/20 relative group">
                                {user.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-xs uppercase tracking-widest font-black text-primary mt-1">{user.role}</p>

                        <div className="divider opacity-50 my-6"></div>

                        <div className="flex flex-col gap-4 text-left">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/60">
                                    <FaIdBadge />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase opacity-40 font-bold leading-none mb-1">Employee ID</p>
                                    <p className="font-bold">{user.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-base-content/60">
                                    <FaBuilding />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase opacity-40 font-bold leading-none mb-1">Restaurant</p>
                                    <p className="font-bold">{user.restaurant}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-8">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <FaUser className="text-primary" /> Personal Information
                        </h3>

                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-60">Full Name</span>
                                </label>
                                <input type="text" defaultValue={user.name} className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-60">Email Address</span>
                                </label>
                                <input type="email" defaultValue={user.email} className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-60">Staff Role</span>
                                </label>
                                <input type="text" value={user.role} readOnly className="input input-bordered w-full rounded-xl bg-base-200/50 opacity-70 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-60">Work Location</span>
                                </label>
                                <input type="text" value={user.restaurant} readOnly className="input input-bordered w-full rounded-xl bg-base-200/50 opacity-70 cursor-not-allowed" />
                            </div>

                            <div className="sm:col-span-2 flex justify-end mt-4">
                                <button type="submit" className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20">
                                    Save Changes
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 p-4 bg-info/5 border border-info/20 rounded-2xl flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-info/10 text-info flex items-center justify-center mt-1 flex-shrink-0">
                                <FaIdBadge className="text-sm" />
                            </div>
                            <p className="text-[11px] text-info-content/70 leading-relaxed italic">
                                Your Role and Work Location are managed by your administrator and cannot be edited directly. Please contact support if these details are incorrect.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
