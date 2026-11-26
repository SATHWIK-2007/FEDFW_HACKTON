import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup({ users, onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (users.some(user => user.email === email)) {
      alert("Email already registered!");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    onSignup(newUser);
    alert("Signup successful!");
    navigate("/login");
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <p>Join the Foodie community.</p>

        <label>Full Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Minimum 6 characters"
          required
        />

        <button type="submit">Create Account</button>

        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;