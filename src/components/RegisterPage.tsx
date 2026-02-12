"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Phone,
  Shield,
  CheckCircle2,
  User,
  Mail,
} from "lucide-react";

type RegisterStep = "phone" | "otp" | "details" | "success";

interface RegisterPageProps {
  onNavigate?: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps = {}) {
  const [step, setStep] = useState<RegisterStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerifyOTP(newOtp);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
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
      setStep("details");
    }, 1000);
  };

  const handleCompleteRegistration = async () => {
    setError("");

    // Validate name
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call to create account
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

  const handleBackToOTP = () => {
    setStep("otp");
    setError("");
  };

  const countryCodes = [
    { code: "+91", country: "IN", flag: "🇮🇳" },
    { code: "+1", country: "US", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "AE", flag: "🇦🇪" },
    { code: "+61", country: "AU", flag: "🇦🇺" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02542D]/5 via-white to-[#DF6951]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Phone Number Step */}
          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#02542D]/10 rounded-full mb-6 mx-auto">
                <Phone className="w-8 h-8 text-[#02542D]" />
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Enter your mobile number to get started
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      placeholder="9876543210"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-[#02542D] text-white py-3 rounded-xl font-medium hover:bg-[#02542D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => onNavigate?.("auth")}
                      className="text-[#DF6951] font-medium hover:underline"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* OTP Verification Step */}
          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <button
                onClick={handleBackToPhone}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <div className="flex items-center justify-center w-16 h-16 bg-[#DF6951]/10 rounded-full mb-6 mx-auto">
                <Shield className="w-8 h-8 text-[#DF6951]" />
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Enter the 6-digit code sent to
                <br />
                <span className="font-medium text-gray-900">
                  {countryCode} {phoneNumber}
                </span>
              </p>

              <div className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      // ref={(el) => (otpInputs.current[index] = el)}
                      ref={(el) => {
                        otpInputs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DF6951] focus:border-transparent"
                    />
                  ))}
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={() => handleVerifyOTP()}
                  disabled={isLoading || otp.some((d) => !d)}
                  className="w-full bg-[#DF6951] text-white py-3 rounded-xl font-medium hover:bg-[#DF6951]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center">
                  {canResend ? (
                    <button
                      onClick={handleResendOTP}
                      className="text-[#02542D] font-medium hover:underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      Resend OTP in {timer}s
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* User Details Step */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <button
                onClick={handleBackToOTP}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <div className="flex items-center justify-center w-16 h-16 bg-[#02542D]/10 rounded-full mb-6 mx-auto">
                <User className="w-8 h-8 text-[#02542D]" />
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">
                Complete Your Profile
              </h1>
              <p className="text-gray-600 text-center mb-8">
                Just a few more details to get you started
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={`${countryCode} ${phoneNumber}`}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Phone number verified
                  </p>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={handleCompleteRegistration}
                  disabled={isLoading}
                  className="w-full bg-[#02542D] text-white py-3 rounded-xl font-medium hover:bg-[#02542D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Complete Registration"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>

              <h1 className="text-3xl font-bold mb-2">Welcome to Wedzway!</h1>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Registered as</p>
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm text-gray-600">
                  {countryCode} {phoneNumber}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Redirecting to your account...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
