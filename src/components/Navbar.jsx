import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Trash2, CheckCircle } from "lucide-react";

import { clearUser } from "../features/auth/authSlice";
const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // logout function
  const logoutUser = async () => {
    try {
      const res = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to logout");
      }
      dispatch(clearUser());
      navigate("/");
      console.log("Logged out successfully");
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Coming soon
  const comingSoon = () => {
    alert("🚧 Coming Soon!");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 
      bg-zinc-950/70 backdrop-blur-xl 
      border-b border-zinc-800 
      shadow-sm shadow-black/30 transition-colors duration-300"
    >
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
                  className="fill-emerald-500/15"
                />
                <path
                  d="M10 16H22M16 10V22"
                  className="stroke-emerald-400"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="16" r="3" className="fill-emerald-400/70" />
              </svg>
            </div>

            <h2 className="font-logo text-2xl font-bold tracking-tight">
              <span className="text-zinc-100">Task</span>
              <span className="text-emerald-400">Flow</span>
            </h2>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <button
              onClick={comingSoon}
              title="Completed Tasks"
              className="text-zinc-400 hover:text-emerald-400 transition"
            >
              <CheckCircle size={20} />
            </button>

            <button
              onClick={comingSoon}
              title="Trash"
              className="text-zinc-400 hover:text-red-400 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/task"
              className="
              px-7 py-2.5 rounded-2xl font-semibold text-white
              bg-zinc-800 hover:bg-zinc-700
              shadow-md shadow-black/40
              hover:shadow-xl hover:-translate-y-0.5
              active:translate-y-0 active:shadow-md
              transition-all duration-300 ease-out
            "
            >
              {user ? "My Tasks" : "Get Started"}
            </Link>
            {user ? (
              <button
                onClick={logoutUser}
                className="relative text-sm font-medium text-zinc-300
              after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:w-0
              after:bg-emerald-400
              after:transition-all after:duration-300
              hover:text-zinc-100
              hover:after:w-full
              transition-all duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="relative text-sm font-medium text-zinc-300
              after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:w-0
              after:bg-emerald-400
              after:transition-all after:duration-300
              hover:text-zinc-100
              hover:after:w-full
              transition-all duration-200"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
