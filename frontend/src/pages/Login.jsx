import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(`${API_BASE}/auth/login`, { email, password });

      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
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
              "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200')",
          }}
        >
          <div className="h-full bg-black/50 flex flex-col justify-center items-center text-white p-10">
            <h2 className="text-4xl font-bold">Welcome Back</h2>
            <p className="mt-5 text-center text-lg">
              Access your account to manage your properties and connect with trusted agents.
            </p>
          </div>
        </div>

        <div className="p-12">
          <h1 className="text-4xl font-bold text-[#36454F]">Login</h1>
          <p className="text-gray-500 mt-3">Sign in to continue.</p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#" className="text-[#0066CC] hover:underline">Forgot Password?</a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white py-4 rounded-xl mt-8 font-semibold transition disabled:cursor-not-allowed disabled:bg-[#5b8ec9]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-4 my-8">
            <hr className="flex-1" />
            <span className="text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>

          <button className="w-full border py-4 rounded-xl hover:bg-gray-100 transition">
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#0066CC] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;