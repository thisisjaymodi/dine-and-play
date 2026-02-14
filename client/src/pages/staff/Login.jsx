import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { FaEnvelope, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Authentication logic will be implemented here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 font-sans">
      <div className="max-w-md w-full">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <RouterLink to="/" className="text-4xl font-black tracking-tighter">
            Dine <span className="text-primary">&</span> Play
          </RouterLink>
          <p className="text-sm font-bold opacity-30 uppercase tracking-[0.2em] mt-4">Staff Portal</p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
          <div className="card-body p-10">
            <header className="mb-8">
              <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
              <p className="text-base-content/60 text-sm font-medium">Please sign in to manage your scan history and staff settings.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
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

              {/* Password Field */}
              <div className="form-control w-full">
                <div className="flex justify-between items-center mb-1">
                  <label className="label p-0">
                    <span className="label-text font-bold text-xs uppercase tracking-widest opacity-50">Password</span>
                  </label>
                  <RouterLink
                    to="/auth/forgot-password"
                    className="label-text-alt link link-primary font-bold text-xs uppercase tracking-wider"
                  >
                    Forgot?
                  </RouterLink>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors z-10">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="input input-bordered w-full h-14 pl-12 pr-12 rounded-2xl bg-base-200/30 focus:ring-4 focus:ring-primary/10 transition-all font-medium border-base-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/30 hover:text-primary transition-colors z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full h-14 mt-4 rounded-2xl font-black shadow-lg shadow-primary/20 gap-2 overflow-hidden group"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner" aria-hidden="true" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <FaArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Signup Link */}
        <div className="text-center mt-8">
          <p className="text-sm font-medium text-base-content/60 uppercase tracking-wide text-xs">
            Want to partner with us?{" "}
            <RouterLink to="/auth/signup" className="link link-primary font-black ml-1">
              Register Restaurant
            </RouterLink>
          </p>
        </div>

        {/* Support Footer */}
        <p className="text-center mt-12 text-[11px] font-bold opacity-30 uppercase tracking-widest leading-relaxed">
          Need help? Contact system support or your lead manager to authorize new staff devices.
        </p>
      </div>
    </div>
  );
};

export default Login;
