import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; 
import { Button } from '@mui/material';

import useSignup from "./Hooks/useSignup";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    referredBy: "", // New state for referral code
  });

  const [error, setError] = useState(""); 
  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission
    const success = await signup(inputs);
    if (!success) {
      // Handle failure if needed
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="wrapper flex mb-28 justify-center items-center min-h-[90vh]">
        <div className="font-[sans-serif] max-md:mr-2 max-md:ml-2 max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[#16a904]" />
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#16a904]" />
          <div className="grid md:grid-cols-2 place-items-center gap-8 py-8 px-6">
            <div className="text-center flex flex-col items-center justify-center">
              <img src="/images/min.jpg" className="shrink-0 " alt="Register" />
            </div>
            <form onSubmit={handleSubmit} className="rounded-tl-3xl rounded-bl-3xl">
              <h2 className="text-2xl text-[#16a904] font-bold text-center mb-6">Register Now</h2>
              {error && <p className="text-red-600 text-center mb-3">{error}</p>}
              <div className="max-w-md mx-auto space-y-3 relative">
                <input
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                  required
                />
                <input
                  type="text"
                  name="referredBy"
                  value={inputs.referredBy}
                  onChange={handleChange}
                  placeholder="Referral Code (optional)"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <div className="flex items-center justify-end">
                  <p>If you have an account then</p>
                  <Link to="/login" className="text-[#16a904] ml-2 hover:underline hover:underline-offset-2">
                    Login
                  </Link>
                </div>
                <Button variant="contained" type="submit" sx={{ background: "#16a904" }} className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;
