import { useLocation, useNavigate } from "react-router-dom";

function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center 
                        bg-indigo-100 text-indigo-600 rounded-full text-3xl">
          📧
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Email
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          We have sent a verification link to
        </p>

        <p className="font-semibold text-indigo-600 break-words mb-6">
          {email || "your email address"}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Please click the link in your inbox to activate your account.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
                       hover:bg-indigo-700 transition duration-300"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>

          <button
            className="w-full border border-gray-300 py-2 rounded-lg
                       hover:bg-gray-50 transition duration-300"
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;