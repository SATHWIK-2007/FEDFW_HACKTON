import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function logout() {
    onLogout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">🍽 Foodie</Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/saved">Saved Recipes</Link>
        <Link to="/add">Add Recipe</Link>

        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button onClick={logout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}

export default Navbar;