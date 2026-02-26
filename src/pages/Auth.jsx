import { useState } from "react";
import Login from "../components/auth/Login";
import RegisterEntry from "../components/auth/RegisterEntry";
import ForgotPassword from "../components/auth/ForgotPassword";
import CompleteProfile from "../components/auth/CompleteProfile";

function Auth() {
  const [view, setView] = useState("login"); // login | register | forgot | complete-profile

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
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
