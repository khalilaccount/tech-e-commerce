import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic phone validation
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid phone number (8–15 digits).");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      console.log(res.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{8,15}"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition"
            >
              Register
            </button>

            {/* Login link */}
            <p className="text-sm text-gray-400 text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              🎉 Registration Successful!
            </h2>
            <p className="text-gray-400 mb-4">
              You can now log in with your new account.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
