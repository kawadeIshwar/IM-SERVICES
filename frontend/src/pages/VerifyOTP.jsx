import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }
    
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all fields are filled
    if (value && index === 5 && newOtp.every(digit => digit)) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    if (pastedData.length === 6) {
      inputRefs[5].current?.focus();
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp: otpValue
      });
      
      if (response.data.success) {
        setSuccess(true);
        // Redirect to reset password page after 1 second
        setTimeout(() => {
          navigate('/reset-password', { state: { email, otp: otpValue } });
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setError('');
    setOtp(['', '', '', '', '', '']);
    
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      if (response.data.success) {
        setError('');
        // Show success message briefly
        const successMsg = document.createElement('div');
        successMsg.className = 'text-green-600 text-sm text-center mt-2';
        successMsg.textContent = 'New OTP sent successfully!';
        document.querySelector('.otp-container')?.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify OTP</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the 6-digit code sent to
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
            {email}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-neutral-700 otp-container">
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                  OTP verified successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  Redirecting to reset password...
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                Enter OTP
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading || success}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-neutral-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-neutral-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success || otp.some(digit => !digit)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Verified
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Verify OTP
                </>
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={resending || success}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
              Resend OTP
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>Note:</strong> OTP expires in 10 minutes. You have 3 attempts to enter the correct code.
            </p>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
