import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ users, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const user = users.find(
      item =>
        item.email === email &&
        item.password === password
    );

    if (user) {
      onLogin(user);
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Login to your Foodie account.</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;