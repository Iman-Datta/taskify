import { useState } from "react";
import Login from "../components/auth/Login";
import RegisterEntry from "../components/auth/RegisterEntry";
import ForgotPassword from "../components/auth/ForgotPassword";
import CompleteProfile from "../components/auth/CompleteProfile";

function Auth() {
  const [view, setView] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div
        className="
        w-full max-w-md 
        bg-zinc-900 border border-zinc-800
        p-8 rounded-2xl 
        shadow-2xl shadow-black/40
        transition-all duration-300
      "
      >
        {view === "login" && (
          <Login
            onRegister={() => setView("register")}
            onForgot={() => setView("forgot")}
            onLoginSuccess={() => {
              console.log("Login success");
            }}
          />
        )}

        {view === "register" && (
          <RegisterEntry
            onLogin={() => setView("login")}
            onRegisterSuccess={(method) => {
              console.log("Registered via:", method);
              setView("complete-profile");
            }}
          />
        )}

        {view === "forgot" && (
          <ForgotPassword onBackToLogin={() => setView("login")} />
        )}

        {view === "complete-profile" && <CompleteProfile />}
      </div>
    </div>
  );
}

export default Auth;