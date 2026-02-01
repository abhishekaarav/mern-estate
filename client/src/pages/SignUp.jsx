import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import img from "../assets/signUpPage.png";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaArrowRight,
} from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(ellipse_at_center,_#f3f4f3_0%,_#d1d5d1_45%,_#9fa3a0_100%)]"
    >
      <div className="w-full max-w-6xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white">
        <div className="hidden md:block relative">
          <img
            src={img}
            alt="Sign Up Visual"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="p-12 bg-[#f8fbff]">
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            Create Account
            <FaUserPlus className="text-blue-600" />
          </h1>

          <p className="text-slate-500 mb-8">
            Sign up to get started with PrimeSpace
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
           
            <div
              className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 bg-white
                            transition-all duration-300
                            hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <FaUser className="text-slate-400" />
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>

           
            <div
              className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 bg-white
                            transition-all duration-300
                            hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <FaEnvelope className="text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                id="email"
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
            </div>

            
            <div
              className="flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 bg-white
                            transition-all duration-300
                            hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <FaLock className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-blue-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-3
                         bg-[#1e5eff] text-white py-3 rounded-xl
                         font-semibold text-lg
                         transition-all duration-300
                         hover:bg-[#1747c7] hover:scale-[1.01]
                         active:scale-[0.98]
                         disabled:opacity-70"
            >
              <FaUserPlus />
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <OAuth />
          </form>

          <div className="mt-8 text-sm text-slate-600 flex items-center gap-1">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1 ml-1"
            >
              Sign in <FaArrowRight className="text-xs mt-[1px]" />
            </Link>
          </div>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
