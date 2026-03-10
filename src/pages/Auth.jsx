import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Login from "../components/auth/Login";
import RegisterEntry from "../components/auth/RegisterEntry";
import ForgotPassword from "../components/auth/ForgotPassword";

import { setUser } from "../features/auth/authSlice";

const API = import.meta.env.VITE_API_URL;

function Auth() {
  const [view, setView] = useState("login");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Register function
  const registerUser = async (email, password, name) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        throw new Error("Failed to register user");
      }

      // get logged-in user
      const me = await fetch(`${API}/auth/me`, {
        credentials: "include",
      });

      const userData = await me.json();

      dispatch(setUser(userData.user));

      navigate("/task");
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      // Now fetch the authenticated user
      const me = await fetch(`${API}/auth/me`, {
        credentials: "include",
      });

      const userData = await me.json();

      dispatch(setUser(userData.user));
      navigate("/task");

      return userData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl shadow-black/40 transition-all duration-300">
        {view === "login" && (
          <Login
            onRegister={() => setView("register")}
            onLogin={loginUser}
            onForgot={() => setView("forgot")}
            onLoginSuccess={() => {
              console.log("Login success");
            }}
          />
        )}

        {view === "register" && (
          <RegisterEntry
            onLogin={() => setView("login")}
            onRegister={registerUser}
          />
        )}

        {view === "forgot" && (
          <ForgotPassword onBackToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  );
}

export default Auth;
