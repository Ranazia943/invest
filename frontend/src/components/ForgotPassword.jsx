import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast';  // Importing toast from react-hot-toast

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Show loading indicator
    setSuccessMessage(''); // Reset success message before submitting
    setErrorMessage(''); // Reset error message before submitting

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      // Send email request to the backend to initiate the reset process
      const response = await axios.post(`${baseURL}/api/auth/forgot-password`, { email });

      // Handle successful response
      toast.success(`Password reset instructions sent to ${email}`); // Success toast
      setSuccessMessage(`Password reset email sent to ${email}`); // Set success message to display below the form
    } catch (error) {
      // Check if error response exists and handle specific error
      if (error.response?.status === 404) {
        // If email is not found in the records
        setErrorMessage('This email is not registered in our system.');
      } else {
        // General error message
        toast.error(error.response?.data?.message || 'Something went wrong!'); // Error toast
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="wrapper flex mb-28 justify-center items-center min-h-[90vh]">
      <div className="font-[sans-serif] max-md:mr-2 max-md:ml-2 max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-[#16a904]" />
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#1cc608]" />
        <div className="grid md:grid-cols-2 place-items-center gap-8 py-8 px-6">
          <div className="text-center flex flex-col items-center justify-center">
            <img src="/images/min.jpg" className="shrink-0" alt="Logo" />
          </div>
          <form onSubmit={handleForgotPassword} className="rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-2xl text-[#16a904] font-bold text-center mb-6">Forgot Password</h2>
            <div className="max-w-md mx-auto space-y-4 relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent"
                required
              />
              
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
                {loading ? "Sending..." : "Submit"}
              </Button>

              {/* Display success message under the button if it's set */}
              {successMessage && (
                <div className="text-center text-sm text-green-600 mt-4">
                  {successMessage}
                </div>
              )}

              {/* Display error message if the email is not registered */}
              {errorMessage && (
                <div className="text-center text-sm text-red-600 mt-4">
                  {errorMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
