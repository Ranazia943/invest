import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'; // For API calls

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Use navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(`${baseURL}/api/admin/login`, { email, password }, {
        withCredentials: true, // Ensure cookies are sent and received
      });

      setLoading(false);

      // Display success message
      toast.success(response.data.message);

      // Redirect using react-router
      navigate("/admin/dashboard");
    } catch (error) {
      setLoading(false);

      // Display error message
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="wrapper flex mb-28 justify-center items-center min-h-[90vh]">
        <div className="font-[sans-serif] max-md:mr-2 max-md:ml-2 max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
          <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[#16a904]" />
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#1cc608]" />
          <div className="grid md:grid-cols-2 place-items-center gap-8 py-8 px-6">
            <div className="text-center flex flex-col items-center justify-center">
              <img src="/images/min.jpg" className="shrink-0" alt="Logo" />
            </div>
            <form onSubmit={handleSubmit} className="rounded-tl-3xl rounded-bl-3xl">
              <h2 className="text-2xl text-[#16a904] font-bold text-center mb-6">Admin Login</h2>
              <div className="max-w-md mx-auto space-y-4 relative">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                />
                <div className="flex items-center justify-end">
                  <p>If you have not registered yet,</p>
                  <Link to="/register" className="text-[#16a904] ml-2 hover:underline hover:underline-offset-2">
                    Register
                  </Link>
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ background: "#16a904" }}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      fill="#fff"
                      className="mr-2 inline"
                      viewBox="0 0 548.244 548.244"
                    >
                      <path
                        fillRule="evenodd"
                        d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {loading ? "Logging In..." : "Submit"}
                </Button>
                <Link to="/forgot_password" className="text-[#16a904] ml-2 hover:underline hover:underline-offset-2">
                  <p>Forget Password</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
