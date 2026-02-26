// src/components/auth/ForgotPassword.jsx
import { useState } from "react";

function ForgotPassword({ onBackToLogin }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Forgot Password
      </h2>

      <form className="space-y-4">
        {!otpSent && (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Registered Email"
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setOtpSent(true)}
              className="px-4 bg-indigo-600 text-white rounded-md
                         hover:bg-indigo-700 transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {otpSent && !otpVerified && (
          <div className="flex gap-2">
            <input
              placeholder="Enter OTP"
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setOtpVerified(true)}
              className="px-4 bg-indigo-600 text-white rounded-md
                         hover:bg-indigo-700 transition"
            >
              Verify
            </button>
          </div>
        )}

        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-md
                         hover:bg-green-700 transition"
            >
              Update Password
            </button>
          </>
        )}
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Remembered your password?{" "}
        <button
          onClick={onBackToLogin}
          className="text-indigo-600 hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
}

export default ForgotPassword;