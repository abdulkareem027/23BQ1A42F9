import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(form);
      showToast("Login successful! Redirecting to dashboard...", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 900);
    } catch (error) {
      showToast("Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className={`toast-container ${toast.show ? "visible" : ""}`}>
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to view your campus notifications.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Name"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}