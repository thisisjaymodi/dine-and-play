import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaLock, FaShieldHalved, FaChevronRight, FaArrowLeft, FaCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        new: false,
        confirm: false
    });

    const toggleVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulation of API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans">
                <div className="max-w-md w-full text-center">
                    <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
                        <div className="card-body p-10">
                            <div className="w-20 h-20 bg-success/10 text-success rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
                                <FaCircleCheck />
                            </div>
                            <h2 className="text-3xl font-black mb-4">Password reset!</h2>
                            <p className="text-base-content/60 leading-relaxed mb-8 font-medium">
                                Your account security has been updated successfully. You can now use your new password to sign in.
                            </p>
                            <Link
                                to="/auth/login"
                                className="btn btn-primary btn-block rounded-2xl h-14 font-bold shadow-lg shadow-primary/20"
                            >
                                Sign in to Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans">
            <div className="max-w-md w-full">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <Link to="/" className="text-4xl font-black tracking-tighter">
                        Dine <span className="text-primary">&</span> Play
                    </Link>
                    <p className="text-sm font-bold opacity-30 uppercase tracking-[0.2em] mt-4">Security Vault</p>
                </div>

                {/* Card Section */}
                <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
                    <div className="card-body p-10">
                        <header className="mb-8 text-center sm:text-left">
                            <h1 className="text-3xl font-black mb-2">Reset Password</h1>
                            <p className="text-base-content/60 text-sm font-medium leading-relaxed">Please choose a secure new password for your merchant access.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-xs uppercase tracking-widest opacity-50">New Password</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors z-10">
                                        <FaLock className="h-4 w-4" />
                                    </div>
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        className="input input-bordered w-full h-14 pl-12 pr-12 rounded-2xl bg-base-200/30 focus:ring-4 focus:ring-primary/10 transition-all font-medium border-base-300"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onPaste={(e) => e.preventDefault()}
                                        required
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

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-xs uppercase tracking-widest opacity-50">Confirm New Password</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors z-10">
                                        <FaShieldHalved className="h-4 w-4" />
                                    </div>
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        placeholder="Repeat new password"
                                        className="input input-bordered w-full h-14 pl-12 pr-12 rounded-2xl bg-base-200/30 focus:ring-4 focus:ring-primary/10 transition-all font-medium border-base-300"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onPaste={(e) => e.preventDefault()}
                                        required
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

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block rounded-2xl h-14 font-black shadow-lg shadow-primary/20 group"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <>
                                            Change Password
                                            <FaChevronRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <Link
                                to="/auth/login"
                                className="btn btn-ghost btn-block rounded-2xl h-14 font-bold opacity-60 hover:opacity-100 transition-all flex items-center gap-2"
                            >
                                <FaArrowLeft className="text-xs" /> Cancel & Return
                            </Link>
                        </form>
                    </div>
                </div>

                {/* Password Requirements Info */}
                <div className="mt-8 bg-primary/5 border border-primary/10 rounded-[2rem] p-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                        Security Tip: Use a mix of letters, numbers and special characters to keep your staff account secure.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
