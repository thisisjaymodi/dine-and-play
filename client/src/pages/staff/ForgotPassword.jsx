import { useState } from "react";
import { Link } from "react-router";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa6";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulation of API call
        setTimeout(() => {
            setLoading(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans">
                <div className="max-w-md w-full">
                    <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
                        <div className="card-body p-10 text-center">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
                                <FaPaperPlane />
                            </div>
                            <h2 className="text-3xl font-black mb-4">Check your email</h2>
                            <p className="text-base-content/60 leading-relaxed mb-8">
                                If an account exists for <span className="font-bold text-base-content">{email}</span>, you will receive a password reset link shortly.
                            </p>
                            <Link
                                to="/auth/login"
                                className="btn btn-primary btn-block rounded-2xl h-14 font-bold shadow-lg shadow-primary/20"
                            >
                                <FaArrowLeft className="mr-2" /> Back to Login
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
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link to="/" className="text-4xl font-black tracking-tighter">
                        Dine <span className="text-primary">&</span> Play
                    </Link>
                    <p className="text-sm font-bold opacity-30 uppercase tracking-[0.2em] mt-4">Security Center</p>
                </div>

                {/* Card Section */}
                <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
                    <div className="card-body p-10">
                        <header className="mb-8">
                            <h1 className="text-3xl font-black mb-2">Forgot Password?</h1>
                            <p className="text-base-content/60 text-sm font-medium">No worries! Enter your work email and we'll send you a recovery link.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-xs uppercase tracking-widest opacity-50">Email Address</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors z-10">
                                        <FaEnvelope className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="manager@restaurant.com"
                                        className="input input-bordered w-full h-14 pl-12 rounded-2xl bg-base-200/30 focus:ring-4 focus:ring-primary/10 transition-all font-medium border-base-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block rounded-2xl h-14 font-black shadow-lg shadow-primary/20 group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        Send Recovery Link
                                        <FaPaperPlane className="ml-2 text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <Link
                                to="/auth/login"
                                className="btn btn-ghost btn-block rounded-2xl h-14 font-bold opacity-60 hover:opacity-100 transition-all flex items-center gap-2"
                            >
                                <FaArrowLeft className="text-xs" /> Back to Sign In
                            </Link>
                        </form>
                    </div>
                </div>

                {/* Footer Tip */}
                <p className="text-center mt-8 text-[11px] font-bold opacity-30 uppercase tracking-widest leading-relaxed px-10">
                    Protected by platform security. If you are a waiter, please contact your manager directly.
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
