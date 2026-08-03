import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
      });

      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div
          className="hidden lg:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200')",
          }}
        >
          <div className="h-full bg-black/50 flex flex-col justify-center items-center text-white p-10">
            <h2 className="text-4xl font-bold">Join HomeScape</h2>
            <p className="mt-5 text-center text-lg">
              Create your account and explore thousands of premium properties.
            </p>
          </div>
        </div>

        <div className="p-12">
          <h1 className="text-4xl font-bold text-[#36454F]">Create Account</h1>
          <p className="text-gray-500 mt-3">Register to continue.</p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8">
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white py-4 rounded-xl mt-8 font-semibold transition disabled:cursor-not-allowed disabled:bg-[#5b8ec9]"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0066CC] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;