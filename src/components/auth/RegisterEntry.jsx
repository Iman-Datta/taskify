import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterEntry({ onLogin, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Create Account
      </h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();

          onRegisterSuccess("manual");

          navigate("/checkEmail", {
            state: { email: email },
          });
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          // required
          className="w-full border border-gray-300 px-3 py-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          // required
          placeholder="Confirm Password"
          className="w-full border border-gray-300 px-3 py-2 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md
                     hover:bg-indigo-700 transition"
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <button
        type="button"
        className="w-full border border-gray-300 py-2 rounded-md
             flex items-center justify-center gap-3
             hover:bg-gray-50 transition"
        onClick={() => onRegisterSuccess("google")}
      >
        {/* Google Logo */}
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.14 0 5.95 1.08 8.16 2.85l6.1-6.1C34.68 2.44 29.7 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.1 5.52C11.38 13.16 17.23 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24c0-1.64-.15-3.21-.43-4.73H24v9.45h12.7c-.55 2.97-2.2 5.48-4.7 7.17l7.24 5.63C43.56 37.3 46.5 31.1 46.5 24z"
          />
          <path
            fill="#FBBC05"
            d="M9.66 28.74A14.5 14.5 0 0 1 9.5 24c0-1.64.28-3.23.78-4.74l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.86.92 7.52 2.56 10.78l7.1-5.52z"
          />
          <path
            fill="#34A853"
            d="M24 48c5.7 0 10.68-1.88 14.24-5.12l-7.24-5.63c-2.01 1.35-4.58 2.15-7 2.15-6.77 0-12.62-3.66-14.34-9.24l-7.1 5.52C6.51 42.62 14.62 48 24 48z"
          />
        </svg>

        <span className="font-medium text-gray-700">Continue with Google</span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button onClick={onLogin} className="text-indigo-600 hover:underline">
          Login
        </button>
      </p>
    </>
  );
}

export default RegisterEntry;
