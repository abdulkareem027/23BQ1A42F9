import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    mobileNo: "",
    githubUsername: "",
    rollNo: "",
    accessCode: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      showToast("Registration successful! Your account is ready.", "success");
      alert(`Save these:\nClient ID: ${res.clientID}\nClient Secret: ${res.clientSecret}`);
    } catch (err) {
      showToast("Registration failed. Please try again.", "error");
    }
  };

  return (
    <div className="auth-page">
      <div className={`toast-container ${toast.show ? "visible" : ""}`}>
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      </div>
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Register to receive campus notifications.</p>
        <form onSubmit={submit} className="auth-form">
          <input
            value={form.email}
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
            value={form.name}
            placeholder="Name"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
          <input
            value={form.mobileNo}
            placeholder="Mobile Number"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                mobileNo: e.target.value,
              })
            }
          />
          <input
            value={form.githubUsername}
            placeholder="Github Username"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                githubUsername: e.target.value,
              })
            }
          />
          <input
            value={form.rollNo}
            placeholder="Roll No"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                rollNo: e.target.value,
              })
            }
          />
          <input
            value={form.accessCode}
            placeholder="Access Code"
            className="input-field"
            onChange={(e) =>
              setForm({
                ...form,
                accessCode: e.target.value,
              })
            }
          />

          <button type="submit" className="primary-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}