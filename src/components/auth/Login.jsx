import { useState } from "react";

function Login({ onLogin, onRegister, onForgot, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(formData.email, formData.password);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6 text-zinc-100">
        Login
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="
            w-full bg-zinc-900 border border-zinc-800
            px-4 py-2.5 rounded-xl
            text-zinc-100 placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            transition
          "
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="
            w-full bg-zinc-900 border border-zinc-800
            px-4 py-2.5 rounded-xl
            text-zinc-100 placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            transition
          "
        />

        <button
          type="submit"
          className="
            w-full bg-zinc-800 hover:bg-zinc-700
            text-white py-2.5 rounded-xl font-medium
            shadow-md shadow-black/30
            hover:shadow-xl hover:-translate-y-0.5
            active:translate-y-0 active:shadow-md
            transition-all duration-300
          "
        >
          Login
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-zinc-800"></div>
        <span className="px-3 text-sm text-zinc-500">OR</span>
        <div className="flex-1 h-px bg-zinc-800"></div>
      </div>

      <button
        type="button"
        className="
          w-full bg-zinc-900 border border-zinc-800
          py-2.5 rounded-xl
          flex items-center justify-center gap-3
          hover:bg-zinc-800
          transition
        "
      >
        <span className="font-medium text-zinc-300">Continue with Google</span>
      </button>

      <div className="mt-6 text-sm text-zinc-500 text-center space-y-2">
        <p>
          Don’t have an account?{" "}
          <button
            onClick={onRegister}
            className="text-emerald-400 hover:text-emerald-300 transition"
          >
            Create account
          </button>
        </p>

        <button
          onClick={onForgot}
          className="text-emerald-400 hover:text-emerald-300 transition"
        >
          Forgot password?
        </button>
      </div>
    </>
  );
}

export default Login;
