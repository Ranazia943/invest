import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-hot-toast'; // Importing toast from react-hot-toast

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, { resetToken, newPassword });
      toast.success(response.data.message);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
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
          <form onSubmit={handleResetPassword} className="rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-2xl text-[#16a904] font-bold text-center mb-6">Reset Password</h2>
            <div className="max-w-md mx-auto space-y-4 relative">
             <input type="password" name="newPassword" placeholder="Enter new password" class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" required value="11223344" autocomplete="new-password"/>

<input type="password" name="confirmPassword" placeholder="Confirm new password" class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" required value="11223344" autocomplete="new-password"/>

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
                  "Reset Password"
                )}
              </Button>

              {successMessage && <div className="text-center text-sm text-green-600 mt-4">{successMessage}</div>}
              {errorMessage && <div className="text-center text-sm text-red-600 mt-4">{errorMessage}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
