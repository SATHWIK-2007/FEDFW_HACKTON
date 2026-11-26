import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (
      email === "admin@foodie.com" &&
      password === "admin123"
    ) {
      onAdminLogin(true);
      alert("Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid admin credentials!");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h1>🔐 Admin Login</h1>
        <p>Access the Foodie administration panel.</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Admin Login</button>

        <p className="admin-hint">
          Demo email: admin@foodie.com<br />
          Demo password: admin123
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;