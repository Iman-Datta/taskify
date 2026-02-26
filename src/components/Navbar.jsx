import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-[6px] border-b border-white/10 shadow-md">
      <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                className="w-9 h-9 transition-transform duration-500 group-hover:rotate-90"
                fill="none"
              >
                <rect
                  width="32"
                  height="32"
                  rx="8"
                  fill="#059669"
                  fillOpacity="0.18"
                />
                <path
                  d="M10 16H22M16 10V22"
                  stroke="#059669"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="3"
                  fill="#059669"
                  fillOpacity="0.6"
                />
              </svg>
            </div>

            <h2 className="font-logo text-2xl font-bold tracking-[-0.02em]">
              <span className="text-black">Task</span>
              <span className="text-emerald-600">Flow</span>
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/auth"
            className="relative text-sm font-medium text-black 
             after:absolute after:left-0 after:-bottom-1 
             after:h-[2px] after:w-0 
             after:bg-blue-600 
             after:transition-all after:duration-300
             hover:after:w-full
             transition-colors duration-200"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="px-7 py-2.5 rounded-lg font-semibold text-white
             bg-gradient-to-r from-blue-600 to-blue-500
             hover:from-blue-700 hover:to-blue-600
             shadow-md hover:shadow-xl hover:shadow-blue-500/30
             hover:-translate-y-0.5
             active:translate-y-0 active:shadow-md
             transition-all duration-300 ease-out"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
