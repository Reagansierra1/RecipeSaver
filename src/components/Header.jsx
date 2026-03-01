import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
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
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </header>
  );
}

export default Header;