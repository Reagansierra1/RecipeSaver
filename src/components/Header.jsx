import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Header.css';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <h3 className="logo">RecipeSaver</h3>
      </div>

      <div className="header-center">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>

      <div className="header-right">
        {isAuthenticated ? (
          <div className="user-info">
            <span className="username">{user.username}</span>
            <button
              className="logout-btn"
              onClick={logout}
              style={{ backgroundColor: "#ff5e5e", color: "#fff" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;