"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Phone, Shield, CheckCircle2 } from "lucide-react";

type AuthStep = "phone" | "otp" | "success";

interface AuthPageProps {
  onNavigate?: (page: string) => void;
}

export function AuthPage({ onNavigate }: AuthPageProps = {}) {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for OTP resend
  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const validatePhoneNumber = (phone: string) => {
    // Demo mode - accept any 10-digit number
    return phone.length === 10;
  };

  const handleSendOTP = async () => {
    setError("");
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(60);
      setCanResend(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    
    // Simulate resend
    setTimeout(() => {
      // OTP resent
    }, 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last digit
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newOtp.every(digit => digit !== "") && index === 5) {
      handleVerifyOTP(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpToVerify = otp) => {
    const otpString = otpToVerify.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    // Demo mode - accept any 6-digit OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      
      // Redirect to account page after 2 seconds
      setTimeout(() => {
        onNavigate?.("account");
      }, 2000);
    }, 1000);
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F3] via-white to-[#E8F5F1] pt-24 pb-12 px-4">
      {/* Demo Notice Banner */}
      <div className="fixed top-[72px] left-0 right-0 bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white py-2 px-4 text-center text-sm font-medium shadow-md z-40">
        🎭 Demo Mode: Enter any 10-digit number and any 6-digit OTP to test the flow
      </div>
      
      <div className="max-w-md mx-auto mt-12">
        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#02542D] to-[#04845E] rounded-full mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Login to plan your dream destination wedding</p>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02542D] focus:border-transparent outline-none"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhoneNumber(value);
                        setError("");
                      }}
                      placeholder="Enter 10-digit number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02542D] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="w-full bg-gradient-to-r from-[#02542D] to-[#04845E] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending OTP...
                    </span>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">
                  By continuing, you agree to Wedzway's Terms of Service and Privacy Policy
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account?{" "}
                  <button
                    onClick={() => onNavigate?.("register")}
                    className="text-[#DF6951] font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Header */}
              <button
                onClick={handleBackToPhone}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-full mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter OTP</h1>
                <p className="text-gray-600">
                  We've sent a code to {countryCode} {phoneNumber}
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02542D] focus:border-[#02542D] outline-none transition-all"
                    />
                  ))}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={() => handleVerifyOTP()}
                  disabled={isLoading || otp.some(digit => !digit)}
                  className="w-full bg-gradient-to-r from-[#02542D] to-[#04845E] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      onClick={handleResendOTP}
                      className="text-[#02542D] font-semibold hover:underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Resend OTP in {timer}s
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Success!</h1>
                <p className="text-gray-600 mb-4">
                  You've been successfully authenticated
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to your account...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}