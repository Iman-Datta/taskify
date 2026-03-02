import { useState } from "react";

function ForgotPassword({ onBackToLogin }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const inputStyle = `
    bg-zinc-900 border border-zinc-800
    px-4 py-2.5 rounded-xl
    text-zinc-100 placeholder:text-zinc-500
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    transition
  `;

  const buttonStyle = `
    bg-zinc-800 hover:bg-zinc-700
    text-white rounded-xl
    shadow-md shadow-black/30
    hover:shadow-lg hover:-translate-y-0.5
    active:translate-y-0 active:shadow-md
    transition-all duration-300
  `;

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6 text-zinc-100">
        Forgot Password
      </h2>

      <form className="space-y-4">

        {!otpSent && (
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Registered Email"
              className={`flex-1 ${inputStyle}`}
            />
            <button
              type="button"
              onClick={() => setOtpSent(true)}
              className={`px-4 ${buttonStyle}`}
            >
              Send OTP
            </button>
          </div>
        )}

        {otpSent && !otpVerified && (
          <div className="flex gap-2">
            <input
              placeholder="Enter OTP"
              className={`flex-1 ${inputStyle}`}
            />
            <button
              type="button"
              onClick={() => setOtpVerified(true)}
              className={`px-4 ${buttonStyle}`}
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
              className={`w-full ${inputStyle}`}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full ${inputStyle}`}
            />

            <button
              type="button"
              className="
                w-full bg-emerald-600 hover:bg-emerald-500
                text-white py-2.5 rounded-xl
                transition
              "
            >
              Update Password
            </button>
          </>
        )}
      </form>

      <p className="text-center text-sm text-zinc-500 mt-6">
        Remembered your password?{" "}
        <button
          onClick={onBackToLogin}
          className="text-emerald-400 hover:text-emerald-300 transition"
        >
          Login
        </button>
      </p>
    </>
  );
}

export default ForgotPassword;