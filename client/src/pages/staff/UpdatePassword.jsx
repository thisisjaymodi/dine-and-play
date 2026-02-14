import React, { useState } from 'react';
import { FaLock, FaShieldHalved, FaKey, FaChevronRight, FaEye, FaEyeSlash } from 'react-icons/fa6';

const UpdatePassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const toggleVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content">Security</h1>
                <p className="text-base-content/60 mt-1">Update your password to keep your account secure.</p>
            </div>

            <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                <div className="bg-primary/5 p-8 border-b border-base-300 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl">
                        <FaLock />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">Change Password</h3>
                        <p className="text-sm opacity-60">We recommend using a password you don't use elsewhere.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold opacity-60">Current Password</span>
                        </label>
                        <div className="relative">
                            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 z-10" />
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                placeholder="••••••••"
                                className="input input-bordered w-full h-12 pl-12 pr-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                                onPaste={(e) => e.preventDefault()}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/30 hover:text-primary transition-colors z-10"
                                onClick={() => toggleVisibility('current')}
                            >
                                {showPasswords.current ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold opacity-60">New Password</span>
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 z-10" />
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="New PIN/Password"
                                    className="input input-bordered w-full h-12 pl-12 pr-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                                    onPaste={(e) => e.preventDefault()}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/30 hover:text-primary transition-colors z-10"
                                    onClick={() => toggleVisibility('new')}
                                >
                                    {showPasswords.new ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold opacity-60">Confirm New Password</span>
                            </label>
                            <div className="relative">
                                <FaShieldHalved className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 z-10" />
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Repeat Password"
                                    className="input input-bordered w-full h-12 pl-12 pr-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                                    onPaste={(e) => e.preventDefault()}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/30 hover:text-primary transition-colors z-10"
                                    onClick={() => toggleVisibility('confirm')}
                                >
                                    {showPasswords.confirm ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="divider opacity-50"></div>

                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary rounded-2xl px-10 h-14 font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    Update Password <FaChevronRight className="text-[10px]" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
