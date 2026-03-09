import { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";

function RegisterEntry({ onLogin, onRegister }) {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await onRegister(formData.email, formData.password);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-6 text-zinc-100">
        Create Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="
            w-full bg-zinc-900 border border-zinc-800
            px-4 py-2.5 rounded-xl
            text-zinc-100 placeholder:text-zinc-500
            focus:outline-none focus:ring-2 focus:ring-emerald-500
            transition
          "
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
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
          Create Account
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
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="..." />
        </svg>
        <span className="font-medium text-zinc-300">Continue with Google</span>
      </button>

      <p className="text-center text-sm text-zinc-500 mt-6">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          className="text-emerald-400 hover:text-emerald-300 transition"
        >
          Login
        </button>
      </p>
    </>
  );
}

export default RegisterEntry;
